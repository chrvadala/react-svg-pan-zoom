import {decompose} from '../features/common'

export default class ViewerEvent {
  constructor(originalEvent, matrix, SVGViewer) {
    this.originalEvent = originalEvent;
    this.matrix = matrix;
    this.SVGViewer = SVGViewer;
  }

  get scaleFactor() {
    this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.matrix);
    return this._cacheDecomposedValue.scaleFactor;
  }

  get translationX() {
    this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.matrix);
    return this._cacheDecomposedValue.translationX;
  }

  get translationY() {
    this._cacheDecomposedValue = this._cacheDecomposedValue || decompose(this.matrix);
    return this._cacheDecomposedValue.translationY;
  }

  preventDefault(){
    this.originalEvent.preventDefault();
  }

  stopPropagation(){
    this.originalEvent.stopPropagation();
  }
}
