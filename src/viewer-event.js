import ViewerHelper from './viewer-helper';

export default class ViewerEvent {

  constructor(originalEvent, value) {
    this.originalEvent = originalEvent;
    this.value = value;
  }

  get point() {
    if (!this._cachePoint) {
      let event = this.originalEvent, value = this.value;

      let rect = event.target.getBoundingClientRect();
      let x = event.clientX - Math.round(rect.left);
      let y = event.clientY - Math.round(rect.top);

      this._cachePoint = ViewerHelper.getSVGPoint(value, x, y);
    }
    return this._cachePoint;
  }

  get x() {
    return this.point.x;
  }

  get y() {
    return this.point.y;
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
