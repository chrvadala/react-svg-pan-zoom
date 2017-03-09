var ReactSVGPanZoom =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return MODE_IDLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return MODE_PANNING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return MODE_ZOOMING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TOOL_AUTO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TOOL_NONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TOOL_PAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TOOL_ZOOM_IN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return TOOL_ZOOM_OUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return POSITION_NONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return POSITION_TOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return POSITION_RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return POSITION_BOTTOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return POSITION_LEFT; });
var MODE_IDLE = 'idle';
var MODE_PANNING = 'panning';
var MODE_ZOOMING = 'zooming';

var TOOL_AUTO = 'auto';
var TOOL_NONE = 'none';
var TOOL_PAN = 'pan';
var TOOL_ZOOM_IN = 'zoom-in';
var TOOL_ZOOM_OUT = 'zoom-out';

var POSITION_NONE = 'none';
var POSITION_TOP = 'top';
var POSITION_RIGHT = 'right';
var POSITION_BOTTOM = 'bottom';
var POSITION_LEFT = 'left';

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_transformation_matrix_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_transformation_matrix_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix_js__);
/* harmony export (immutable) */ __webpack_exports__["e"] = getDefaultValue;
/* harmony export (immutable) */ __webpack_exports__["c"] = set;
/* unused harmony export isValueValid */
/* harmony export (immutable) */ __webpack_exports__["d"] = getSVGPoint;
/* harmony export (immutable) */ __webpack_exports__["j"] = decompose;
/* harmony export (immutable) */ __webpack_exports__["i"] = setFocus;
/* harmony export (immutable) */ __webpack_exports__["f"] = setViewerSize;
/* harmony export (immutable) */ __webpack_exports__["g"] = setSVGSize;
/* harmony export (immutable) */ __webpack_exports__["a"] = setPointOnViewerCenter;
/* harmony export (immutable) */ __webpack_exports__["b"] = reset;
/* harmony export (immutable) */ __webpack_exports__["h"] = resetMode;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };




/**
 * Obtain default value
 * @returns {Object}
 */
function getDefaultValue(viewerWidth, viewerHeight, SVGWidth, SVGHeight) {
  return set({}, {
    version: 2,
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["k" /* MODE_IDLE */],
    focus: false,
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
    viewerWidth: viewerWidth,
    viewerHeight: viewerHeight,
    SVGWidth: SVGWidth,
    SVGHeight: SVGHeight,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  });
}

/**
 * Change value
 * @param value
 * @param change
 * @returns {Object}
 */
function set(value, change) {
  value = Object.assign({}, value, change);
  return Object.freeze(value);
}

/**
 * value valid check
 * @param value
 */
function isValueValid(value) {
  return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.hasOwnProperty('version');
}

/**
 * Export x,y coords relative to SVG
 * @param value
 * @param viewerX
 * @param viewerY
 * @returns {*|{x, y}|{x: number, y: number}}
 */
function getSVGPoint(value, viewerX, viewerY) {
  var a = value.a,
      b = value.b,
      c = value.c,
      d = value.d,
      e = value.e,
      f = value.f;

  var matrix = __WEBPACK_IMPORTED_MODULE_1_transformation_matrix_js__["Matrix"].from(a, b, c, d, e, f);

  var inverseMatrix = matrix.inverse();
  return inverseMatrix.applyToPoint(viewerX, viewerY);
}

/**
 * Decompose matrix from value
 * @param value
 * @returns {{scaleFactor: number, translationX: number, translationY: number}}
 */
function decompose(value) {
  var a = value.a,
      b = value.b,
      c = value.c,
      d = value.d,
      e = value.e,
      f = value.f;

  var matrix = __WEBPACK_IMPORTED_MODULE_1_transformation_matrix_js__["Matrix"].from(a, b, c, d, e, f);

  var decompose = matrix.decompose(false);

  return {
    scaleFactor: decompose.scale.x,
    translationX: decompose.translate.x,
    translationY: decompose.translate.y
  };
}

/**
 *
 * @param value
 * @param focus
 * @returns {Object}
 */
function setFocus(value, focus) {
  return set(value, { focus: focus });
}

/**
 *
 * @param value
 * @param viewerWidth
 * @param viewerHeight
 * @returns {Object}
 */
function setViewerSize(value, viewerWidth, viewerHeight) {
  return set(value, { viewerWidth: viewerWidth, viewerHeight: viewerHeight });
}

/**
 *
 * @param value
 * @param SVGWidth
 * @param SVGHeight
 * @returns {Object}
 */
function setSVGSize(value, SVGWidth, SVGHeight) {
  return set(value, { SVGWidth: SVGWidth, SVGHeight: SVGHeight });
}

/**
 *
 * @param value
 * @param SVGPointX
 * @param SVGPointY
 * @param zoomLevel
 * @returns {Object}
 */
function setPointOnViewerCenter(value, SVGPointX, SVGPointY, zoomLevel) {
  var viewerWidth = value.viewerWidth,
      viewerHeight = value.viewerHeight;


  var matrix = new __WEBPACK_IMPORTED_MODULE_1_transformation_matrix_js__["Matrix"]().translate(-SVGPointX + viewerWidth / 2, -SVGPointY + viewerHeight / 2) //4
  .translate(SVGPointX, SVGPointY) //3
  .scaleU(zoomLevel) //2
  .translate(-SVGPointX, -SVGPointY); //1

  return set(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["k" /* MODE_IDLE */],
    a: matrix.a,
    b: matrix.b,
    c: matrix.c,
    d: matrix.d,
    e: matrix.e,
    f: matrix.f
  });
}

/**
 *
 * @param value
 * @returns {Object}
 */
function reset(value) {
  var matrix = new __WEBPACK_IMPORTED_MODULE_1_transformation_matrix_js__["Matrix"]();

  return set(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["k" /* MODE_IDLE */],
    a: matrix.a,
    b: matrix.b,
    c: matrix.c,
    d: matrix.d,
    e: matrix.e,
    f: matrix.f
  });
}

/**
 *
 * @param value
 * @returns {Object}
 */
function resetMode(value) {
  return set(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["k" /* MODE_IDLE */],
    startX: null,
    startY: null,
    endX: null,
    endY: null
  });
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_transformation_matrix_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_transformation_matrix_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_transformation_matrix_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["a"] = zoom;
/* harmony export (immutable) */ __webpack_exports__["b"] = fitSelection;
/* harmony export (immutable) */ __webpack_exports__["c"] = fitToViewer;
/* harmony export (immutable) */ __webpack_exports__["d"] = zoomOnViewerCenter;
/* harmony export (immutable) */ __webpack_exports__["e"] = startZooming;
/* harmony export (immutable) */ __webpack_exports__["g"] = updateZooming;
/* harmony export (immutable) */ __webpack_exports__["f"] = stopZooming;





function zoom(value, SVGPointX, SVGPointY, scaleFactor) {
  var a = value.a,
      b = value.b,
      c = value.c,
      d = value.d,
      e = value.e,
      f = value.f;

  var matrix = __WEBPACK_IMPORTED_MODULE_2_transformation_matrix_js__["Matrix"].from(a, b, c, d, e, f);

  var act = new __WEBPACK_IMPORTED_MODULE_2_transformation_matrix_js__["Matrix"]();
  act = act.translate(SVGPointX, SVGPointY);
  act = act.scaleU(scaleFactor);
  act = act.translate(-SVGPointX, -SVGPointY);

  matrix = matrix.multiply(act);

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["k" /* MODE_IDLE */],
    a: matrix.a,
    b: matrix.b,
    c: matrix.c,
    d: matrix.d,
    e: matrix.e,
    f: matrix.f,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  });
}

function fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
  var viewerWidth = value.viewerWidth,
      viewerHeight = value.viewerHeight;


  var scaleX = viewerWidth / selectionWidth;
  var scaleY = viewerHeight / selectionHeight;

  var scale = Math.min(scaleX, scaleY);

  var matrix = new __WEBPACK_IMPORTED_MODULE_2_transformation_matrix_js__["Matrix"]();
  matrix = matrix.scaleU(scale);
  matrix = matrix.translate(-selectionSVGPointX, -selectionSVGPointY);

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["k" /* MODE_IDLE */],
    a: matrix.a,
    b: matrix.b,
    c: matrix.c,
    d: matrix.d,
    e: matrix.e,
    f: matrix.f,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  });
}

function fitToViewer(value) {
  return fitSelection(value, 0, 0, value.SVGWidth, value.SVGHeight);
}

function zoomOnViewerCenter(value, scaleFactor) {
  var viewerWidth = value.viewerWidth,
      viewerHeight = value.viewerHeight;

  var SVGPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, viewerWidth / 2, viewerHeight / 2);
  return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
}

function startZooming(value, viewerX, viewerY) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["l" /* MODE_ZOOMING */],
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  });
}

function updateZooming(value, viewerX, viewerY) {
  if (value.mode !== __WEBPACK_IMPORTED_MODULE_0__constants__["l" /* MODE_ZOOMING */]) throw new Error('update selection not allowed in this mode ' + value.mode);

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(value, {
    endX: viewerX,
    endY: viewerY
  });
}

function stopZooming(value, viewerX, viewerY, scaleFactor) {
  var startX = value.startX,
      startY = value.startY,
      endX = value.endX,
      endY = value.endY;


  var start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, startX, startY);
  var end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, endX, endY);

  if (Math.abs(startX - endX) > 7 && Math.abs(startY - endY) > 7) {
    var box = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* calculateBox */])(start, end);
    return fitSelection(value, box.x, box.y, box.width, box.height);
  } else {
    var SVGPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, viewerX, viewerY);
    return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
  }
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_transformation_matrix_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_transformation_matrix_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_transformation_matrix_js__);
/* harmony export (immutable) */ __webpack_exports__["a"] = pan;
/* harmony export (immutable) */ __webpack_exports__["b"] = startPanning;
/* harmony export (immutable) */ __webpack_exports__["d"] = updatePanning;
/* harmony export (immutable) */ __webpack_exports__["c"] = stopPanning;
/* harmony export (immutable) */ __webpack_exports__["e"] = autoPanIfNeeded;




/**
 *
 * @param value
 * @param SVGDeltaX
 * @param SVGDeltaY
 * @param panLimit
 * @returns {Object}
 */
function pan(value, SVGDeltaX, SVGDeltaY) {
  var panLimit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
  var a = value.a,
      b = value.b,
      c = value.c,
      d = value.d,
      e = value.e,
      f = value.f;

  var matrix = __WEBPACK_IMPORTED_MODULE_2_transformation_matrix_js__["Matrix"].from(a, b, c, d, e, f);

  var act = new __WEBPACK_IMPORTED_MODULE_2_transformation_matrix_js__["Matrix"]();
  act = act.translate(SVGDeltaX, SVGDeltaY);

  matrix = matrix.multiply(act);

  // apply pan limits
  if (panLimit) {
    var zoomLevel = matrix.decompose(false).scale.x;
    matrix.e = Math.min(matrix.e, value.viewerWidth - panLimit);
    matrix.e = Math.max(matrix.e, panLimit - value.SVGWidth * zoomLevel);

    matrix.f = Math.min(matrix.f, value.viewerHeight - panLimit);
    matrix.f = Math.max(matrix.f, panLimit - value.SVGHeight * zoomLevel);
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["k" /* MODE_IDLE */],
    a: matrix.a,
    b: matrix.b,
    c: matrix.c,
    d: matrix.d,
    e: matrix.e,
    f: matrix.f
  });
}

function startPanning(value, viewerX, viewerY) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["m" /* MODE_PANNING */],
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  });
}

