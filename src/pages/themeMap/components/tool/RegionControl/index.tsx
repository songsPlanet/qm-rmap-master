import type { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { useRegion } from '@/gis/context/RegionContext';
import { getFeatureBoundingBox } from '@/gis/utils';
import { queryRegionFeature } from '@/api/map';
import { useMap } from '@/gis/context/mapContext';
import styles from './index.module.less';
import { Cascader } from 'antd';
import { memo } from 'react';

const RegionControl = (props: { position: TWidgetPosition; regionList?: any }) => {
  const { position } = props;
  const { map } = useMap();
  const {
    state: { regions },
    dispatch,
  } = useRegion();

  const locationRegionFeature = (code: string) => {
    queryRegionFeature({ code }).then((ctx: any) => {
      map?.selectFeature(ctx?.data);
      const feat = ctx?.data?.features[0] || null;
      if (feat) {
        const bds = getFeatureBoundingBox(feat);
        map?.fitBounds(bds);
      }
    });
  };

  const onChangeHandle = async (_: any, selectedOptions: any) => {
    const node = selectedOptions[selectedOptions.length - 1];
    dispatch({ type: 'changeRegion', payload: { currentRegion: node } });
    const code = node?.value;
    if (code) {
      if (code.length === 2 || code.length === 4) {
        map?.clearSelect();
        map?.flyTo({
          center: [115.39047951086354, 33.2714096725866],
          zoom: 9.55,
        });
      } else {
        locationRegionFeature(node.value);
      }
    }
  };

  return (
    <div className={styles.control} style={position}>
      <Cascader
        changeOnSelect
        defaultValue={['34']}
        options={regions}
        allowClear={false}
        style={{ width: '100%' }}
        onChange={onChangeHandle}
      />
    </div>
  );
};

export default memo(RegionControl);
