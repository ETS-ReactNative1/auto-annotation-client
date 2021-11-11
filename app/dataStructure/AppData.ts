import ImgItem from './ImgItem';

export default class AppData {
  oldVersion: ImgItem;
  newVersion: ImgItem;
  changes: ImgItem[];

  constructor(oldVersion: ImgItem, newVersion: ImgItem, changes: ImgItem[]) {
    this.oldVersion = oldVersion;
    this.newVersion = newVersion;
    this.changes = changes;
  }
}