function updatePanning(value, viewerX, viewerY, panLimit) {
  if (value.mode !== __WEBPACK_IMPORTED_MODULE_0__constants__["m" /* MODE_PANNING */]) throw new Error('update pan not allowed in this mode ' + value.mode);

  var endX = value.endX,
      endY = value.endY;


  var start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, endX, endY);
  var end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, viewerX, viewerY);

  var deltaX = end.x - start.x;
  var deltaY = end.y - start.y;

  var nextValue = pan(value, deltaX, deltaY, panLimit);
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(nextValue, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["m" /* MODE_PANNING */],
    endX: viewerX,
    endY: viewerY
  });
}

function stopPanning(value) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["k" /* MODE_IDLE */],
    startX: null,
    startY: null,
    endX: null,
    endY: null
  });
}

function autoPanIfNeeded(value, viewerX, viewerY) {
  var deltaX = 0;
  var deltaY = 0;

  if (viewerY <= 20) deltaY = 20;
  if (value.viewerWidth - viewerX <= 20) deltaX = -20;
  if (value.viewerHeight - viewerY <= 20) deltaY = -20;
  if (viewerX <= 20) deltaX = 20;

  return deltaX === 0 && deltaY === 0 ? value : pan(value, deltaX, deltaY);
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = calculateBox;
/* harmony export (immutable) */ __webpack_exports__["b"] = mapRange;
function calculateBox(start, end) {
  if (start.x <= end.x && start.y <= end.y) {
    return {
      x: start.x,
      y: start.y,
      width: end.x - start.x,
      height: end.y - start.y
    };
  } else if (start.x >= end.x && start.y <= end.y) {
    return {
      x: end.x,
      y: start.y,
      width: start.x - end.x,
      height: end.y - start.y
    };
  } else if (start.x >= end.x && start.y >= end.y) {
    return {
      x: end.x,
      y: end.y,
      width: start.x - end.x,
      height: start.y - end.y
    };
  } else if (start.x <= end.x && start.y >= end.y) {
    return {
      x: start.x,
      y: end.y,
      width: end.x - start.x,
      height: start.y - end.y
    };
  }
}

function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*!
	2D Transformation Matrix v2.7.1
	(c) Epistemex.com 2014-2017
	License: MIT, header required.
*/

/**
 * 2D transformation matrix object initialized with identity matrix.
 *
 * The matrix can synchronize a canvas 2D context by supplying the context
 * as an argument, or later apply current absolute transform to an
 * existing context.
 *
 * To synchronize a DOM element you can use [`toCSS()`]{@link Matrix#toCSS} or [`toCSS3D()`]{@link Matrix#toCSS3D}.
 *
 * @param {CanvasRenderingContext2D} [context] - Optional context to sync with Matrix
 * @param {HTMLElement} [element=null] - DOM Element to synchronize
 * @prop {number} a - scale x
 * @prop {number} b - shear y
 * @prop {number} c - shear x
 * @prop {number} d - scale y
 * @prop {number} e - translate x
 * @prop {number} f - translate y
 * @prop {CanvasRenderingContext2D} [context] - set or get current synchronized 2D context
 * @prop {HTMLElement} [element] - get current synchronized DOM element
 * @prop {boolean} [useCSS3D=false] - is a DOM element is defined for sync., choose whether to use 2D (false) or 3D (true) matrix to sync it.
 * @constructor
 * @license MIT license (header required)
 * @copyright Epistemex.com 2014-2016
 */
function Matrix(context, element) {

	var me = this, _el;
	me._t = me.transform;

	me.a = me.d = 1;
	me.b = me.c = me.e = me.f = 0;

	// sync context
	if (context)
		(me.context = context).setTransform(1, 0, 0, 1, 0, 0);

	// sync DOM element
	Object.defineProperty(me, "element", {
		get: function() {return _el},
		set: function(el) {
			if (!_el) {
				me._px = me._getPX();
				me.useCSS3D = false
			}
			_el = el;
			(me._st = _el.style)[me._px] = me.toCSS();
		}
	});

	if (element) me.element = element
}

/**
 * Returns a new matrix that transforms a triangle `t1` into another triangle
 * `t2`, or throws an exception if it is impossible.
 *
 * Note: the method can take both arrays as well as literal objects.
 * Just make sure that both arguments (`t1`, `t2`) are of the same type.
 *
 * @param {{px: number, py: number, qx: number, qy: number, rx: number, ry: number}|Array} t1 - Object or array containing the three points for the triangle.
 * For object use obj.px, obj.py, obj.qx, obj.qy, obj.rx and obj.ry. For arrays provide the points in the order [px, py, qx, qy, rx, ry], or as point array [{x:,y:}, {x:,y:}, {x:,y:}]
 * @param {{px: number, py: number, qx: number, qy: number, rx: number, ry: number}|Array} t2 - See description for t1.
 * @param {CanvasRenderingContext2D} [context] - optional canvas 2D context to use for the matrix
 * @returns {Matrix}
 * @throws Exception is matrix becomes not invertible
 * @static
 */
Matrix.fromTriangles = function(t1, t2, context) {

	var m1 = new Matrix(),
		m2 = new Matrix(context),
		r1, r2, rx1, ry1, rx2, ry2;

	if (Array.isArray(t1)) {
		if (typeof t1[0] === "number") {
			rx1 = t1[4]; ry1 = t1[5]; rx2 = t2[4]; ry2 = t2[5];
			r1 = [t1[0] - rx1, t1[1] - ry1, t1[2] - rx1, t1[3] - ry1, rx1, ry1];
			r2 = [t2[0] - rx2, t2[1] - ry2, t2[2] - rx2, t2[3] - ry2, rx2, ry2]
		}
		else {
			rx1 = t1[2].x; ry1 = t1[2].y; rx2 = t2[2].x; ry2 = t2[2].y;
			r1 = [t1[0].x - rx1, t1[0].y - ry1, t1[1].x - rx1, t1[1].y - ry1, rx1, ry1];
			r2 = [t2[0].x - rx2, t2[0].y - ry2, t2[1].x - rx2, t2[1].y - ry2, rx2, ry2]
		}
	}
	else {
		r1 = [t1.px - t1.rx, t1.py - t1.ry, t1.qx - t1.rx, t1.qy - t1.ry, t1.rx, t1.ry];
		r2 = [t2.px - t2.rx, t2.py - t2.ry, t2.qx - t2.rx, t2.qy - t2.ry, t2.rx, t2.ry]
	}

	m1.setTransform.apply(m1, r1);
	m2.setTransform.apply(m2, r2);

	return m2.multiply(m1.inverse())
};

/**
 * Create a matrix from a transform list from an SVG shape. The list
 * can be for example baseVal (i.e. `shape.transform.baseVal`).
 *
 * The resulting matrix has all transformations from that list applied
 * in the same order as the list.
 *
 * @param {SVGTransformList} tList - transform list from an SVG shape.
 * @param {CanvasRenderingContext2D} [context] - optional canvas 2D context to use for the matrix
 * @param {HTMLElement} [dom] - optional DOM element to use for the matrix
 * @returns {Matrix}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGTransformList|MDN / SVGTransformList}
 */
Matrix.fromSVGTransformList = function(tList, context, dom) {

	var m = new Matrix(context, dom),
		i = 0;

	while(i < tList.length)
		m.multiply(tList[i++].matrix);

	return m
};

/**
 * Create and transform a new matrix based on given matrix values, or
 * provide SVGMatrix or a (2D) DOMMatrix or another instance of a Matrix
 * (in fact, any 2D matrix object using properties a-f can be used as source).
 *
 * @example
 *
 * var m = Matrix.from(1, 0.2, 0, 2, 120, 97);
 * var m = Matrix.from(domMatrix, ctx);
 * var m = Matrix.from(svgMatrix);
 * var m = Matrix.from(matrix);
 * var m = Matrix.from(vector [,pre-x] [,pre-y] [,doScale]);
 *
 * @param {*} a - number representing a in [a-f], or a Matrix object containing properties a-f. Vector is given as an object with properties x and y.
 * @param {*} [b] - b property if a is not a matrix object, or optional canvas 2D context.
 * If vector is input this will be pre-translate for x.
 * @param {number} [c] - If vector is input this will be pre-translate for y.
 * @param {number} [d] - If vector is input, set this to true to use scale and translate of 1,
 * false to use hypotenuse as translate distance instead and no scale.
 * @param {number} [e]
 * @param {number} [f]
 * @param {CanvasRenderingContext2D} [context] - optional canvas context to synchronize
 * @param {HTMLElement} [dom] - optional DOM element to use for the matrix
 * @returns {Matrix}
 * @static
 */
Matrix.from = function(a, b, c, d, e, f, context, dom) {

	var m = new Matrix(context, dom), scale, dist, q;

	if (typeof a === "number")
		m.setTransform(a, b, c, d, e, f);

	else if (typeof a.x === "number") {		// vector

		q = Math.sqrt(a.x*a.x + a.y*a.y);
		scale = dist = 1;

		if (d) scale = q;
		else dist = q;

		m
			.translate(b || 0, c || 0)
			.rotateFromVector(a)
			.scaleU(scale)
			.translate(dist, 0);

	}
	else {
		if (typeof a.is2D === "boolean" && !a.is2D) throw "Cannot use 3D DOMMatrix.";
		if (b) m.context = b;
		if (c) m.element = c;
		m.multiply(a)
	}

	return m
};

Matrix.prototype = {

	_getPX: function() {

		var lst   = ["t", "oT", "msT", "mozT", "webkitT", "khtmlT"], i = 0, p,
			style = document.createElement("div").style;

		while(p = lst[i++])
			if (typeof style[p + "ransform"] !== "undefined") return p + "ransform";
	},

	/**
	 * Concatenates transforms of this matrix onto the given child matrix and
	 * returns a new matrix. This instance is used on left side.
	 *
	 * @param {Matrix|SVGMatrix} cm - child matrix to apply concatenation to
	 * @returns {Matrix} - new Matrix instance
	 */
	concat: function(cm) {
		return this.clone().multiply(cm)
	},

	/**
	 * Flips the horizontal values.
	 * @returns {Matrix}
	 */
	flipX: function() {
		return this._t(-1, 0, 0, 1, 0, 0)
	},

	/**
	 * Flips the vertical values.
	 * @returns {Matrix}
	 */
	flipY: function() {
		return this._t(1, 0, 0, -1, 0, 0)
	},

	/**
	 * Reflects incoming (velocity) vector on the normal which will be the
	 * current transformed x axis. Call when a trigger condition is met.
	 *
	 * @param {number} x - vector end point for x (start = 0)
	 * @param {number} y - vector end point for y (start = 0)
	 * @returns {{x: number, y: number}}
	 */
	reflectVector: function(x, y) {

		var v = this.applyToPoint(0, 1),
			d = (v.x * x + v.y * y) * 2;

		x -= d * v.x;
		y -= d * v.y;

		return {x: x, y: y}
	},

	/**
	 * Short-hand to reset current matrix to an identity matrix.
	 * @returns {Matrix}
	 */
	reset: function() {
		return this.setTransform(1, 0, 0, 1, 0, 0)
	},

	/**
	 * Rotates current matrix by angle (accumulative).
	 * @param {number} angle - angle in radians
	 * @returns {Matrix}
	 */
	rotate: function(angle) {
		var cos = Math.cos(angle),
			sin = Math.sin(angle);
		return this._t(cos, sin, -sin, cos, 0, 0)
	},

	/**
	 * Converts a vector given as `x` and `y` to angle, and
	 * rotates (accumulative). x can instead contain an object with
	 * properties x and y and if so, y parameter will be ignored.
	 * @param {number|*} x
	 * @param {number} [y]
	 * @returns {Matrix}
	 */
	rotateFromVector: function(x, y) {
		return this.rotate(typeof x === "number" ? Math.atan2(y, x) : Math.atan2(x.y, x.x))
	},

	/**
	 * Helper method to make a rotation based on an angle in degrees.
	 * @param {number} angle - angle in degrees
	 * @returns {Matrix}
	 */
	rotateDeg: function(angle) {
		return this.rotate(angle * Math.PI / 180)
	},

	/**
	 * Scales current matrix uniformly and accumulative.
	 * @param {number} f - scale factor for both x and y (1 does nothing)
	 * @returns {Matrix}
	 */
	scaleU: function(f) {
		return this._t(f, 0, 0, f, 0, 0)
	},

	/**
	 * Scales current matrix accumulative.
	 * @param {number} sx - scale factor x (1 does nothing)
	 * @param {number} sy - scale factor y (1 does nothing)
	 * @returns {Matrix}
	 */
	scale: function(sx, sy) {
		return this._t(sx, 0, 0, sy, 0, 0)
	},

	/**
	 * Scales current matrix on x axis accumulative.
	 * @param {number} sx - scale factor x (1 does nothing)
	 * @returns {Matrix}
	 */
	scaleX: function(sx) {
		return this._t(sx, 0, 0, 1, 0, 0)
	},

	/**
	 * Scales current matrix on y axis accumulative.
	 * @param {number} sy - scale factor y (1 does nothing)
	 * @returns {Matrix}
	 */
	scaleY: function(sy) {
		return this._t(1, 0, 0, sy, 0, 0)
	},

	/**
	 * Converts a vector given as `x` and `y` to normalized scale.
	 * @param x
	 * @param y
	 * @returns {Matrix}
	 */
	scaleFromVector: function(x, y) {
		return this.scaleU(Math.sqrt(x*x + y*y))
	},

	/**
	 * Apply shear to the current matrix accumulative.
	 * @param {number} sx - amount of shear for x
	 * @param {number} sy - amount of shear for y
	 * @returns {Matrix}
	 */
	shear: function(sx, sy) {
		return this._t(1, sy, sx, 1, 0, 0)
	},

	/**
	 * Apply shear for x to the current matrix accumulative.
	 * @param {number} sx - amount of shear for x
	 * @returns {Matrix}
	 */
	shearX: function(sx) {
		return this._t(1, 0, sx, 1, 0, 0)
	},

	/**
	 * Apply shear for y to the current matrix accumulative.
	 * @param {number} sy - amount of shear for y
	 * @returns {Matrix}
	 */
	shearY: function(sy) {
		return this._t(1, sy, 0, 1, 0, 0)
	},

	/**
	 * Apply skew to the current matrix accumulative. Angles in radians.
	 * Also see [`skewDeg()`]{@link Matrix#skewDeg}.
	 * @param {number} ax - angle of skew for x
	 * @param {number} ay - angle of skew for y
	 * @returns {Matrix}
	 */
	skew: function(ax, ay) {
		return this.shear(Math.tan(ax), Math.tan(ay))
	},

	/**
	 * Apply skew to the current matrix accumulative. Angles in degrees.
	 * Also see [`skew()`]{@link Matrix#skew}.
	 * @param {number} ax - angle of skew for x
	 * @param {number} ay - angle of skew for y
	 * @returns {Matrix}
	 */
	skewDeg: function(ax, ay) {
		return this.shear(Math.tan(ax / 180 * Math.PI), Math.tan(ay / 180 * Math.PI))
	},

	/**
	 * Apply skew for x to the current matrix accumulative. Angles in radians.
	 * Also see [`skewDeg()`]{@link Matrix#skewDeg}.
	 * @param {number} ax - angle of skew for x
	 * @returns {Matrix}
	 */
	skewX: function(ax) {
		return this.shearX(Math.tan(ax))
	},

	/**
	 * Apply skew for y to the current matrix accumulative. Angles in radians.
	 * Also see [`skewDeg()`]{@link Matrix#skewDeg}.
	 * @param {number} ay - angle of skew for y
	 * @returns {Matrix}
	 */
	skewY: function(ay) {
		return this.shearY(Math.tan(ay))
	},

	/**
	 * Set current matrix to new absolute matrix.
	 * @param {number} a - scale x
	 * @param {number} b - shear y
	 * @param {number} c - shear x
	 * @param {number} d - scale y
	 * @param {number} e - translate x
	 * @param {number} f - translate y
	 * @returns {Matrix}
	 */
	setTransform: function(a, b, c, d, e, f) {
		var me = this;
		me.a = a;
		me.b = b;
		me.c = c;
		me.d = d;
		me.e = e;
		me.f = f;
		return me._x()
	},

	/**
	 * Translate current matrix accumulative.
	 * @param {number} tx - translation for x
	 * @param {number} ty - translation for y
	 * @returns {Matrix}
	 */
	translate: function(tx, ty) {
		return this._t(1, 0, 0, 1, tx, ty)
	},

	/**
	 * Translate current matrix on x axis accumulative.
	 * @param {number} tx - translation for x
	 * @returns {Matrix}
	 */
	translateX: function(tx) {
		return this._t(1, 0, 0, 1, tx, 0)
	},

	/**
	 * Translate current matrix on y axis accumulative.
	 * @param {number} ty - translation for y
	 * @returns {Matrix}
	 */
	translateY: function(ty) {
		return this._t(1, 0, 0, 1, 0, ty)
	},

	/**
	 * Multiplies current matrix with new matrix values. Also see [`multiply()`]{@link Matrix#multiply}.
	 *
	 * @param {number} a2 - scale x
	 * @param {number} b2 - skew y
	 * @param {number} c2 - skew x
	 * @param {number} d2 - scale y
	 * @param {number} e2 - translate x
	 * @param {number} f2 - translate y
	 * @returns {Matrix}
	 */
	transform: function(a2, b2, c2, d2, e2, f2) {

		var me = this,
			a1 = me.a,
			b1 = me.b,
			c1 = me.c,
			d1 = me.d,
			e1 = me.e,
			f1 = me.f;

		/* matrix column order is:
		 *   a c e
		 *   b d f
		 *   0 0 1
		 */
		me.a = a1 * a2 + c1 * b2;
		me.b = b1 * a2 + d1 * b2;
		me.c = a1 * c2 + c1 * d2;
		me.d = b1 * c2 + d1 * d2;
		me.e = a1 * e2 + c1 * f2 + e1;
		me.f = b1 * e2 + d1 * f2 + f1;

		return me._x()
	},

	/**
	 * Multiplies current matrix with source matrix.
	 * @param {Matrix|DOMMatrix|SVGMatrix} m - source matrix to multiply with.
	 * @returns {Matrix}
	 */
	multiply: function(m) {
		return this._t(m.a, m.b, m.c, m.d, m.e, m.f)
	},

	/**
	 * Divide this matrix on input matrix which must be invertible.
	 * @param {Matrix} m - matrix to divide on (divisor)
	 * @throws Exception if input matrix is not invertible
	 * @returns {Matrix}
	 */
	divide: function(m) {
		return this.multiply(m.inverse())
	},

	/**
	 * Divide current matrix on scalar value != 0.
	 * @param {number} d - divisor
	 * @throws Exception if divisor is zero
	 * @returns {Matrix}
	 */
	divideScalar: function(d) {

		var me = this;

		if (!d) throw "Division on zero";

		me.a /= d;
		me.b /= d;
		me.c /= d;
		me.d /= d;
		me.e /= d;
		me.f /= d;

		return me._x()
	},

	/**
	 * Get an inverse matrix of current matrix. The method returns a new
	 * matrix with values you need to use to get to an identity matrix.
	 * Context from parent matrix is not applied to the returned matrix.
	 *
	 * @param {boolean} [cloneContext=false] - clone current context to resulting matrix
	 * @param {boolean} [cloneDOM=false] - clone current DOM element to resulting matrix
	 * @throws Exception is input matrix is not invertible
	 * @returns {Matrix} - new Matrix instance
	 */
	inverse: function(cloneContext, cloneDOM) {

		var me = this,
			m  = new Matrix(cloneContext ? me.context : null, cloneDOM ? me.element : null),
			dt = me.determinant();

		if (me._q(dt, 0))
			throw "Matrix not invertible.";

		m.a = me.d / dt;
		m.b = -me.b / dt;
		m.c = -me.c / dt;
		m.d = me.a / dt;
		m.e = (me.c * me.f - me.d * me.e) / dt;
		m.f = -(me.a * me.f - me.b * me.e) / dt;

		return m
	},

	/**
	 * Interpolate this matrix with another and produce a new matrix.
	 * `t` is a value in the range [0.0, 1.0] where 0 is this instance and
	 * 1 is equal to the second matrix. The `t` value is not clamped.
	 *
	 * Context from parent matrix is not applied to the returned matrix.
	 *
	 * Note: this interpolation is naive. For animation containing rotation,
	 * shear or skew use the [`interpolateAnim()`]{@link Matrix#interpolateAnim} method instead
	 * to avoid unintended flipping.
	 *
	 * @param {Matrix|SVGMatrix} m2 - the matrix to interpolate with.
	 * @param {number} t - interpolation [0.0, 1.0]
	 * @param {CanvasRenderingContext2D} [context] - optional context to affect
	 * @param {HTMLElement} [dom] - optional DOM element to use for the matrix
	 * @returns {Matrix} - new Matrix instance with the interpolated result
	 */
	interpolate: function(m2, t, context, dom) {

		var me = this,
			m  = new Matrix(context, dom);

		m.a = me.a + (m2.a - me.a) * t;
		m.b = me.b + (m2.b - me.b) * t;
		m.c = me.c + (m2.c - me.c) * t;
		m.d = me.d + (m2.d - me.d) * t;
		m.e = me.e + (m2.e - me.e) * t;
		m.f = me.f + (m2.f - me.f) * t;

		return m._x()
	},

	/**
	 * Interpolate this matrix with another and produce a new matrix.
	 * `t` is a value in the range [0.0, 1.0] where 0 is this instance and
	 * 1 is equal to the second matrix. The `t` value is not constrained.
	 *
	 * Context from parent matrix is not applied to the returned matrix.
	 *
	 * To obtain easing `t` can be preprocessed using easing-functions
	 * before being passed to this method.
	 *
	 * Note: this interpolation method uses decomposition which makes
	 * it suitable for animations (in particular where rotation takes
	 * places).
	 *
	 * @param {Matrix} m2 - the matrix to interpolate with.
	 * @param {number} t - interpolation [0.0, 1.0]
	 * @param {CanvasRenderingContext2D} [context] - optional context to affect
	 * @param {HTMLElement} [dom] - optional DOM element to use for the matrix
	 * @returns {Matrix} - new Matrix instance with the interpolated result
	 */
	interpolateAnim: function(m2, t, context, dom) {

		var m          = new Matrix(context, dom),
			d1         = this.decompose(),
			d2         = m2.decompose(),
			t1         = d1.translate,
			t2         = d2.translate,
			s1         = d1.scale;

		// QR order (t-r-s-sk)
		m.translate(t1.x + (t2.x - t1.x) * t, t1.y + (t2.y - t1.y) * t);
		m.rotate(d1.rotation + (d2.rotation - d1.rotation) * t);
		m.scale(s1.x + (d2.scale.x - s1.x) * t, s1.y + (d2.scale.y - s1.y) * t);
		//todo test skew scenarios

		return m._x()
	},

	/**
	 * Decompose the current matrix into simple transforms using either
	 * QR (default) or LU decomposition.
	 *
	 * @param {boolean} [useLU=false] - set to true to use LU rather than QR decomposition
	 * @returns {*} - an object containing current decomposed values (translate, rotation, scale, skew)
	 * @see {@link http://www.maths-informatique-jeux.com/blog/frederic/?post/2013/12/01/Decomposition-of-2D-transform-matrices|Adoption based on this code}
	 * @see {@link https://en.wikipedia.org/wiki/QR_decomposition|More on QR decomposition}
	 * @see {@link https://en.wikipedia.org/wiki/LU_decomposition|More on LU decomposition}
	 */
	decompose: function(useLU) {

		var me        = this,
			a         = me.a,
			b         = me.b,
			c         = me.c,
			d         = me.d,
			acos      = Math.acos,
			atan      = Math.atan,
			sqrt      = Math.sqrt,
			pi        = Math.PI,

			translate = {x: me.e, y: me.f},
			rotation  = 0,
			scale     = {x: 1, y: 1},
			skew      = {x: 0, y: 0},

			determ    = a * d - b * c;	// determinant(), skip DRY here...

		if (useLU) {
			if (a) {
				skew = {x: atan(c / a), y: atan(b / a)};
				scale = {x: a, y: determ / a};
			}
			else if (b) {
				rotation = pi * 0.5;
				scale = {x: b, y: determ / b};
				skew.x = atan(d / b);
			}
			else { // a = b = 0
				scale = {x: c, y: d};
				skew.x = pi * 0.25;
			}
		}
		else {
			// Apply the QR-like decomposition.
			if (a || b) {
				var r = sqrt(a * a + b * b);
				rotation = b > 0 ? acos(a / r) : -acos(a / r);
				scale = {x: r, y: determ / r};
				skew.x = atan((a * c + b * d) / (r * r));
			}
			else if (c || d) {
				var s = sqrt(c * c + d * d);
				rotation = pi * 0.5 - (d > 0 ? acos(-c / s) : -acos(c / s));
				scale = {x: determ / s, y: s};
				skew.y = atan((a * c + b * d) / (s * s));
			}
			else { // a = b = c = d = 0
				scale = {x: 0, y: 0};
			}
		}

		return {
			translate: translate,
			rotation : rotation,
			scale    : scale,
			skew     : skew
		}
	},

	/**
	 * Returns the determinant of the current matrix.
	 * @returns {number}
	 */
	determinant: function() {
		return this.a * this.d - this.b * this.c
	},

	/**
	 * Apply current matrix to `x` and `y` of a point.
	 * Returns a point object.
	 *
	 * @param {number} x - value for x
	 * @param {number} y - value for y
	 * @returns {{x: number, y: number}} A new transformed point object
	 */
	applyToPoint: function(x, y) {

		var me = this;

		return {
			x: x * me.a + y * me.c + me.e,
			y: x * me.b + y * me.d + me.f
		}
	},

	/**
	 * Apply current matrix to array with point objects or point pairs.
	 * Returns a new array with points in the same format as the input array.
	 *
	 * A point object is an object literal:
	 *
	 *     {x: x, y: y}
	 *
	 * so an array would contain either:
	 *
	 *     [{x: x1, y: y1}, {x: x2, y: y2}, ... {x: xn, y: yn}]
	 *
	 * or
	 *
	 *     [x1, y1, x2, y2, ... xn, yn]
	 *
	 * @param {Array} points - array with point objects or pairs
	 * @returns {Array} A new array with transformed points
	 */
	applyToArray: function(points) {

		var i = 0, p, l,
			mxPoints = [];

		if (typeof points[0] === 'number') {

			l = points.length;

			while(i < l) {
				p = this.applyToPoint(points[i++], points[i++]);
				mxPoints.push(p.x, p.y);
			}
		}
		else {
			while(p = points[i++]) {
				mxPoints.push(this.applyToPoint(p.x, p.y));
			}
		}

		return mxPoints
	},

	/**
	 * Apply current matrix to a typed array with point pairs. Although
	 * the input array may be an ordinary array, this method is intended
	 * for more performant use where typed arrays are used. The returned
	 * array is regardless always returned as a `Float32Array`.
	 *
	 * @param {*} points - (typed) array with point pairs [x1, y1, ..., xn, yn]
	 * @param {boolean} [use64=false] - use Float64Array instead of Float32Array
	 * @returns {*} A new typed array with transformed points
	 */
	applyToTypedArray: function(points, use64) {

		var i = 0, p,
			l = points.length,
			mxPoints = use64 ? new Float64Array(l) : new Float32Array(l);

		while(i < l) {
			p = this.applyToPoint(points[i], points[i + 1]);
			mxPoints[i++] = p.x;
			mxPoints[i++] = p.y;
		}

		return mxPoints
	},

	/**
	 * Apply to any canvas 2D context object. This does not affect the
	 * context that optionally was referenced in constructor unless it is
	 * the same context.
	 *
	 * @param {CanvasRenderingContext2D} context - target context
	 * @returns {Matrix}
	 */
	applyToContext: function(context) {
		var me = this;
		context.setTransform(me.a, me.b, me.c, me.d, me.e, me.f);
		return me
	},

	/**
	 * Apply to any DOM element. This does not affect the DOM element
	 * that optionally was referenced in constructor unless it is
	 * the same element.
	 *
	 * The method will auto-detect the correct browser prefix if any.
	 *
	 * @param {HTMLElement} element - target DOM element
	 * @param {boolean} [use3D=false] - use 3D transformation matrix instead of 2D
	 * @returns {Matrix}
	 */
	applyToElement: function(element, use3D) {
		var me = this;
		if (!me._px) me._px = me._getPX();
		element.style[me._px] = use3D ? me.toCSS3D() : me.toCSS();
		return me
	},

	/**
	 * Instead of creating a new instance of a Matrix, DOMMatrix or SVGMatrix
	 * the current settings of this instance can be applied to an external
	 * object of a different (or same) type. You can also pass in an
	 * empty literal object.
	 *
	 * Note that the properties a-f will be set regardless of if they
	 * already exist or not.
	 *
	 * @param {*} obj - target object.
	 * @returns {Matrix}
	 */
	applyToObject: function(obj) {
		var me = this;
		obj.a = me.a;
		obj.b = me.b;
		obj.c = me.c;
		obj.d = me.d;
		obj.e = me.e;
		obj.f = me.f;
		return me
	},

	/**
	 * Returns true if matrix is an identity matrix (no transforms applied).
	 * @returns {boolean}
	 */
	isIdentity: function() {
		var me = this;
		return me._q(me.a, 1) &&
			me._q(me.b, 0) &&
			me._q(me.c, 0) &&
			me._q(me.d, 1) &&
			me._q(me.e, 0) &&
			me._q(me.f, 0)
	},

	/**
	 * Returns true if matrix is invertible
	 * @returns {boolean}
	 */
	isInvertible: function() {
		return !this._q(this.determinant(), 0)
	},

	/**
	 * The method is intended for situations where scale is accumulated
	 * via multiplications, to detect situations where scale becomes
	 * "trapped" with a value of zero. And in which case scale must be
	 * set explicitly to a non-zero value.
	 *
	 * @returns {boolean}
	 */
	isValid: function() {
		return !(this.a * this.d)
	},

	/**
	 * Compares current matrix with another matrix. Returns true if equal
	 * (within epsilon tolerance).
	 * @param {Matrix|SVGMatrix} m - matrix to compare this matrix with
	 * @returns {boolean}
	 */
	isEqual: function(m) {

		var me = this,
			q = me._q;

		return  q(me.a, m.a) &&
				q(me.b, m.b) &&
				q(me.c, m.c) &&
				q(me.d, m.d) &&
				q(me.e, m.e) &&
				q(me.f, m.f)
	},

	/**
	 * Clones current instance and returning a new matrix.
	 * @param {boolean} [noContext=false] don't clone context reference if true
	 * @returns {Matrix} - a new Matrix instance with identical transformations as this instance
	 */
	clone: function(noContext) {
		return new Matrix(noContext ? null : this.context).multiply(this)
	},

	/**
	 * Returns an array with current matrix values.
	 * @returns {Array}
	 */
	toArray: function() {
		var me = this;
		return [me.a, me.b, me.c, me.d, me.e, me.f]
	},

	/**
	 * Returns a binary typed array, either as 32-bit (default) or
	 * 64-bit.
	 * @param {boolean} [use64=false] chose whether to use 32-bit or 64-bit typed array
	 * @returns {*}
	 */
	toTypedArray: function(use64) {

		var a  = use64 ? new Float64Array(6) : new Float32Array(6),
			me = this;

		a[0] = me.a;
		a[1] = me.b;
		a[2] = me.c;
		a[3] = me.d;
		a[4] = me.e;
		a[5] = me.f;

		return a
	},

	/**
	 * Generates a string that can be used with CSS `transform`.
	 * @example
	 *     element.style.transform = m.toCSS();
	 * @returns {string}
	 */
	toCSS: function() {
		return "matrix(" + this.toArray() + ")"
	},

	/**
	 * Generates a `matrix3d()` string that can be used with CSS `transform`.
	 * Although the matrix is for 2D use you may see performance benefits
	 * on some devices using a 3D CSS transform instead of a 2D.
	 * @example
	 *     element.style.transform = m.toCSS3D();
	 * @returns {string}
	 */
	toCSS3D: function() {
		var me = this;
		return "matrix3d(" + me.a + "," + me.b + ",0,0," + me.c + "," + me.d + ",0,0,0,0,1,0," + me.e + "," + me.f + ",0,1)"
	},

	/**
	 * Returns a JSON compatible string of current matrix.
	 * @returns {string}
	 */
	toJSON: function() {
		var me = this;
		return '{"a":' + me.a + ',"b":' + me.b + ',"c":' + me.c + ',"d":' + me.d + ',"e":' + me.e + ',"f":' + me.f + '}'
	},

	/**
	 * Returns a string with current matrix as comma-separated list.
	 * @param {number} [fixLen=4] - truncate decimal values to number of digits
	 * @returns {string}
	 */
	toString: function(fixLen) {
		var me = this;
		fixLen = fixLen || 4;
		return 	 "a=" + me.a.toFixed(fixLen) +
				" b=" + me.b.toFixed(fixLen) +
				" c=" + me.c.toFixed(fixLen) +
				" d=" + me.d.toFixed(fixLen) +
				" e=" + me.e.toFixed(fixLen) +
				" f=" + me.f.toFixed(fixLen)
	},

	/**
	 * Returns a string with current matrix as comma-separated values
	 * string with line-end (CR+LF).
	 * @returns {string}
	 */
	toCSV: function() {
		return this.toArray().join() + "\r\n"
	},

	/**
	 * Convert current matrix into a `DOMMatrix`. If `DOMMatrix` is not
	 * supported, a `null` is returned.
	 *
	 * @returns {DOMMatrix}
	 * @see {@link https://drafts.fxtf.org/geometry/#dommatrix|MDN / SVGMatrix}
	 */
	toDOMMatrix: function() {
		var m = null;
		if ("DOMMatrix" in window) {
			m = new DOMMatrix();
			m.a = this.a;
			m.b = this.b;
			m.c = this.c;
			m.d = this.d;
			m.e = this.e;
			m.f = this.f;
		}
		return m
	},

	/**
	 * Convert current matrix into a `SVGMatrix`. If `SVGMatrix` is not
	 * supported, a `null` is returned.
	 *
	 * @returns {SVGMatrix}
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix|MDN / SVGMatrix}
	 */
	toSVGMatrix: function() {

		var	me = this,
			svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
			svgMatrix = null;

		if (svg) {
			svgMatrix = svg.createSVGMatrix();
			svgMatrix.a = me.a;
			svgMatrix.b = me.b;
			svgMatrix.c = me.c;
			svgMatrix.d = me.d;
			svgMatrix.e = me.e;
			svgMatrix.f = me.f;
		}

		return svgMatrix
	},

	/**
	 * Compares floating point values with some tolerance (epsilon)
	 * @param {number} f1 - float 1
	 * @param {number} f2 - float 2
	 * @returns {boolean}
	 * @private
	 */
	_q: function(f1, f2) {
		return Math.abs(f1 - f2) < 1e-14
	},

	/**
	 * Apply current absolute matrix to context if defined, to sync it.
	 * Apply current absolute matrix to element if defined, to sync it.
	 * @returns {Matrix}
	 * @private
	 */
	_x: function() {

		var me = this;

		if (me.context)
			me.context.setTransform(me.a, me.b, me.c, me.d, me.e, me.f);

		if (me._st)
			me._st[me._px] = me.useCSS3D ? me.toCSS3D() : me.toCSS();	// can be optimized pre-storing func ref.

		return me
	}
};

// Node support
if (true) exports.Matrix = Matrix;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__features_zoom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__icon_cursor__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icon_pan__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__icon_zoom_in__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__icon_zoom_out__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__icon_fit__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ui_link__ = __webpack_require__(24);
/* harmony export (immutable) */ __webpack_exports__["a"] = Toolbar;












var isHorizontal = function isHorizontal(position) {
  return [__WEBPACK_IMPORTED_MODULE_1__constants__["g" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_1__constants__["i" /* POSITION_BOTTOM */]].indexOf(position) >= 0;
};

var calcToolbarStyle = function calcToolbarStyle(position) {
  return {
    //position
    position: "absolute",
    transform: [__WEBPACK_IMPORTED_MODULE_1__constants__["g" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_1__constants__["i" /* POSITION_BOTTOM */]].indexOf(position) >= 0 ? "translate(-50%, 0px)" : "none",
    top: [__WEBPACK_IMPORTED_MODULE_1__constants__["j" /* POSITION_LEFT */], __WEBPACK_IMPORTED_MODULE_1__constants__["h" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_1__constants__["g" /* POSITION_TOP */]].indexOf(position) >= 0 ? "5px" : "unset",
    left: [__WEBPACK_IMPORTED_MODULE_1__constants__["g" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_1__constants__["i" /* POSITION_BOTTOM */]].indexOf(position) >= 0 ? "50%" : __WEBPACK_IMPORTED_MODULE_1__constants__["j" /* POSITION_LEFT */] === position ? "5px" : "unset",
    right: [__WEBPACK_IMPORTED_MODULE_1__constants__["h" /* POSITION_RIGHT */]].indexOf(position) >= 0 ? "5px" : "unset",
    bottom: [__WEBPACK_IMPORTED_MODULE_1__constants__["i" /* POSITION_BOTTOM */]].indexOf(position) >= 0 ? "5px" : "unset",

    //inner styling
    backgroundColor: "rgba(19, 20, 22, 0.90)",
    borderRadius: "2px",
    display: "flex",
    flexDirection: isHorizontal(position) ? "row" : "column",
    padding: isHorizontal(position) ? "1px 2px" : "2px 1px"
  };
};

var calcElementStyle = function calcElementStyle(position, active, hover) {
  return {
    display: "block",
    width: "24px",
    height: "24px",
    margin: isHorizontal(position) ? "2px 1px" : "1px 2px",
    color: active || hover ? '#1CA6FC' : '#FFF',
    transition: hover ? "color 200ms ease" : "unset"
  };
};

function Toolbar(_ref) {
  var tool = _ref.tool,
      value = _ref.value,
      onChangeValue = _ref.onChangeValue,
      onChangeTool = _ref.onChangeTool,
      position = _ref.position;


  var handleChangeTool = function handleChangeTool(event, tool) {
    onChangeTool(tool);
    event.stopPropagation();
    event.preventDefault();
  };

  var handleFit = function handleFit(event) {
    onChangeValue(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__features_zoom__["c" /* fitToViewer */])(value));
    event.stopPropagation();
    event.preventDefault();
  };

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { style: calcToolbarStyle(position) },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_8__ui_link__["a" /* default */],
      {
        style: calcElementStyle(position, tool === __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* TOOL_NONE */], false),
        styleHover: calcElementStyle(position, tool === __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* TOOL_NONE */], true),
        title: 'Selection',
        onClick: function onClick(event) {
          return handleChangeTool(event, __WEBPACK_IMPORTED_MODULE_1__constants__["b" /* TOOL_NONE */]);
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__icon_cursor__["a" /* default */], null)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_8__ui_link__["a" /* default */],
      {
        style: calcElementStyle(position, tool === __WEBPACK_IMPORTED_MODULE_1__constants__["c" /* TOOL_PAN */], false),
        styleHover: calcElementStyle(position, tool === __WEBPACK_IMPORTED_MODULE_1__constants__["c" /* TOOL_PAN */], true),
        title: 'Pan',
        onClick: function onClick(event) {
          return handleChangeTool(event, __WEBPACK_IMPORTED_MODULE_1__constants__["c" /* TOOL_PAN */]);
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__icon_pan__["a" /* default */], null)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_8__ui_link__["a" /* default */],
      {
        style: calcElementStyle(position, tool === __WEBPACK_IMPORTED_MODULE_1__constants__["d" /* TOOL_ZOOM_IN */], false),
        styleHover: calcElementStyle(position, tool === __WEBPACK_IMPORTED_MODULE_1__constants__["d" /* TOOL_ZOOM_IN */], true),
        title: 'Zoom in',
        onClick: function onClick(event) {
          return handleChangeTool(event, __WEBPACK_IMPORTED_MODULE_1__constants__["d" /* TOOL_ZOOM_IN */]);
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__icon_zoom_in__["a" /* default */], null)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_8__ui_link__["a" /* default */],
      {
        style: calcElementStyle(position, tool === __WEBPACK_IMPORTED_MODULE_1__constants__["e" /* TOOL_ZOOM_OUT */], false),
        styleHover: calcElementStyle(position, tool === __WEBPACK_IMPORTED_MODULE_1__constants__["e" /* TOOL_ZOOM_OUT */], true),
        title: 'Zoom out',
        onClick: function onClick(event) {
          return handleChangeTool(event, __WEBPACK_IMPORTED_MODULE_1__constants__["e" /* TOOL_ZOOM_OUT */]);
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__icon_zoom_out__["a" /* default */], null)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_8__ui_link__["a" /* default */],
      {
        style: calcElementStyle(position, false, false),
        styleHover: calcElementStyle(position, false, true),
        title: 'Fit to viewer',
        onClick: function onClick(event) {
          return handleFit(event);
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__icon_fit__["a" /* default */], null)
    )
  );
}

Toolbar.propTypes = {
  position: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].oneOf([__WEBPACK_IMPORTED_MODULE_1__constants__["g" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_1__constants__["h" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_1__constants__["i" /* POSITION_BOTTOM */], __WEBPACK_IMPORTED_MODULE_1__constants__["j" /* POSITION_LEFT */]]).isRequired,
  tool: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired,
  value: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
  onChangeValue: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired,
  onChangeTool: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__features_common__ = __webpack_require__(2);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var ViewerEvent = function () {
  function ViewerEvent(originalEvent, value, SVGViewer) {
    _classCallCheck(this, ViewerEvent);

    this.originalEvent = originalEvent;
    this.value = value;
    this.SVGViewer = SVGViewer;
  }

  _createClass(ViewerEvent, [{
    key: 'preventDefault',
    value: function preventDefault() {
      this.originalEvent.preventDefault();
    }
  }, {
    key: 'stopPropagation',
    value: function stopPropagation() {
      this.originalEvent.stopPropagation();
    }
  }, {
    key: 'scaleFactor',
    get: function get() {
      this._cacheDecomposedValue = this._cacheDecomposedValue || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__features_common__["j" /* decompose */])(this.value);
      return this._cacheDecomposedValue.scaleFactor;
    }
  }, {
    key: 'translationX',
    get: function get() {
      this._cacheDecomposedValue = this._cacheDecomposedValue || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__features_common__["j" /* decompose */])(this.value);
      return this._cacheDecomposedValue.translationX;
    }
  }, {
    key: 'translationY',
    get: function get() {
      this._cacheDecomposedValue = this._cacheDecomposedValue || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__features_common__["j" /* decompose */])(this.value);
      return this._cacheDecomposedValue.translationY;
    }
  }]);

  return ViewerEvent;
}();

/* harmony default export */ __webpack_exports__["a"] = ViewerEvent;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pan__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__zoom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["b"] = onMouseDown;
/* harmony export (immutable) */ __webpack_exports__["c"] = onMouseMove;
/* harmony export (immutable) */ __webpack_exports__["d"] = onMouseUp;
/* harmony export (immutable) */ __webpack_exports__["e"] = onDoubleClick;
/* harmony export (immutable) */ __webpack_exports__["f"] = onWheel;
/* harmony export (immutable) */ __webpack_exports__["g"] = onMouseEnterOrLeave;
/* harmony export (immutable) */ __webpack_exports__["a"] = onInterval;






function onMouseDown(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var x = void 0,
      y = void 0;
  if (coords) {
    x = coords.x;
    y = coords.y;
  } else {
    var _ViewerDOM$getBoundin = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin.left,
        top = _ViewerDOM$getBoundin.top;

    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  var nextValue = value;

  switch (tool) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["e" /* TOOL_ZOOM_OUT */]:
      var SVGPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, x, y);
      nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["a" /* zoom */])(value, SVGPoint.x, SVGPoint.y, 1 / props.scaleFactor);
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_ZOOM_IN */]:
      nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["e" /* startZooming */])(value, x, y);
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* TOOL_PAN */]:
      nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__pan__["b" /* startPanning */])(value, x, y);
      break;

    default:
      return value;
  }

  event.preventDefault();
  return nextValue;
}

