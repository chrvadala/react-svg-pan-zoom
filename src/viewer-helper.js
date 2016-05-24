import {Matrix} from 'transformation-matrix-js';
import {
  MODE_IDLE,
  MODE_PANNING,
  MODE_ZOOM_SELECTING
} from './constants';

export default class ViewerHelper {

  static getDefaultValue() {
    let matrix = new Matrix();

    return {
      matrix: {a: matrix.a, b: matrix.b, c: matrix.c, d: matrix.d, e: matrix.e, f: matrix.f},
      mode: MODE_IDLE
    };
  }

  static zoom(value, scaleFactor, centerX, centerY) {
    let {a, b, c, d, e, f} = value.matrix;
    let matrix = Matrix.from(a, b, c, d, e, f);

    let act = new Matrix();
    act = act.translate(centerX, centerY);
    act = act.scaleU(scaleFactor);
    act = act.translate(-centerX, -centerY);

    matrix = matrix.multiply(act);

    return {
      mode: MODE_IDLE,
      matrix: {a: matrix.a, b: matrix.b, c: matrix.c, d: matrix.d, e: matrix.e, f: matrix.f}
    };
  }

  static pan(value, deltaX, deltaY) {
    let {a, b, c, d, e, f} = value.matrix;
    let matrix = Matrix.from(a, b, c, d, e, f);

    let act = new Matrix();
    act = act.translate(deltaX, deltaY);

    matrix = matrix.multiply(act);

    return {
      mode: MODE_IDLE,
      matrix: {a: matrix.a, b: matrix.b, c: matrix.c, d: matrix.d, e: matrix.e, f: matrix.f}
    };
  }

  static startPan(value, startX, startY) {
    return {
      mode: MODE_PANNING,
      startX,
      startY,
      matrix: Object.assign({}, value.matrix)
    };
  }

  static updatePan(value, x, y) {

    if (value.mode !== MODE_PANNING) throw new Error('update pan not allowed in this mode ' + value.mode);

    let {a, b, c, d, e, f} = value.matrix;
    let matrix = Matrix.from(a, b, c, d, e, f);
    let zoomLevel = matrix.decompose(false).scale.x;

    let deltaX = (value.startX - x) / zoomLevel;
    let deltaY = (value.startY - y) / zoomLevel;

    let act = new Matrix();
    act = act.translate(-deltaX, -deltaY);

    matrix = matrix.multiply(act);

    return {
      mode: MODE_PANNING,
      startX: x,
      startY: y,
      matrix: {a: matrix.a, b: matrix.b, c: matrix.c, d: matrix.d, e: matrix.e, f: matrix.f}
    };

  }

  static stopPan(value) {
    return {
      mode: MODE_IDLE,
      matrix: Object.assign({}, value.matrix)
    };
  }

  static startZoomSelection(value, x, y) {
    return {
      mode: MODE_ZOOM_SELECTING,
      startX: x,
      startY: y,
      endX: x,
      endY: y,
      matrix: Object.assign({}, value.matrix)
    };
  }

  static updateZoomSelection(value, x, y) {
    if (value.mode !== MODE_ZOOM_SELECTING) throw new Error('update selection not allowed in this mode ' + value.mode);

    return {
      mode: MODE_ZOOM_SELECTING,
      startX: value.startX,
      startY: value.startY,
      endX: x,
      endY: y,
      matrix: Object.assign({}, value.matrix)
    };
  }

  static stopZoomSelection(value, viewerWidth, viewerHeight) {
    let {startX, startY, endX, endY} = value;

    let start = ViewerHelper.getArtboardPoint(value, startX, startY);
    let end = ViewerHelper.getArtboardPoint(value, endX, endY);

    let selectionWidth = end.x - start.x;
    let selectionHeight = end.y - start.y;

    return ViewerHelper.fitSelectionToViewer(value, start.x, start.y, selectionWidth, selectionHeight, viewerWidth, viewerHeight);
  }

  static fitSelectionToViewer(value, selectionX, selectionY, selectionWidth, selectionHeight, viewerWidth, viewerHeight){

    let scaleX = viewerWidth / selectionWidth;
    let scaleY = viewerHeight / selectionHeight;

    let scale = Math.min(scaleX, scaleY);

    let matrix = new Matrix();
    matrix = matrix.scaleU(scale);
    matrix = matrix.translate(-selectionX, -selectionY);

    return {
      mode: MODE_IDLE,
      matrix: {a: matrix.a, b: matrix.b, c: matrix.c, d: matrix.d, e: matrix.e, f: matrix.f}
    };
  }

  static getArtboardPoint(value, x, y) {
    let {a, b, c, d, e, f} = value.matrix;
    let matrix = Matrix.from(a, b, c, d, e, f);

    let inverseMatrix = matrix.inverse();
    return inverseMatrix.applyToPoint(x, y);
  }

  static decomposeValue(value) {
    let {a, b, c, d, e, f} = value.matrix;
    let matrix = Matrix.from(a, b, c, d, e, f);
    let decompose = matrix.decompose(false);

    return {
      scaleFactor: decompose.scale.x,
      translationX: decompose.translate.x,
      translationY: decompose.translate.y
    }
  }

}
