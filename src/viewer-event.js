import {getSVGPoint, decompose} from './features/common'

export default class ViewerEvent {

  constructor(originalEvent, value, SVGViewer) {
    this.originalEvent = originalEvent;
    this.value = value;
    this.SVGViewer = SVGViewer;
  }

  get point() {
    if (!this._cachePoint) {
      let event = this.originalEvent, value = this.value, SVGViewer = this.SVGViewer;

      let rect = SVGViewer.getBoundingClientRect();
      let x = event.clientX - Math.round(rect.left);
      let y = event.clientY - Math.round(rect.top);

      this._cachePoint = getSVGPoint(value, x, y);
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
    this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.value);
    return this._cacheDecomposedValue.scaleFactor;
  }

  get translationX() {
    this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.value);
    return this._cacheDecomposedValue.translationX;
  }

  get translationY() {
    this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.value);
    return this._cacheDecomposedValue.translationY;
  }
}