function onMouseMove(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var x = void 0,
      y = void 0;
  if (coords) {
    x = coords.x;
    y = coords.y;
  } else {
    var _ViewerDOM$getBoundin2 = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin2.left,
        top = _ViewerDOM$getBoundin2.top;

    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  var forceExit = event.buttons === 0; //the mouse exited and reentered into svg
  var nextValue = value;

  switch (tool) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_ZOOM_IN */]:
      if (value.mode === __WEBPACK_IMPORTED_MODULE_0__constants__["l" /* MODE_ZOOMING */]) nextValue = forceExit ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["f" /* stopZooming */])(value, x, y, props.scaleFactor) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["g" /* updateZooming */])(value, x, y);
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* TOOL_PAN */]:
      if (value.mode === __WEBPACK_IMPORTED_MODULE_0__constants__["m" /* MODE_PANNING */]) nextValue = forceExit ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__pan__["c" /* stopPanning */])(value) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__pan__["d" /* updatePanning */])(value, x, y, props.preventPanOutside ? 20 : undefined);
      break;

    default:
      return value;
  }

  event.preventDefault();
  return nextValue;
}

function onMouseUp(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var x = void 0,
      y = void 0;
  if (coords) {
    x = coords.x;
    y = coords.y;
  } else {
    var _ViewerDOM$getBoundin3 = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin3.left,
        top = _ViewerDOM$getBoundin3.top;

    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  var nextValue = value;

  switch (tool) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["e" /* TOOL_ZOOM_OUT */]:
      if (value.mode === __WEBPACK_IMPORTED_MODULE_0__constants__["l" /* MODE_ZOOMING */]) nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["f" /* stopZooming */])(value, x, y, 1 / props.scaleFactor);
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_ZOOM_IN */]:
      if (value.mode === __WEBPACK_IMPORTED_MODULE_0__constants__["l" /* MODE_ZOOMING */]) nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["f" /* stopZooming */])(value, x, y, props.scaleFactor);
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* TOOL_PAN */]:
      if (value.mode === __WEBPACK_IMPORTED_MODULE_0__constants__["m" /* MODE_PANNING */]) nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__pan__["c" /* stopPanning */])(value, x, y);
      break;

    default:
      return value;
  }

  event.preventDefault();
  return nextValue;
}

