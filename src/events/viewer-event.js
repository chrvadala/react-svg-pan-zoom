import {decompose} from '../features/common'

export default class ViewerEvent {
  constructor(originalEvent, value, SVGViewer) {
    this.originalEvent = originalEvent;
    this.value = value;
    this.SVGViewer = SVGViewer;
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

  preventDefault(){
    this.originalEvent.preventDefault();
  }

  stopPropagation(){
    this.originalEvent.stopPropagation();
  }
}
