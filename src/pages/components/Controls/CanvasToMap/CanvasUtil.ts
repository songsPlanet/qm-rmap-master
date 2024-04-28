class CanvasUtil {
  private canvas: any;

  private ctx: CanvasRenderingContext2D;

  constructor(width = 500, height = 500) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * 绘制多个点
   * @param pointsData，[{type: 'circle', size: 4, x: 100, y: 100, icon: ''}]
   */
  drawPoints(pointsData = []) {
    return new Promise((resolve) => {
      let promises: any = [];
      pointsData.forEach((pointData: any) => {
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.fillStyle = pointData.color || 'rgba(255, 0, 0, 1)';
        const type = pointData.type || 'circle';
        const size = pointData.size || 4;
        let { x, y } = pointData;
        pointData.x = x;
        pointData.y = y;
        switch (type) {
          case 'rect': {
            x -= size;
            y -= size;
            this.ctx.fillRect(x, y, size * 2, size * 2);
            promises.push(Promise.resolve(pointData));
            break;
          }
          case 'circle': {
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
            promises.push(Promise.resolve(pointData));
            break;
          }
          case 'marker': {
            promises.push(
              new Promise((resolve1) => {
                const img = new Image();
                img.setAttribute('crossOrigin', 'anonymouse');
                img.src = pointData.icon;
                img.onload = () => {
                  const w = img.width * pointData.size;
                  const h = img.height * pointData.size;
                  x -= w / 2;
                  y -= h / 2;
                  this.drawImage(img, x, y, w, h);
                  resolve(pointData);
                };
              }),
            );
            break;
          }
        }
        this.ctx.restore();
      });
      Promise.all(promises).then((res) => {
        resolve({
          code: '200',
        });
      });
    });
  }

  /**
   * 绘制线
   * @param linesData [{}]
   * @return {Promise<unknown>}
   */
  drawLines(linesData: any) {
    return new Promise((resolve) => {
      linesData.forEach((lineData: any) => {
        this.ctx.beginPath();
        this.ctx.save();
        this.ctx.strokeStyle = lineData.color || 'red';
        this.ctx.lineWidth = lineData.width || 2;
        // that.ctx.setLineDash(lineData.dasharray || [5, 0]);
        lineData.coords.forEach((coord: number[], index: number) => {
          const [x, y] = coord;
          index === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
        });
        this.ctx.stroke();
        this.ctx.restore();
      });
      resolve({
        code: '200',
      });
    });
  }

  /**
   * 绘制多边形
   * @param polygonsData
   * @return {Promise<unknown>}
   */
  drawPolygons(polygonsData: any) {
    return new Promise((resolve) => {
      polygonsData.forEach((polygonData: any) => {
        this.ctx.beginPath();
        this.ctx.save();
        polygonData.coords.forEach((coord: number[], index: number) => {
          const [x, y] = coord;
          index === 0 ? this.ctx.moveTo(x, y) : this.ctx.lineTo(x, y);
        });
        this.ctx.closePath();
        if (polygonData.isFill) {
          this.ctx.fillStyle = polygonData.fillStyle || 'rgba(255, 0, 0,  0.2)';
          this.ctx.fill();
        }
        if (polygonData.isStroke) {
          this.ctx.strokeStyle = polygonData.strokeStyle || 'red';
          this.ctx.lineWidth = polygonData.lineWidth || 2;
          this.ctx.setLineDash(polygonData.lineDash || [5, 0]);
          this.ctx.stroke();
        }
        this.ctx.restore();
      });
      resolve({
        code: '200',
      });
    });
  }

  /**
   * 绘制一张图片
   * @param image
   * @param x
   * @param y
   * @param width
   * @param height
   */
  drawImage(image: any, x: any, y: any, width = image.width, height = image.height) {
    this.ctx.drawImage(image, x, y, width, height);
  }

  /**
   * 绘制多个图片
   * @param imgsDatas, [{url: '', x: '', y: ''}]
   * @return {Promise<unknown>}
   */
  drawImages(imgsData: any) {
    let promises: any = [];
    imgsData.forEach((data: any) => {
      promises.push(
        new Promise((resolve) => {
          const img = new Image();
          img.setAttribute('crossOrigin', 'anonymouse');
          img.src = data.url;
          img.onload = () => {
            resolve({
              ...data,
              img,
            });
          };
        }),
      );
    });
    return new Promise((resolve) => {
      Promise.all(promises).then((imgDatas: any) => {
        imgDatas.forEach((imgData: any) => {
          this.drawImage(imgData.img, imgData.x, imgData.y);
        });
        resolve(imgDatas);
      });
    });
  }

  /**
   * 获取canvas数据
   * @return {string}
   */
  getDataUrl() {
    // return this.canvas.toDataURL().replace(/^data:image\/\w+;base64,/, '');
    return this.canvas.toDataURL('image/png');
  }

  /**
   * 导出canvas数据
   * return {string}
   */
  printCanvas() {
    this.canvas.toBlob((blob: any) => {
      // @ts-ignore
      saveAs(blob, 'mapPrint');
    });
  }

  /**
   * 添加标题
   * @param title
   */
  addTitle(title: string) {
    this.ctx.save();
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 3;
    this.ctx.fillStyle = '#fff';
    let x = 20;
    let y = 20;
    let offset = 8;
    let h = 32;
    this.ctx.font = `bold ${h}px 微软雅黑`;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    let w = this.ctx.measureText(title).width;
    // 外边框
    this.ctx.strokeRect(x, y, offset * 4 + w, offset * 4 + h);
    // 内边框
    this.ctx.strokeRect(x + offset, y + offset, offset * 2 + w, offset * 2 + h);
    // 文字
    this.ctx.fillText(title, x + offset * 2, y + offset * 2);
    this.ctx.restore();
  }
}

export { CanvasUtil };