function onDoubleClick(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var x = void 0,
      y = void 0;
  if (coords) {
    x = coords.x;
    y = coords.y;
  } else {
    var _ViewerDOM$getBoundin4 = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin4.left,
        top = _ViewerDOM$getBoundin4.top;

    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  var nextValue = value;

  switch (tool) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* TOOL_AUTO */]:
      var SVGPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, x, y);
      var modifierKeysReducer = function modifierKeysReducer(current, modifierKey) {
        return current || event.getModifierState(modifierKey);
      };
      var modifierKeyActive = props.modifierKeys.reduce(modifierKeysReducer, false);
      var scaleFactor = modifierKeyActive ? 1 / props.scaleFactor : props.scaleFactor;
      nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["a" /* zoom */])(value, SVGPoint.x, SVGPoint.y, scaleFactor);
      break;

    default:
      return value;
  }

  event.preventDefault();
  return nextValue;
}

function onWheel(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var x = void 0,
      y = void 0;
  if (coords) {
    x = coords.x;
    y = coords.y;
  } else {
    var _ViewerDOM$getBoundin5 = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin5.left,
        top = _ViewerDOM$getBoundin5.top;

    x = event.clientX - Math.round(left);
    y = event.clientY - Math.round(top);
  }

  if (!props.detectWheel) return value;

  var delta = Math.max(-1, Math.min(1, event.deltaY));
  var scaleFactor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* mapRange */])(delta, -1, 1, 1.06, 0.96);

  var SVGPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, x, y);
  var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["a" /* zoom */])(value, SVGPoint.x, SVGPoint.y, scaleFactor);

  event.preventDefault();
  return nextValue;
}

