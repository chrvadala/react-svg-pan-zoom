import ArtboardHelper from './viewer-helper';

export default class ArtboardEvent {

  constructor(originalEvent, value) {
    this.originalEvent = originalEvent;
    this.value = value;
  }

  get paperX() {
    if (!this._cachePoint) {
      let event = this.originalEvent, value = this.value;
      let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
      this._cachePoint = ArtboardHelper.getPaperPoint(value, x, y);
    }
    return this._cachePoint.x;
  }

  get paperY() {
    if (!this._cachePoint) {
      let event = this.originalEvent, value = this.value;
      let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
      this._cachePoint = ArtboardHelper.getPaperPoint(value, x, y);
    }
    return this._cachePoint.y;
  }

  get scaleFactor() {
    if (!this._cacheDecomposedValue) {
      let value = this.value;
      this._cacheDecomposedValue = ArtboardHelper.decomposeValue(value);
    }
    return this._cacheDecomposedValue.scaleFactor;
  }

  get translationX() {
    if (!this._cacheDecomposedValue) {
      let value = this.value;
      this._cacheDecomposedValue = ArtboardHelper.decomposeValue(value);
    }
    return this._cacheDecomposedValue.translationX;
  }

  get translationY() {
    if (!this._cacheDecomposedValue) {
      let value = this.value;
      this._cacheDecomposedValue = ArtboardHelper.decomposeValue(value);
    }
    return this._cacheDecomposedValue.translationY;
  }

}
