import React, { memo } from 'react';
import styles from './index.module.less';

function Page() {
  return (
    <div className={styles.mapContainer}>
      <h1>user list1</h1>
    </div>
  );
}
export default memo(Page);