function onMouseEnterOrLeave(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

  var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["i" /* setFocus */])(value, event.type === 'mouseenter');

  event.preventDefault();
  return nextValue;
}

function onInterval(event, ViewerDOM, tool, value, props) {
  var coords = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var x = coords.x,
      y = coords.y;


  if (!([__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* TOOL_NONE */], __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* TOOL_AUTO */]].indexOf(tool) >= 0)) return value;
  if (!props.detectAutoPan) return value;
  if (!value.focus) return value;

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__pan__["e" /* autoPanIfNeeded */])(value, x, y);
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__events_event_factory__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__features_pan__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__features_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__features_interactions__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__features_interactions_touch__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__features_zoom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ui_cursor_polyfill__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ui_border_gradient__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ui_if__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ui_selection__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ui_toolbar_toolbar__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ui_detect_touch__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__constants__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



//events


//features







//ui









var ReactSVGPanZoom = function (_React$Component) {
  _inherits(ReactSVGPanZoom, _React$Component);

  function ReactSVGPanZoom(props, context) {
    _classCallCheck(this, ReactSVGPanZoom);

    var _this = _possibleConstructorReturn(this, (ReactSVGPanZoom.__proto__ || Object.getPrototypeOf(ReactSVGPanZoom)).call(this, props, context));

    var _this$props = _this.props,
        tool = _this$props.tool,
        value = _this$props.value,
        viewerWidth = _this$props.width,
        viewerHeight = _this$props.height,
        children = _this$props.children;
    var _children$props = children.props,
        SVGWidth = _children$props.width,
        SVGHeight = _children$props.height;


    _this.state = {
      value: value ? value : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__features_common__["e" /* getDefaultValue */])(viewerWidth, viewerHeight, SVGWidth, SVGHeight),
      tool: tool ? tool : __WEBPACK_IMPORTED_MODULE_13__constants__["b" /* TOOL_NONE */]
    };
    _this.ViewerDOM = null;
    return _this;
  }

  _createClass(ReactSVGPanZoom, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = this.getValue();

      if (value.viewerWidth !== nextProps.width || value.viewerHeight !== nextProps.height) {
        var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__features_common__["f" /* setViewerSize */])(value, nextProps.width, nextProps.height);
        this.setValue(nextValue);
      }

      var _nextProps$children$p = nextProps.children.props,
          SVGWidth = _nextProps$children$p.width,
          SVGHeight = _nextProps$children$p.height;

      if (value.SVGWidth !== SVGWidth || value.SVGHeight !== SVGHeight) {
        var _nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__features_common__["g" /* setSVGSize */])(value, SVGWidth, SVGHeight);
        this.setValue(_nextValue);
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.props.value ? this.props.value : this.state.value;
    }
  }, {
    key: 'getTool',
    value: function getTool() {
      return this.props.tool ? this.props.tool : this.state.tool;
    }
  }, {
    key: 'setValue',
    value: function setValue(nextValue) {
      this.setState({ value: nextValue });
      if (this.props.onChangeValue) this.props.onChangeValue(nextValue);
    }
  }, {
    key: 'pan',
    value: function pan(SVGDeltaX, SVGDeltaY) {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__features_pan__["a" /* pan */])(this.getValue(), SVGDeltaX, SVGDeltaY);
      this.setValue(nextValue);
    }
  }, {
    key: 'zoom',
    value: function zoom(SVGPointX, SVGPointY, scaleFactor) {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_zoom__["a" /* zoom */])(this.getValue(), SVGPointX, SVGPointY, scaleFactor);
      this.setValue(nextValue);
    }
  }, {
    key: 'fitSelection',
    value: function fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_zoom__["b" /* fitSelection */])(this.getValue(), selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight);
      this.setValue(nextValue);
    }
  }, {
    key: 'fitToViewer',
    value: function fitToViewer() {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_zoom__["c" /* fitToViewer */])(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: 'zoomOnViewerCenter',
    value: function zoomOnViewerCenter(scaleFactor) {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_zoom__["d" /* zoomOnViewerCenter */])(this.getValue(), scaleFactor);
      this.setValue(nextValue);
    }
  }, {
    key: 'setPointOnViewerCenter',
    value: function setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__features_common__["a" /* setPointOnViewerCenter */])(this.getValue(), SVGPointX, SVGPointY, zoomLevel);
      this.setValue(nextValue);
    }
  }, {
    key: 'reset',
    value: function reset() {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__features_common__["b" /* reset */])(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: 'changeTool',
    value: function changeTool(tool) {
      this.setState({ tool: tool });
      if (this.props.onChangeTool) this.props.onChangeTool(tool);
    }
  }, {
    key: 'handleViewerEvent',
    value: function handleViewerEvent(event) {
      var props = this.props,
          value = this.state.value,
          ViewerDOM = this.ViewerDOM;


      if (!([__WEBPACK_IMPORTED_MODULE_13__constants__["b" /* TOOL_NONE */], __WEBPACK_IMPORTED_MODULE_13__constants__["a" /* TOOL_AUTO */]].indexOf(this.getTool()) >= 0)) return;
      if (event.target === ViewerDOM) return;

      var eventsHandler = {
        click: props.onClick,
        dblclick: props.onDoubleClick,

        mousemove: props.onMouseMove,
        mouseup: props.onMouseUp,
        mousedown: props.onMouseDown,

        touchstart: props.onTouchStart,
        touchmove: props.onTouchMove,
        touchend: props.onTouchEnd,
        touchcancel: props.onTouchCancel
      };

      var onEventHandler = eventsHandler[event.type];
      if (!onEventHandler) return;

      onEventHandler(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__events_event_factory__["a" /* default */])(event, value, ViewerDOM));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var props = this.props,
          state = this.state;

      if (props.onChangeValue) props.onChangeValue(state.value);

      this.autoPanTimer = setInterval(function () {
        var coords = { x: _this2.state.viewerX, y: _this2.state.viewerY };
        var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__features_interactions__["a" /* onInterval */])(null, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props, coords);

        if (_this2.getValue() !== nextValue) {
          _this2.setValue(nextValue);
        }
      }, 200);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.autoPanTimer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var props = this.props,
          _state = this.state,
          viewerX = _state.viewerX,
          viewerY = _state.viewerY;

      var tool = this.getTool();
      var value = this.getValue();
      var CustomToolbar = props.customToolbar;

      var panningWithToolAuto = tool === __WEBPACK_IMPORTED_MODULE_13__constants__["a" /* TOOL_AUTO */] && value.mode === __WEBPACK_IMPORTED_MODULE_13__constants__["m" /* MODE_PANNING */] && value.startX !== value.endX && value.startY !== value.endY;

      var cursor = void 0;

      if (tool === __WEBPACK_IMPORTED_MODULE_13__constants__["c" /* TOOL_PAN */]) cursor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__ui_cursor_polyfill__["a" /* default */])(value.mode === __WEBPACK_IMPORTED_MODULE_13__constants__["m" /* MODE_PANNING */] ? 'grabbing' : 'grab');

      if (tool === __WEBPACK_IMPORTED_MODULE_13__constants__["d" /* TOOL_ZOOM_IN */]) cursor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__ui_cursor_polyfill__["a" /* default */])('zoom-in');

      if (tool === __WEBPACK_IMPORTED_MODULE_13__constants__["e" /* TOOL_ZOOM_OUT */]) cursor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__ui_cursor_polyfill__["a" /* default */])('zoom-out');

      if (panningWithToolAuto) cursor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__ui_cursor_polyfill__["a" /* default */])('grabbing');

      var blockChildEvents = [__WEBPACK_IMPORTED_MODULE_13__constants__["c" /* TOOL_PAN */], __WEBPACK_IMPORTED_MODULE_13__constants__["d" /* TOOL_ZOOM_IN */], __WEBPACK_IMPORTED_MODULE_13__constants__["e" /* TOOL_ZOOM_OUT */]].indexOf(tool) >= 0;
      window.deneme1 = blockChildEvents;
      blockChildEvents = blockChildEvents || panningWithToolAuto;
      window.deneme2 = blockChildEvents;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          style: _extends({ position: "relative", width: value.viewerWidth, height: value.viewerHeight }, props.style),
          className: this.props.className },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'svg',
          {
            ref: function ref(ViewerDOM) {
              return _this3.ViewerDOM = ViewerDOM;
            },
            width: value.viewerWidth,
            height: value.viewerHeight,
            style: cursor ? { cursor: cursor } : {},

            onMouseDown: function onMouseDown(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__features_interactions__["b" /* onMouseDown */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onMouseMove: function onMouseMove(event) {
              var _ViewerDOM$getBoundin = _this3.ViewerDOM.getBoundingClientRect(),
                  left = _ViewerDOM$getBoundin.left,
                  top = _ViewerDOM$getBoundin.top;

              var x = event.clientX - Math.round(left);
              var y = event.clientY - Math.round(top);

              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__features_interactions__["c" /* onMouseMove */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props, { x: x, y: y });
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.setState({ viewerX: x, viewerY: y });
              _this3.handleViewerEvent(event);
            },
            onMouseUp: function onMouseUp(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__features_interactions__["d" /* onMouseUp */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },

            onClick: function onClick(event) {
              _this3.handleViewerEvent(event);
            },
            onDoubleClick: function onDoubleClick(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__features_interactions__["e" /* onDoubleClick */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },

            onWheel: function onWheel(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__features_interactions__["f" /* onWheel */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
            },

            onMouseEnter: function onMouseEnter(event) {
              if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_12__ui_detect_touch__["a" /* default */])()) return;
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__features_interactions__["g" /* onMouseEnterOrLeave */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
            },
            onMouseLeave: function onMouseLeave(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__features_interactions__["g" /* onMouseEnterOrLeave */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
            },

            onTouchStart: function onTouchStart(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__features_interactions_touch__["a" /* onTouchStart */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onTouchMove: function onTouchMove(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__features_interactions_touch__["b" /* onTouchMove */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onTouchEnd: function onTouchEnd(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__features_interactions_touch__["c" /* onTouchEnd */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onTouchCancel: function onTouchCancel(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__features_interactions_touch__["d" /* onTouchCancel */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            } },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('rect', {
            fill: props.background,
            x: 0,
            y: 0,
            width: value.viewerWidth,
            height: value.viewerHeight,
            style: { pointerEvents: "none" }
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'g',
            {
              transform: 'matrix(' + value.a + ', ' + value.b + ', ' + value.c + ', ' + value.d + ', ' + value.e + ', ' + value.f + ')',
              style: blockChildEvents ? { pointerEvents: "none" } : {} },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('rect', {
              fill: this.props.SVGBackground,
              x: 0,
              y: 0,
              width: value.SVGWidth,
              height: value.SVGHeight }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'g',
              null,
              props.children.props.children
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9__ui_if__["a" /* default */],
            { condition: tool === __WEBPACK_IMPORTED_MODULE_13__constants__["b" /* TOOL_NONE */] && props.detectAutoPan && value.focus },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'g',
              { style: { pointerEvents: "none" } },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_9__ui_if__["a" /* default */],
                { condition: viewerY <= 20 },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__ui_border_gradient__["a" /* default */], { direction: __WEBPACK_IMPORTED_MODULE_13__constants__["g" /* POSITION_TOP */], width: value.viewerWidth, height: value.viewerHeight })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_9__ui_if__["a" /* default */],
                { condition: value.viewerWidth - viewerX <= 20 },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__ui_border_gradient__["a" /* default */], { direction: __WEBPACK_IMPORTED_MODULE_13__constants__["h" /* POSITION_RIGHT */], width: value.viewerWidth, height: value.viewerHeight })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_9__ui_if__["a" /* default */],
                { condition: value.viewerHeight - viewerY <= 20 },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__ui_border_gradient__["a" /* default */], { direction: __WEBPACK_IMPORTED_MODULE_13__constants__["i" /* POSITION_BOTTOM */], width: value.viewerWidth, height: value.viewerHeight })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_9__ui_if__["a" /* default */],
                { condition: value.focus && viewerX <= 20 },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__ui_border_gradient__["a" /* default */], { direction: __WEBPACK_IMPORTED_MODULE_13__constants__["j" /* POSITION_LEFT */], width: value.viewerWidth, height: value.viewerHeight })
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_9__ui_if__["a" /* default */],
            { condition: value.mode === __WEBPACK_IMPORTED_MODULE_13__constants__["l" /* MODE_ZOOMING */] },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_10__ui_selection__["a" /* default */], { startX: value.startX, startY: value.startY, endX: value.endX, endY: value.endY })
          )
        ),
        props.toolbarPosition === __WEBPACK_IMPORTED_MODULE_13__constants__["f" /* POSITION_NONE */] ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CustomToolbar, {
          position: props.toolbarPosition,
          value: value,
          onChangeValue: function onChangeValue(value) {
            return _this3.setValue(value);
          },
          tool: tool,
          onChangeTool: function onChangeTool(tool) {
            return _this3.changeTool(tool);
          } })
      );
    }
  }]);

  return ReactSVGPanZoom;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = ReactSVGPanZoom;


ReactSVGPanZoom.propTypes = {
  //width of the viewer displayed on screen
  width: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,

  //height of the viewer displayed on screen
  height: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,

  //background of the viewer
  background: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,

  //background of the svg
  SVGBackground: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,

  //value of the viewer (current point of view)
  value: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].shape({
    version: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].oneOf([2]).isRequired,
    mode: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].oneOf([__WEBPACK_IMPORTED_MODULE_13__constants__["k" /* MODE_IDLE */], __WEBPACK_IMPORTED_MODULE_13__constants__["m" /* MODE_PANNING */], __WEBPACK_IMPORTED_MODULE_13__constants__["l" /* MODE_ZOOMING */]]).isRequired,
    focus: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool.isRequired,
    a: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    b: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    c: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    d: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    e: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    f: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    viewerWidth: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    viewerHeight: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    SVGWidth: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    SVGHeight: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
    startX: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
    startY: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
    endX: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
    endY: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number
  }),

  //CSS style of the Viewer
  style: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object,

  //className of the Viewer
  className: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string,

  //detect zoom operation performed trough pinch gesture or mouse scroll
  detectWheel: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,

  //perform PAN if the mouse is on viewer border
  detectAutoPan: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,

  //toolbar position
  toolbarPosition: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].oneOf([__WEBPACK_IMPORTED_MODULE_13__constants__["f" /* POSITION_NONE */], __WEBPACK_IMPORTED_MODULE_13__constants__["g" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_13__constants__["h" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_13__constants__["i" /* POSITION_BOTTOM */], __WEBPACK_IMPORTED_MODULE_13__constants__["j" /* POSITION_LEFT */]]),

  //handler something changed
  onChangeValue: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,

  //handler tool changed
  onChangeTool: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,

  //handler click
  onClick: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,

  //handler double click
  onDoubleClick: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,

  //handler mouseup
  onMouseUp: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,

  //handler mousemove
  onMouseMove: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,

  //handler mousedown
  onMouseDown: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func,

  //if disabled the user can move the image outside the viewer
  preventPanOutside: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool,

  //how much scale in or out
  scaleFactor: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  tool: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].oneOf([__WEBPACK_IMPORTED_MODULE_13__constants__["a" /* TOOL_AUTO */], __WEBPACK_IMPORTED_MODULE_13__constants__["b" /* TOOL_NONE */], __WEBPACK_IMPORTED_MODULE_13__constants__["c" /* TOOL_PAN */], __WEBPACK_IMPORTED_MODULE_13__constants__["d" /* TOOL_ZOOM_IN */], __WEBPACK_IMPORTED_MODULE_13__constants__["e" /* TOOL_ZOOM_OUT */]]),

  //modifier keys //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
  modifierKeys: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].array,

  //override default toolbar component
  customToolbar: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].oneOfType([__WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].element, __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func]),

  //accept only one node SVG
  children: function children(props, propName, componentName) {
    // Only accept a single child, of the appropriate type
    //credits: http://www.mattzabriskie.com/blog/react-validating-children
    var prop = props[propName];
    var types = ['svg'];
    if (__WEBPACK_IMPORTED_MODULE_0_react___default.a.Children.count(prop) !== 1 || types.indexOf(prop.type) === -1) {
      return new Error('`' + componentName + '` ' + 'should have a single child of the following types: ' + ' `' + types.join('`, `') + '`.');
    }
    if (!prop.props.hasOwnProperty('width') || !prop.props.hasOwnProperty('height')) {
      return new Error('SVG should have props `width` and `height`');
    }
  }
};

