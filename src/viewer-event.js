import ViewerHelper from './viewer-helper';

export default class ViewerEvent {

  constructor(originalEvent, value) {
    this.originalEvent = originalEvent;
    this.value = value;
  }

  get artboardX() {
    if (!this._cachePoint) {
      let event = this.originalEvent, value = this.value;
      let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
      this._cachePoint = ViewerHelper.getArtboardPoint(value, x, y);
    }
    return this._cachePoint.x;
  }

  get artboardY() {
    if (!this._cachePoint) {
      let event = this.originalEvent, value = this.value;
      let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;
      this._cachePoint = ViewerHelper.getArtboardPoint(value, x, y);
    }
    return this._cachePoint.y;
  }

  get scaleFactor() {
    if (!this._cacheDecomposedValue) {
      let value = this.value;
      this._cacheDecomposedValue = ViewerHelper.decomposeValue(value);
    }
    return this._cacheDecomposedValue.scaleFactor;
  }

  get translationX() {
    if (!this._cacheDecomposedValue) {
      let value = this.value;
      this._cacheDecomposedValue = ViewerHelper.decomposeValue(value);
    }
    return this._cacheDecomposedValue.translationX;
  }

  get translationY() {
    if (!this._cacheDecomposedValue) {
      let value = this.value;
      this._cacheDecomposedValue = ViewerHelper.decomposeValue(value);
    }
    return this._cacheDecomposedValue.translationY;
  }

}
