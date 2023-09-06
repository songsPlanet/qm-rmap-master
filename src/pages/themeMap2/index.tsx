import { memo } from 'react';
import styles from './index.module.less';

import MapContainer from '../components/MapContainer';

const ThemeMap = (props: any) => {
  return (
    <div className={styles.mapContainer}>
      <MapContainer />
    </div>
  );
};
export default memo(ThemeMap);