ReactSVGPanZoom.defaultProps = {
  value: null,
  tool: null,
  style: {},
  background: "#616264",
  SVGBackground: "#fff",
  detectWheel: true,
  detectAutoPan: true,
  toolbarPosition: __WEBPACK_IMPORTED_MODULE_13__constants__["h" /* POSITION_RIGHT */],
  modifierKeys: ["Alt", "Shift", "Control"],
  customToolbar: __WEBPACK_IMPORTED_MODULE_11__ui_toolbar_toolbar__["a" /* default */],
  preventPanOutside: true,
  customToolbar: __WEBPACK_IMPORTED_MODULE_11__ui_toolbar_toolbar__["a" /* default */],
  scaleFactor: 1.1
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewer_mouse_event__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewer_touch_event__ = __webpack_require__(13);



/* harmony default export */ __webpack_exports__["a"] = function (originalEvent, value, SVGViewer) {

  var eventType = originalEvent.type;

  switch (eventType) {
    case "mousemove":
    case "mouseup":
    case "mousedown":
    case "click":
    case "dblclick":
      return new __WEBPACK_IMPORTED_MODULE_0__viewer_mouse_event__["a" /* default */](originalEvent, value, SVGViewer);

    case "touchstart":
    case "touchmove":
    case "touchend":
    case "touchcancel":
      return new __WEBPACK_IMPORTED_MODULE_1__viewer_touch_event__["a" /* default */](originalEvent, value, SVGViewer);

    default:
      throw new Error(eventType + ' not supported');
  }
};

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__features_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewer_event__ = __webpack_require__(8);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ViewerMouseEvent = function (_ViewerEvent) {
  _inherits(ViewerMouseEvent, _ViewerEvent);

  function ViewerMouseEvent() {
    _classCallCheck(this, ViewerMouseEvent);

    return _possibleConstructorReturn(this, (ViewerMouseEvent.__proto__ || Object.getPrototypeOf(ViewerMouseEvent)).apply(this, arguments));
  }

  _createClass(ViewerMouseEvent, [{
    key: 'point',
    get: function get() {
      if (!this._cachePoint) {
        var event = this.originalEvent,
            value = this.value,
            SVGViewer = this.SVGViewer;

        var rect = SVGViewer.getBoundingClientRect();
        var x = event.clientX - Math.round(rect.left);
        var y = event.clientY - Math.round(rect.top);

        this._cachePoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__features_common__["d" /* getSVGPoint */])(value, x, y);
      }
      return this._cachePoint;
    }
  }, {
    key: 'x',
    get: function get() {
      return this.point.x;
    }
  }, {
    key: 'y',
    get: function get() {
      return this.point.y;
    }
  }]);

  return ViewerMouseEvent;
}(__WEBPACK_IMPORTED_MODULE_1__viewer_event__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = ViewerMouseEvent;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__features_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewer_event__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ViewerTouchEvent = function (_ViewerEvent) {
  _inherits(ViewerTouchEvent, _ViewerEvent);

  function ViewerTouchEvent() {
    _classCallCheck(this, ViewerTouchEvent);

    return _possibleConstructorReturn(this, (ViewerTouchEvent.__proto__ || Object.getPrototypeOf(ViewerTouchEvent)).apply(this, arguments));
  }

  _createClass(ViewerTouchEvent, [{
    key: 'points',
    get: function get() {
      if (!this._cachePoints) this._cachePoints = ViewerTouchEvent.touchesToPoints(this.originalEvent.touches, this.SVGViewer, this.value);

      return this._cachePoints;
    }
  }, {
    key: 'changedPoints',
    get: function get() {
      if (!this._cacheChangedPoints) this._cacheChangedPoints = ViewerTouchEvent.touchesToPoints(this.originalEvent.changedTouches, this.SVGViewer, this.value);

      return this._cacheChangedPoints;
    }
  }], [{
    key: 'touchesToPoints',
    value: function touchesToPoints(touches, SVGViewer, value) {
      var points = [];
      for (var i = 0; i < touches.length; i++) {
        var touch = touches[i];

        var rect = SVGViewer.getBoundingClientRect();
        var x = touch.clientX - Math.round(rect.left);
        var y = touch.clientY - Math.round(rect.top);

        var point = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__features_common__["d" /* getSVGPoint */])(value, x, y);

        points.push(_extends({}, point, { identifier: touch.identifier }));
      }
      return points;
    }
  }]);

  return ViewerTouchEvent;
}(__WEBPACK_IMPORTED_MODULE_1__viewer_event__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = ViewerTouchEvent;

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interactions__ = __webpack_require__(9);
/* harmony export (immutable) */ __webpack_exports__["a"] = onTouchStart;
/* harmony export (immutable) */ __webpack_exports__["b"] = onTouchMove;
/* harmony export (immutable) */ __webpack_exports__["c"] = onTouchEnd;
/* harmony export (immutable) */ __webpack_exports__["d"] = onTouchCancel;




function onTouchStart(event, ViewerDOM, tool, value, props) {
  var x = void 0,
      y = void 0;
  if (event.touches.length === 1) {
    var touchPosition = event.touches[0];

    var _ViewerDOM$getBoundin = ViewerDOM.getBoundingClientRect(),
        left = _ViewerDOM$getBoundin.left,
        top = _ViewerDOM$getBoundin.top;

    x = touchPosition.clientX - Math.round(left);
    y = touchPosition.clientY - Math.round(top);
  } else {
    if ([__WEBPACK_IMPORTED_MODULE_0__constants__["m" /* MODE_PANNING */], __WEBPACK_IMPORTED_MODULE_0__constants__["l" /* MODE_ZOOMING */]].indexOf(value.mode) >= 0) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["h" /* resetMode */])(value);
    } else if ([__WEBPACK_IMPORTED_MODULE_0__constants__["k" /* MODE_IDLE */]].indexOf(value.mode) >= 0) {
      return value;
    }
  }

  switch (tool) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["e" /* TOOL_ZOOM_OUT */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_ZOOM_IN */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* TOOL_PAN */]:
      event.stopPropagation();
      event.preventDefault();
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__interactions__["b" /* onMouseDown */])(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

function onTouchMove(event, ViewerDOM, tool, value, props) {
  if (!([__WEBPACK_IMPORTED_MODULE_0__constants__["m" /* MODE_PANNING */], __WEBPACK_IMPORTED_MODULE_0__constants__["l" /* MODE_ZOOMING */]].indexOf(value.mode) >= 0)) return value;

  var touchPosition = event.touches[0];

  var _ViewerDOM$getBoundin2 = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin2.left,
      top = _ViewerDOM$getBoundin2.top;

  var x = touchPosition.clientX - Math.round(left);
  var y = touchPosition.clientY - Math.round(top);

  switch (tool) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["e" /* TOOL_ZOOM_OUT */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_ZOOM_IN */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* TOOL_PAN */]:
      event.stopPropagation();
      event.preventDefault();
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__interactions__["c" /* onMouseMove */])(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

function onTouchEnd(event, ViewerDOM, tool, value, props) {
  if (!([__WEBPACK_IMPORTED_MODULE_0__constants__["m" /* MODE_PANNING */], __WEBPACK_IMPORTED_MODULE_0__constants__["l" /* MODE_ZOOMING */]].indexOf(value.mode) >= 0)) return value;

  var touchPosition = event.changedTouches[0];

  var _ViewerDOM$getBoundin3 = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin3.left,
      top = _ViewerDOM$getBoundin3.top;

  var x = touchPosition.clientX - Math.round(left);
  var y = touchPosition.clientY - Math.round(top);

  switch (tool) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["e" /* TOOL_ZOOM_OUT */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_ZOOM_IN */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* TOOL_PAN */]:
      event.stopPropagation();
      event.preventDefault();
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__interactions__["d" /* onMouseUp */])(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

function onTouchCancel(event, ViewerDOM, tool, value, props) {
  event.stopPropagation();
  event.preventDefault();

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["h" /* resetMode */])(value);
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony export (immutable) */ __webpack_exports__["a"] = IconCursor;


//credits https://materialdesignicons.com/icon/cursor-default-outline

function IconCursor() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    { width: 24, height: 24, stroke: "currentColor" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
      d: "M10.07,14.27C10.57,14.03 11.16,14.25 11.4,14.75L13.7,19.74L15.5,18.89L13.19,13.91C12.95,13.41 13.17,12.81 13.67,12.58L13.95,12.5L16.25,12.05L8,5.12V15.9L9.82,14.43L10.07,14.27M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z" })
  );
}

