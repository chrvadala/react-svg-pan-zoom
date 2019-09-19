import {getSVGPoint} from '../features/common'
import ViewerEvent from './viewer-event';

export default class ViewerMouseEvent extends ViewerEvent{

  get point() {
    if (!this._cachePoint) {
      let event = this.originalEvent, matrix = this.matrix, boundingRect = this.boundingRect;

      let x = event.clientX - Math.round(boundingRect.left);
      let y = event.clientY - Math.round(boundingRect.top);

      this._cachePoint = getSVGPoint(x, y, matrix);
    }
    return this._cachePoint;
  }

  get x() {
    return this.point.x;
  }

  get y() {
    return this.point.y;
  }
}
