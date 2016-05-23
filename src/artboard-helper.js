import {Matrix} from 'transformation-matrix-js';
import {
  MODE_IDLE,
  MODE_PANNING
} from './constants';

export default class ArtboardHelper {

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

  static getPaperPoint(value, x, y){
    let {a, b, c, d, e, f} = value.matrix;
    let matrix = Matrix.from(a, b, c, d, e, f);

    let inverseMatrix = matrix.inverse();
    return inverseMatrix.applyToPoint(x, y);
  }

  static decomposeValue(value){
    let {a, b, c, d, e, f} = value.matrix;
    let matrix = Matrix.from(a, b, c, d, e, f);
    let decompose = matrix.decompose(false);

    return {
      scaleFactor: decompose.scale.x,
      translationX: decompose.translate.x,
      translationY: decompose.translate.y
    }
  }

  static stopPan(value) {
    return {
      mode: MODE_IDLE,
      matrix: Object.assign({}, value.matrix)
    };
  }

}