IconCursor.propTypes = {};

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony export (immutable) */ __webpack_exports__["a"] = IconFit;


//credits https://materialdesignicons.com/icon/cursor-default-outline

function IconFit() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    { width: 24, height: 24, stroke: "currentColor" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
      d: "M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6z" })
  );
}

IconFit.propTypes = {};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony export (immutable) */ __webpack_exports__["a"] = IconPan;


//https://materialdesignicons.com/icon/cursor-move

function IconPan() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    { width: 24, height: 24, stroke: "currentColor" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
      d: "M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" })
  );
}

IconPan.propTypes = {};

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony export (immutable) */ __webpack_exports__["a"] = IconZoomIn;


//https://material.io/icons/#ic_zoom_in

function IconZoomIn() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    { width: 24, height: 24, stroke: "currentColor" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "g",
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
        d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", { d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" })
    )
  );
}

IconZoomIn.propTypes = {};

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony export (immutable) */ __webpack_exports__["a"] = IconZoomOut;


//https://material.io/icons/#ic_zoom_out

function IconZoomOut() {
  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    "svg",
    { width: 24, height: 24, stroke: "currentColor" },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("path", {
      d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" })
  );
}

IconZoomOut.propTypes = {};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = BorderGradient;



function BorderGradient(_ref) {
  var direction = _ref.direction,
      width = _ref.width,
      height = _ref.height;


  var transform = void 0;

  switch (direction) {
    case __WEBPACK_IMPORTED_MODULE_1__constants__["g" /* POSITION_TOP */]:
      transform = 'translate(' + width + ', 0) rotate(90)';
      break;

    case __WEBPACK_IMPORTED_MODULE_1__constants__["h" /* POSITION_RIGHT */]:
      transform = 'translate(' + width + ', ' + height + ') rotate(180)';
      break;

    case __WEBPACK_IMPORTED_MODULE_1__constants__["i" /* POSITION_BOTTOM */]:
      transform = 'translate(0, ' + height + ') rotate(270)';
      break;

    case __WEBPACK_IMPORTED_MODULE_1__constants__["j" /* POSITION_LEFT */]:
      transform = " ";
      break;
  }

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'g',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'defs',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'linearGradient',
        { id: 'react-svg-pan-zoom-gradient1', x1: '0%', y1: '0%', x2: '100%', y2: '0%', spreadMethod: 'pad' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('stop', { offset: '0%', stopColor: '#fff', stopOpacity: '0.8' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('stop', { offset: '100%', stopColor: '#000', stopOpacity: '0.5' })
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'mask',
        { id: 'react-svg-pan-zoom-mask1', x: '0', y: '0', width: '20', height: Math.max(width, height) },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('rect', { x: '0', y: '0', width: '20', height: Math.max(width, height),
          style: { stroke: "none", fill: "url(#react-svg-pan-zoom-gradient1)" } })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('rect', { x: '0', y: '0', width: '20', height: Math.max(width, height),
      style: { stroke: "none", fill: "#000", mask: "url(#react-svg-pan-zoom-mask1)" }, transform: transform })
  );
}

BorderGradient.propTypes = {
  direction: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].oneOf([__WEBPACK_IMPORTED_MODULE_1__constants__["g" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_1__constants__["h" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_1__constants__["i" /* POSITION_BOTTOM */], __WEBPACK_IMPORTED_MODULE_1__constants__["j" /* POSITION_LEFT */]]).isRequired,
  width: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired,
  height: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number.isRequired
};

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//specs: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor

var needPrefix = function needPrefix(cursor) {
  return ['zoom-in', 'zoom-out', 'grab', 'grabbing'].indexOf(cursor) > -1;
};
var userAgent = function userAgent() {
  return navigator.userAgent.toLowerCase();
};
var isFirefox = function isFirefox() {
  return userAgent().indexOf('firefox') > -1;
};
var isWebkit = function isWebkit() {
  return userAgent().indexOf('webkit') > -1;
};

/* harmony default export */ __webpack_exports__["a"] = function (cursor) {
  if (!needPrefix(cursor)) return cursor;
  if (isFirefox()) return '-moz-' + cursor;
  if (isWebkit()) return '-webkit-' + cursor;
};

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isTouchDevice;
//http://stackoverflow.com/a/4819886/1398836

function isTouchDevice() {
  return 'ontouchstart' in window // works on most browsers
  || navigator.maxTouchPoints; // works on IE10/11 and Surface
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony export (immutable) */ __webpack_exports__["a"] = If;


/**
 * @return {null}
 */
function If(_ref) {
  var condition = _ref.condition,
      children = _ref.children;

  return condition ? children : null;
}

If.propTypes = {
  condition: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].bool.isRequired
};

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Link = function (_Component) {
  _inherits(Link, _Component);

  function Link(props) {
    _classCallCheck(this, Link);

    var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, props));

    _this.state = { hover: false };
    return _this;
  }

  _createClass(Link, [{
    key: 'change',
    value: function change(event) {
      event.preventDefault();
      event.stopPropagation();

      switch (event.type) {
        case 'mouseenter':
        case 'touchstart':
          this.setState({ hover: true });
          break;
        case 'mouseleave':
        case 'touchend':
        case 'touchcancel':
          this.setState({ hover: false });
          break;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'a',
        {
          onMouseEnter: function onMouseEnter(e) {
            return _this2.change(e);
          },
          onMouseLeave: function onMouseLeave(e) {
            return _this2.change(e);
          },

          onTouchStart: function onTouchStart(e) {
            _this2.change(e);
            _this2.props.onClick(e);
          },
          onTouchEnd: function onTouchEnd(e) {
            return _this2.change(e);
          },
          onTouchCancel: function onTouchCancel(e) {
            return _this2.change(e);
          },

          onClick: this.props.onClick,

          style: this.state.hover ? this.props.styleHover : this.props.style,
          title: this.props.title,
          href: 'javascript:;'

        },
        this.props.children
      );
    }
  }]);

  return Link;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

/* harmony default export */ __webpack_exports__["a"] = Link;


Link.propTypes = {
  style: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
  styleHover: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].object.isRequired,
  title: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].string.isRequired,
  onClick: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].func.isRequired
};

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["a"] = Selection;



