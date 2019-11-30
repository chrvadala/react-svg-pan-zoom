import ViewerEvent from './viewer-event';
import {getMousePosition} from "../features/interactions";

export default class ViewerMouseEvent extends ViewerEvent {
  get point() {
    if (!this._cachePoint) {
      const {originalEvent: event, value, SVGViewer} = this;
      this._cachePoint = getMousePosition(event, SVGViewer)
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
