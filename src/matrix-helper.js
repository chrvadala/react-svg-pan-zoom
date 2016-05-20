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

  static identity(){
    return {
      a: 1, c: 0, e: 0,
      b: 0, d: 1, f: 0
    }
  }
}
