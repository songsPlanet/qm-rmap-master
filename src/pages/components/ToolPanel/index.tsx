import MapWrapper from '@/gis/mapboxgl/MapWrapper';
import React, { useState, useEffect } from 'react';
import ControlPanel from '@/gis/widget/Controls/ControlPanel';
import ToolBar from '../../../gis/widget/ToolBar';

interface ToolPanelProps {
  toolsSetting: any[];
}
const components: any = {
  ControlPanel: ControlPanel,
  ToolBar: ToolBar,
};
const ToolPanel = (props: ToolPanelProps) => {
  const { toolsSetting } = props;
  const [tools, settools] = useState([] as any);
  let setting: any[] = toolsSetting;

  useEffect(() => {
    let toolItems = toolsSetting.map((d: any, index: number) => {
      let Tool = components[d.id];
      if (Tool) {
        return <Tool key={index} {...d} />;
      } else return null;
    });
    settools(toolItems);
  }, [toolsSetting]);
  return <> {tools}</>;
};

export { ToolPanel };
