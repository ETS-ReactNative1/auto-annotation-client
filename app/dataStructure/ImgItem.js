
export default class ImgItem {
  url: string;
  category: string;
  frame: [];
  confidence: number;

  constructor(url: string, category: string, frame: [], confidence: number) {
    this.url = url;
    this.category = category;
    this.frame = frame;
    this.confidence = confidence;
  }
}
