class CanvasUtil {
  private canvas: any;
  private ctx: any;

  constructor(width = 1000, height = 1000) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
  }

  /**
   * 绘制线
   * @param linesData [{}]
   * @return {Promise<unknown>}
   */
  drawLines(linesData: any) {
    const that = this;
    return new Promise((resolve) => {
      linesData.forEach((lineData: any) => {
        that.ctx.beginPath();
        that.ctx.save();
        that.ctx.strokeStyle = lineData.color || 'red';
        that.ctx.lineWidth = lineData.width || 2;
        // that.ctx.setLineDash(lineData.dasharray || [5, 0]);
        lineData.coords.forEach((coord: number[], index: number) => {
          const [x, y] = coord;
          index === 0 ? that.ctx.moveTo(x, y) : that.ctx.lineTo(x, y);
        });
        that.ctx.stroke();
        that.ctx.restore();
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
  drawImage(image: any, x: any, y: any, width?: number, height?: number) {
    const that = this;
    width = width || image.width;
    height = height || image.height;
    that.ctx.drawImage(image, x, y, width, height);

    const url = 'https://webst04.is.autonavi.com/appmaptile?style=6&x=26882&y=13182&z=15';
  }

  // /**
  //  * 绘制多个图片
  //  * @param imgsData, [{url: '', x: '', y: ''}]
  //  * @return {Promise<unknown>}
  //  */
  // drawImages(imgsData: any) {
  //   const that = this;
  //   let promises: any = [];
  //   console.log('imgsData', imgsData);

  //   imgsData.forEach((data: any) => {
  //     promises.push(
  //       new Promise((resolve) => {
  //         // loadImage(data.url).then(img => {
  //         //     resolve({
  //         //       ...data,
  //         //       img
  //         //     })
  //         // })

  //       }),
  //     );
  //   });
  //   return new Promise((resolve) => {
  //     Promise.all(promises).then((imgDatas:any) => {
  //       console.log("promis",imgDatas);

  //       imgDatas.forEach((imgData:any) => {
  //         that.drawImage(imgData.img, imgData.x, imgData.y);
  //       });
  //       resolve(imgDatas);
  //     });
  //   });
  // }

  drawImages(imgsData: any) {
    const that = this;
    // let promises: any = [];
    console.log('imgsData', imgsData);
    return new Promise((resolve) => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymouse');
      // img.src = imgsData[0].url;
      img.src = 'https://webst02.is.autonavi.com/appmaptile?style=6&x=26882&y=13182&z=15';
      img.onload = () => {
        that.ctx.drawImage(img, 0, 0, img.width, img.height);
        resolve(img);
      };
      // const img = new Image();
      // img.src="https://webst02.is.autonavi.com/appmaptile?style=6&x=26882&y=13182&z=15"
      // img.onload = () => {
      //   that.ctx.drawImage(img, 0, 0, img.width, img.height);
      // };
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
