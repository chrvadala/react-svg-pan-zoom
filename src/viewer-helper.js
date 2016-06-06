import {Matrix} from 'transformation-matrix-js';
import {calculateBox} from './utils';
import update from 'react-addons-update';
import {
  MODE_IDLE,
  MODE_PANNING,
  MODE_ZOOMING
} from './constants';

let matrix2obj = matrix => {
  return {a: matrix.a, b: matrix.b, c: matrix.c, d: matrix.d, e: matrix.e, f: matrix.f}
};

export default class ViewerHelper {

  static getDefaultValue() {
    let matrix = new Matrix();

    return {
      mode: MODE_IDLE,
      matrix: matrix2obj(matrix),
      specialKeyEnabled: false
    };
  }

  static zoom(value, scaleFactor, viewerX, viewerY) {
    let {a, b, c, d, e, f} = value.matrix;
    let matrix = Matrix.from(a, b, c, d, e, f);

    let SVGPoint = ViewerHelper.getSVGPoint(value, viewerX, viewerY);

    let act = new Matrix();
    act = act.translate(SVGPoint.x, SVGPoint.y);
    act = act.scaleU(scaleFactor);
    act = act.translate(-SVGPoint.x, -SVGPoint.y);

    matrix = matrix.multiply(act);

    return update(value, {
      $merge: {
        mode: MODE_IDLE,
        matrix: matrix2obj(matrix)
      }
    });
  }

  static pan(value, deltaX, deltaY) {
    let {a, b, c, d, e, f} = value.matrix;
    let matrix = Matrix.from(a, b, c, d, e, f);

    let act = new Matrix();
    act = act.translate(deltaX, deltaY);

    matrix = matrix.multiply(act);

    return update(value, {
      $merge: {
        mode: MODE_IDLE,
        matrix: matrix2obj(matrix)
      }
    });
  }

  static startPan(value, startX, startY) {
    let matrix = value.matrix;

    return update(value, {
      $merge: {
        mode: MODE_PANNING,
        startX,
        startY,
        matrix: matrix2obj(matrix)
      }
    });
  }

  static updatePan(value, x, y, panLimit, SVGWidth, SVGHeight, viewerWidth, viewerHeight) {

    if (value.mode !== MODE_PANNING) throw new Error('update pan not allowed in this mode ' + value.mode);

    let {a, b, c, d, e, f} = value.matrix;
    let matrix = Matrix.from(a, b, c, d, e, f);
    let zoomLevel = matrix.decompose(false).scale.x;

    let deltaX = (value.startX - x) / zoomLevel;
    let deltaY = (value.startY - y) / zoomLevel;

    let act = new Matrix();
    act = act.translate(-deltaX, -deltaY);

    matrix = matrix.multiply(act);

    //apply pan limits
    matrix.e = Math.min(matrix.e, viewerWidth - panLimit);
    matrix.e = Math.max(matrix.e, panLimit - SVGWidth * zoomLevel);

    matrix.f = Math.min(matrix.f, viewerHeight - panLimit);
    matrix.f = Math.max(matrix.f, panLimit - SVGHeight * zoomLevel);

    return update(value, {
      $merge: {
        mode: MODE_PANNING,
        startX: x,
        startY: y,
        matrix: matrix2obj(matrix)
      }
    });
  }

  static stopPan(value) {
    return update(value, {
      $merge: {
        mode: MODE_IDLE
      }
    });
  }

  static startZoomSelection(value, x, y) {
    return update(value, {
      $merge: {
        mode: MODE_ZOOMING,
        startX: x,
        startY: y,
        endX: x,
        endY: y
      }
    });
  }

  static updateZoomSelection(value, x, y) {
    if (value.mode !== MODE_ZOOMING) throw new Error('update selection not allowed in this mode ' + value.mode);

    return update(value, {
      $merge: {
        mode: MODE_ZOOMING,
        endX: x,
        endY: y
      }
    });
  }

  static stopZoomSelection(value, viewerWidth, viewerHeight) {
    let {startX, startY, endX, endY} = value;

    let start = ViewerHelper.getSVGPoint(value, startX, startY);
    let end = ViewerHelper.getSVGPoint(value, endX, endY);

    let box = calculateBox(start, end);

    return ViewerHelper.fitSelectionToViewer(value, box.x, box.y, box.width, box.height, viewerWidth, viewerHeight);
  }

  static fitSelectionToViewer(value, selectionX, selectionY, selectionWidth, selectionHeight, viewerWidth, viewerHeight) {

    let scaleX = viewerWidth / selectionWidth;
    let scaleY = viewerHeight / selectionHeight;

    let scale = Math.min(scaleX, scaleY);

    let matrix = new Matrix();
    matrix = matrix.scaleU(scale);
    matrix = matrix.translate(-selectionX, -selectionY);

    return update(value, {
      $merge: {
        mode: MODE_IDLE,
        matrix: matrix2obj(matrix)
      }
    });
  }

  static fitSVGToViewer(value, SVGWidth, SVGHeight, viewerWidth, viewerHeight) {
    return ViewerHelper.fitSelectionToViewer(value, 0, 0, SVGWidth, SVGHeight, viewerWidth, viewerHeight);
  }

  static enableSpecialKey(value) {
    return update(value, {
      $merge: {
        specialKeyEnabled: true
      }
    });
  }

  static disableSpecialKey(value) {
    return update(value, {
      $merge: {
        specialKeyEnabled: false
      }
    });
  }

  static getSVGPoint(value, viewerX, viewerY) {
    let {a, b, c, d, e, f} = value.matrix;
    let matrix = Matrix.from(a, b, c, d, e, f);

    let inverseMatrix = matrix.inverse();
    return inverseMatrix.applyToPoint(viewerX, viewerY);
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

  static isPointInsideSVG(x, y, SVGWidth, SVGHeight){
    return 0 <= x
        && x <= SVGWidth
        && 0 <= y
        && y <= SVGHeight;
  }

}
