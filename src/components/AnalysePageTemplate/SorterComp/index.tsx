import React, { useState, memo, useEffect, useRef } from 'react';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import classes from './index.module.less';

type SorterProps = {
  field: string;
  label: string;
  onChange: (field: string, sort: 'asc' | 'desc') => void;
  style?: React.CSSProperties;
  value?: 'asc' | 'desc';
};

function Sorter(props: SorterProps) {
  const { label, field, onChange, style, value } = props;
  const [state, setState] = useState(value || 'asc');
  const isModifiedInside = useRef(false);
  useEffect(() => {
    if (isModifiedInside.current || typeof value === 'undefined') {
      isModifiedInside.current = false;
      return;
    }

    setState(() => value!);
  }, [value]);

  return (
    <span
      className={classes.sorter}
      style={style}
      onClick={() => {
        isModifiedInside.current = true;
        if (state === 'asc') {
          setState('desc');
          onChange(field, 'desc');
        } else {
          setState('asc');
          onChange(field, 'asc');
        }
      }}
    >
      {state === 'asc' ? (
        <SortAscendingOutlined className={classes.icon} />
      ) : (
        <SortDescendingOutlined className={classes.icon} />
      )}
      {label}
    </span>
  );
}

export default memo(Sorter);
