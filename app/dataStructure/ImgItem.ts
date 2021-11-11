
export default class ImgItem {
  url: String;
  annotation: String;
  width: number;
  height: number;

  constructor(url: String, annotation: String, width: number, height: number) {
    this.url = url;
    this.annotation = annotation;
    this.width = width;
    this.height = height;
  }
}
