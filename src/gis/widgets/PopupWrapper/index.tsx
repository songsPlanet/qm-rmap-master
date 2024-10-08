import type { LngLatLike, PopupOptions } from 'mapbox-gl';
import  { memo, useEffect, useMemo } from 'react';
import { MapWrapper } from 'qm-map-wrapper';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import { Popup } from 'mapbox-gl';
import './index.less';

let defaultXY = {
  x: 0,
  y: 0,
};
let divOffset = {
  l: 0,
  t: 0,
};
export type PopupEvent = {
  type: 'open' | 'close';
  target: Popup;
};
export type TPopupWrapper = PopupOptions & {
  title: string;
  map: MapWrapper;
  children: ReactNode;
  lngLat: LngLatLike;
  ifCenter?: boolean;
  enableDrag?: boolean;
  onOpen?: (e: PopupEvent) => void;
  onClose?: (e: any) => void;
};

const PopupWrapper = (props: TPopupWrapper) => {
  const { children, lngLat, onOpen, onClose, enableDrag, title, map, ifCenter } = props;

  const container = useMemo(() => {
    const content = document.createElement('div');
    content.className = 'popup-content-wrap';
    const header = document.createElement('div');
    header.className = 'popup-header-wrap';
    const titleDiv = document.createElement('div');
    titleDiv.className = 'popup-title-wrap';
    titleDiv.id = 'popup-title-wrap-id';
    titleDiv.innerText = title ?? '';
    header.appendChild(titleDiv);
    content.appendChild(header);
    return content;
  }, []);

  const maskContainer = useMemo(() => {
    return document.getElementById('popup-mask-container');
  }, []);

  const popup: Popup = useMemo(() => {
    const options = { ...props, maxWidth: 'none', className: 'mapboxgl-popup-wrapper' };
    const pp = new Popup(options).setLngLat(lngLat);
    pp.once('open', (e: any) => {
      const a = document.getElementById('mapboxgl-popup');

      onOpen?.(e as PopupEvent);
      if (maskContainer && ifCenter) maskContainer.style.display = 'block';
    });
    return pp;
  }, []);

  useEffect(() => {
    const onCloseHandle = (e: any) => {
      onClose?.(e as PopupEvent);
      if (maskContainer && ifCenter) maskContainer.style.display = 'none';
    };
    popup.on('close', onCloseHandle);
    map && popup.setDOMContent(container).addTo(map);
    const ppHeader = document.getElementsByClassName('popup-header-wrap')[0];
    const ppContainer = (popup as any)?._container as HTMLElement;

    const mousedown = (e: any) => {
      e.preventDefault(); // 阻止事件默认行为
      defaultXY = {
        x: e.clientX,
        y: e.clientY,
      };
      divOffset = {
        l: ppContainer.offsetLeft,
        t: ppContainer.offsetTop,
      };
      ppHeader.addEventListener('mousemove', mousemove);
    };
    const mouseup = () => {
      ppHeader.removeEventListener('mousemove', mousemove);
    };
    const mousemove = (e: any) => {
      if (ppContainer) {
        // 获取x和y
        let nx = e.clientX;
        let ny = e.clientY;
        let nl = nx - (defaultXY.x - divOffset.l);
        let nt = ny - (defaultXY.y - divOffset.t);
        ppContainer.style.left = nl + 'px';
        ppContainer.style.top = nt + 'px';
      }
    };
    if (enableDrag) {
      ppHeader.addEventListener('mousedown', mousedown);
      ppHeader.addEventListener('mouseup', mouseup);
    }
    return () => {
      popup.off('close', onClose);
      if (maskContainer && ifCenter) maskContainer.style.display = 'none';
      ppHeader.removeEventListener('mousedown', mousedown);
      ppHeader.removeEventListener('mouseup', mouseup);
      if (popup.isOpen()) {
        popup.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (popup.isOpen()) {
      popup.setLngLat(lngLat);
    }
  }, [lngLat]);

  useEffect(() => {
    const titleElem = document.getElementById('popup-title-wrap-id');
    titleElem!.innerText = title;
  }, [title]);

  return createPortal(children, container);
};
export default memo(PopupWrapper);
