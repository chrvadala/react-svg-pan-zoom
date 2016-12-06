import {getSVGPoint} from '../features/common'
import ViewerEvent from './viewer-event';

export default class ViewerTouchEvent extends ViewerEvent {
  get points() {
    if (!this._cachePoints)
      this._cachePoints = ViewerTouchEvent.touchesToPoints(this.originalEvent.touches, this.SVGViewer, this.value);

    return this._cachePoints;
  }

  get changedPoints() {
    if (!this._cacheChangedPoints)
      this._cacheChangedPoints = ViewerTouchEvent.touchesToPoints(this.originalEvent.changedTouches, this.SVGViewer, this.value);

    return this._cacheChangedPoints;
  }

  static touchesToPoints(touches, SVGViewer, value) {
    let points = [];
    for (let i = 0; i < touches.length; i++) {
      let touch = touches[i];

      let rect = SVGViewer.getBoundingClientRect();
      let x = touch.clientX - Math.round(rect.left);
      let y = touch.clientY - Math.round(rect.top);

      let point = getSVGPoint(value, x, y);

      points.push({...point, identifier: touch.identifier});
    }
    return points;
  }
}
