import ViewerEvent from './viewer-event';
import {getMousePosition} from "../features/interactions";
import {getSVGPoint} from "../features/common";

export default class ViewerMouseEvent extends ViewerEvent {
  get point() {
    if (!this._cachePoint) {
      const {originalEvent: event, SVGViewer, value} = this;
      const mousePosition = getMousePosition(event, SVGViewer)
      this._cachePoint = getSVGPoint(value, mousePosition.x, mousePosition.y);
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