function Selection(_ref) {
  var startX = _ref.startX,
      startY = _ref.startY,
      endX = _ref.endX,
      endY = _ref.endY;

  if (!startX || !startY || !endX || !endY) return null;

  var box = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* calculateBox */])({ x: startX, y: startY }, { x: endX, y: endY });

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('rect', {
    stroke: '#969FFF',
    strokeOpacity: 0.7,
    fill: '#F3F4FF',
    fillOpacity: 0.7,
    x: box.x,
    y: box.y,
    width: box.width,
    height: box.height,
    style: { pointerEvents: "none" } });
}

Selection.propTypes = {
  startX: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
  startY: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
  endX: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number,
  endY: __WEBPACK_IMPORTED_MODULE_0_react__["PropTypes"].number
};

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewer__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_toolbar_toolbar__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__features_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__features_pan__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__features_zoom__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ReactSVGPanZoom", function() { return __WEBPACK_IMPORTED_MODULE_0__viewer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Toolbar", function() { return __WEBPACK_IMPORTED_MODULE_1__ui_toolbar_toolbar__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pan", function() { return __WEBPACK_IMPORTED_MODULE_3__features_pan__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "zoom", function() { return __WEBPACK_IMPORTED_MODULE_4__features_zoom__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fitSelection", function() { return __WEBPACK_IMPORTED_MODULE_4__features_zoom__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fitToViewer", function() { return __WEBPACK_IMPORTED_MODULE_4__features_zoom__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "zoomOnViewerCenter", function() { return __WEBPACK_IMPORTED_MODULE_4__features_zoom__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "setPointOnViewerCenter", function() { return __WEBPACK_IMPORTED_MODULE_2__features_common__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return __WEBPACK_IMPORTED_MODULE_2__features_common__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TOOL_AUTO", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TOOL_NONE", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TOOL_PAN", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TOOL_ZOOM_IN", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TOOL_ZOOM_OUT", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "POSITION_NONE", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "POSITION_TOP", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["g"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "POSITION_RIGHT", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["h"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "POSITION_BOTTOM", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["i"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "POSITION_LEFT", function() { return __WEBPACK_IMPORTED_MODULE_5__constants__["j"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Viewer", function() { return Viewer; });







var Viewer = function Viewer() {
  var msg = "HEY! You are trying to use an older version of ReactSVGPanZoom. " + "Read here https://github.com/chrvadala/react-svg-pan-zoom/blob/master/docs/migrate-from-v1-to-v2.md";

  console.error(msg);
  return null;
};



/***/ })
/******/ ]);
//# sourceMappingURL=react-svg-pan-zoom.js.map