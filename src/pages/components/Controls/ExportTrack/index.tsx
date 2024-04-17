import { TWidgetPosition } from '@/gis/widget/BaseWidget';
import { AimOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { Button } from 'antd';
import { memo, useState, useRef, ReactElement, useEffect } from 'react';
import { Modal } from 'antd';

const ExportTrack = (props: { position: TWidgetPosition }) => {
  const { position } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [show, setShow] = useState(false);

  const modalOpenHandle = () => {
    setShow(true);
  };

  const modalCancelHandle = () => {
    setShow(false);
  };

  const modalOkHandle = () => {
    console.log('ok按钮');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      if (!canvas.getContext) return;
      const ctx: any = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(32, 210, 255, 0.3)';
      ctx.strokeStyle = 'rgba(32, 210, 255, 1)';
      ctx.beginPath();
      // ctx.moveTo(coordinates[0][0], coordinates[0][1]);
      // for (let i = 1; i < coordinates.length; i++) {
      //   ctx.lineTo(coordinates[i][0], coordinates[i][1]);
      // }
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }, []);

  return (
    <>
      <Button style={position} className={styles.btn} icon={<AimOutlined />} onClick={modalOpenHandle}>
        导出轨迹
      </Button>

      {show ? (
        <Modal
          title="导出预览"
          maskClosable={true}
          open={show}
          width={460}
          onCancel={modalCancelHandle}
          onOk={modalOkHandle}
          destroyOnClose
        >
          <div ref={canvasRef} id="canvas" className={styles.canvas} />
        </Modal>
      ) : null}
    </>
  );
};
export default memo(ExportTrack);
