import {Matrix} from 'transformation-matrix-js';

export default class MatrixHelper {
  static stringify(matrix) {
    return `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`;
  }

  static extractTranslation(matrix) {
    return {
      x: matrix.e,
      y: matrix.f
    }
  }

  static translate(matrix, x, y) {
    return Object.assign({}, matrix, {e: x, f: y});
  }

  static scale(matrix, scaleFactor, centerX, centerY) {

    centerX = parseFloat(centerX);
    centerY = parseFloat(centerY);

    let op = new Matrix();
    op = op.translate(centerX, centerY);
    op = op.scaleU(scaleFactor);
    op = op.translate(-centerX, -centerY);

    return MatrixHelper.applyMatrix(matrix, op);
  }

  static identity() {
    return {
      a: 1, c: 0, e: 0,
      b: 0, d: 1, f: 0
    }
  }

  static applyMatrix(matrix, operation){
    let m = Matrix.from(
      matrix.a,
      matrix.b,
      matrix.c,
      matrix.d,
      matrix.e,
      matrix.f);

    m.multiply(operation);

    return { a: m.a, b: m.b, c: m.c,  d: m.d, e: m.e, f: m.f };
  }
}
