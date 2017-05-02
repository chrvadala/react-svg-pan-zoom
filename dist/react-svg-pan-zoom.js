var ReactSVGPanZoom =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MODE_IDLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MODE_PANNING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MODE_ZOOMING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TOOL_AUTO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return TOOL_NONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return TOOL_PAN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return TOOL_ZOOM_IN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return TOOL_ZOOM_OUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return POSITION_NONE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return POSITION_TOP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return POSITION_RIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return POSITION_BOTTOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return POSITION_LEFT; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_transformation_matrix__ = __webpack_require__(5);
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

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };




/**
 * Obtain default value
 * @returns {Object}
 */
function getDefaultValue(viewerWidth, viewerHeight, SVGWidth, SVGHeight) {
  return set({}, _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix__["a" /* identity */])(), {
    version: 2,
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* MODE_IDLE */],
    focus: false,
    viewerWidth: viewerWidth,
    viewerHeight: viewerHeight,
    SVGWidth: SVGWidth,
    SVGHeight: SVGHeight,
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    miniatureOpen: true
  }));
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
  var matrix = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix__["b" /* fromObject */])(value);

  var inverseMatrix = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix__["c" /* inverse */])(matrix);
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix__["d" /* applyToPoint */])(inverseMatrix, { x: viewerX, y: viewerY });
}

/**
 * Decompose matrix from value
 * @param value
 * @returns {{scaleFactor: number, translationX: number, translationY: number}}
 */
function decompose(value) {
  var matrix = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix__["b" /* fromObject */])(value);

  return {
    scaleFactor: matrix.a,
    translationX: matrix.e,
    translationY: matrix.f
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


  var matrix = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix__["e" /* transform */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix__["f" /* translate */])(-SVGPointX + viewerWidth / 2, -SVGPointY + viewerHeight / 2), //4
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix__["f" /* translate */])(SVGPointX, SVGPointY), //3
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix__["g" /* scale */])(zoomLevel, zoomLevel), //2
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix__["f" /* translate */])(-SVGPointX, -SVGPointY) //1
  );

  return set(value, _extends({
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* MODE_IDLE */]
  }, matrix));
}

/**
 *
 * @param value
 * @returns {Object}
 */
function reset(value) {
  return set(value, _extends({
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* MODE_IDLE */]
  }, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_transformation_matrix__["a" /* identity */])()));
}

/**
 *
 * @param value
 * @returns {Object}
 */
function resetMode(value) {
  return set(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* MODE_IDLE */],
    startX: null,
    startY: null,
    endX: null,
    endY: null
  });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(40)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(39)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__applyToPoint__ = __webpack_require__(41);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__applyToPoint__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_0__applyToPoint__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__fromObject__ = __webpack_require__(42);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__fromObject__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fromString__ = __webpack_require__(43);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__identity__ = __webpack_require__(44);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_3__identity__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__inverse__ = __webpack_require__(45);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__inverse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__isAffineMatrix__ = __webpack_require__(46);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__rotate__ = __webpack_require__(47);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__scale__ = __webpack_require__(48);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_7__scale__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shear__ = __webpack_require__(49);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__toString__ = __webpack_require__(50);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_9__toString__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__transform__ = __webpack_require__(51);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_10__transform__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__translate__ = __webpack_require__(52);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_11__translate__["a"]; });













/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_transformation_matrix__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(9);
/* harmony export (immutable) */ __webpack_exports__["a"] = zoom;
/* harmony export (immutable) */ __webpack_exports__["b"] = fitSelection;
/* harmony export (immutable) */ __webpack_exports__["c"] = fitToViewer;
/* harmony export (immutable) */ __webpack_exports__["d"] = zoomOnViewerCenter;
/* harmony export (immutable) */ __webpack_exports__["e"] = startZooming;
/* harmony export (immutable) */ __webpack_exports__["g"] = updateZooming;
/* harmony export (immutable) */ __webpack_exports__["f"] = stopZooming;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







function zoom(value, SVGPointX, SVGPointY, scaleFactor) {

  var matrix = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_transformation_matrix__["e" /* transform */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_transformation_matrix__["b" /* fromObject */])(value), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_transformation_matrix__["f" /* translate */])(SVGPointX, SVGPointY), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_transformation_matrix__["g" /* scale */])(scaleFactor, scaleFactor), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_transformation_matrix__["f" /* translate */])(-SVGPointX, -SVGPointY));

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common__["c" /* set */])(value, _extends({
    mode: __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* MODE_IDLE */]
  }, matrix, {
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }));
}

function fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
  var viewerWidth = value.viewerWidth,
      viewerHeight = value.viewerHeight;


  var scaleX = viewerWidth / selectionWidth;
  var scaleY = viewerHeight / selectionHeight;

  var scaleLevel = Math.min(scaleX, scaleY);

  var matrix = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_transformation_matrix__["e" /* transform */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_transformation_matrix__["g" /* scale */])(scaleLevel, scaleLevel), //2
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_transformation_matrix__["f" /* translate */])(-selectionSVGPointX, -selectionSVGPointY) //1
  );

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common__["c" /* set */])(value, _extends({
    mode: __WEBPACK_IMPORTED_MODULE_1__constants__["a" /* MODE_IDLE */]
  }, matrix, {
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }));
}

function fitToViewer(value) {
  return fitSelection(value, 0, 0, value.SVGWidth, value.SVGHeight);
}

function zoomOnViewerCenter(value, scaleFactor) {
  var viewerWidth = value.viewerWidth,
      viewerHeight = value.viewerHeight;

  var SVGPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common__["d" /* getSVGPoint */])(value, viewerWidth / 2, viewerHeight / 2);
  return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
}

function startZooming(value, viewerX, viewerY) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common__["c" /* set */])(value, {
    mode: __WEBPACK_IMPORTED_MODULE_1__constants__["c" /* MODE_ZOOMING */],
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  });
}

function updateZooming(value, viewerX, viewerY) {
  if (value.mode !== __WEBPACK_IMPORTED_MODULE_1__constants__["c" /* MODE_ZOOMING */]) throw new Error('update selection not allowed in this mode ' + value.mode);

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common__["c" /* set */])(value, {
    endX: viewerX,
    endY: viewerY
  });
}

function stopZooming(value, viewerX, viewerY, scaleFactor) {
  var startX = value.startX,
      startY = value.startY,
      endX = value.endX,
      endY = value.endY;


  var start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common__["d" /* getSVGPoint */])(value, startX, startY);
  var end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common__["d" /* getSVGPoint */])(value, endX, endY);

  if (Math.abs(startX - endX) > 7 && Math.abs(startY - endY) > 7) {
    var box = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* calculateBox */])(start, end);
    return fitSelection(value, box.x, box.y, box.width, box.height);
  } else {
    var SVGPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__common__["d" /* getSVGPoint */])(value, viewerX, viewerY);
    return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
  }
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = openMiniature;
/* harmony export (immutable) */ __webpack_exports__["b"] = closeMiniature;


function openMiniature(value) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common__["c" /* set */])(value, {
    miniatureOpen: true
  });
}

function closeMiniature(value) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__common__["c" /* set */])(value, {
    miniatureOpen: false
  });
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_transformation_matrix__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["a"] = pan;
/* harmony export (immutable) */ __webpack_exports__["b"] = startPanning;
/* harmony export (immutable) */ __webpack_exports__["d"] = updatePanning;
/* harmony export (immutable) */ __webpack_exports__["c"] = stopPanning;
/* harmony export (immutable) */ __webpack_exports__["e"] = autoPanIfNeeded;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();





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


  var matrix = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_transformation_matrix__["e" /* transform */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_transformation_matrix__["b" /* fromObject */])(value), //2
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_transformation_matrix__["f" /* translate */])(SVGDeltaX, SVGDeltaY) //1
  );

  // apply pan limits
  if (panLimit) {
    var _applyToPoints = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_transformation_matrix__["h" /* applyToPoints */])(matrix, [{ x: panLimit, y: panLimit }, { x: value.SVGWidth - panLimit, y: value.SVGHeight - panLimit }]),
        _applyToPoints2 = _slicedToArray(_applyToPoints, 2),
        _applyToPoints2$ = _applyToPoints2[0],
        x1 = _applyToPoints2$.x,
        y1 = _applyToPoints2$.y,
        _applyToPoints2$2 = _applyToPoints2[1],
        x2 = _applyToPoints2$2.x,
        y2 = _applyToPoints2$2.y;

    //x limit


    var moveX = 0;
    if (value.viewerWidth - x1 < 0) moveX = value.viewerWidth - x1;else if (x2 < 0) moveX = -x2;

    //y limit
    var moveY = 0;
    if (value.viewerHeight - y1 < 0) moveY = value.viewerHeight - y1;else if (y2 < 0) moveY = -y2;

    //apply limits
    matrix = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_transformation_matrix__["e" /* transform */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_transformation_matrix__["f" /* translate */])(moveX, moveY), matrix);
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(value, _extends({
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* MODE_IDLE */]
  }, matrix));
}

function startPanning(value, viewerX, viewerY) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* MODE_PANNING */],
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  });
}

function updatePanning(value, viewerX, viewerY, panLimit) {
  if (value.mode !== __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* MODE_PANNING */]) throw new Error('update pan not allowed in this mode ' + value.mode);

  var endX = value.endX,
      endY = value.endY;


  var start = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, endX, endY);
  var end = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, viewerX, viewerY);

  var deltaX = end.x - start.x;
  var deltaY = end.y - start.y;

  var nextValue = pan(value, deltaX, deltaY, panLimit);
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(nextValue, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* MODE_PANNING */],
    endX: viewerX,
    endY: viewerY
  });
}

function stopPanning(value) {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["c" /* set */])(value, {
    mode: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* MODE_IDLE */],
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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__features_zoom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__icon_cursor__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__icon_pan__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__icon_zoom_in__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__icon_zoom_out__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__icon_fit__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__toolbar_button__ = __webpack_require__(32);
/* harmony export (immutable) */ __webpack_exports__["a"] = Toolbar;












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
    onChangeValue(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__features_zoom__["c" /* fitToViewer */])(value));
    event.stopPropagation();
    event.preventDefault();
  };

  var isHorizontal = [__WEBPACK_IMPORTED_MODULE_2__constants__["j" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_2__constants__["l" /* POSITION_BOTTOM */]].indexOf(position) >= 0;

  var style = {
    //position
    position: "absolute",
    transform: [__WEBPACK_IMPORTED_MODULE_2__constants__["j" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_2__constants__["l" /* POSITION_BOTTOM */]].indexOf(position) >= 0 ? "translate(-50%, 0px)" : "none",
    top: [__WEBPACK_IMPORTED_MODULE_2__constants__["m" /* POSITION_LEFT */], __WEBPACK_IMPORTED_MODULE_2__constants__["k" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_2__constants__["j" /* POSITION_TOP */]].indexOf(position) >= 0 ? "5px" : "unset",
    left: [__WEBPACK_IMPORTED_MODULE_2__constants__["j" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_2__constants__["l" /* POSITION_BOTTOM */]].indexOf(position) >= 0 ? "50%" : __WEBPACK_IMPORTED_MODULE_2__constants__["m" /* POSITION_LEFT */] === position ? "5px" : "unset",
    right: [__WEBPACK_IMPORTED_MODULE_2__constants__["k" /* POSITION_RIGHT */]].indexOf(position) >= 0 ? "5px" : "unset",
    bottom: [__WEBPACK_IMPORTED_MODULE_2__constants__["l" /* POSITION_BOTTOM */]].indexOf(position) >= 0 ? "5px" : "unset",

    //inner styling
    backgroundColor: "rgba(19, 20, 22, 0.90)",
    borderRadius: "2px",
    display: "flex",
    flexDirection: isHorizontal ? "row" : "column",
    padding: isHorizontal ? "1px 2px" : "2px 1px"
  };

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { style: style, role: 'toolbar' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_9__toolbar_button__["a" /* default */],
      {
        toolbarPosition: position,
        active: tool === __WEBPACK_IMPORTED_MODULE_2__constants__["e" /* TOOL_NONE */],
        name: 'unselect-tools',
        title: 'Selection',
        onClick: function onClick(event) {
          return handleChangeTool(event, __WEBPACK_IMPORTED_MODULE_2__constants__["e" /* TOOL_NONE */]);
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__icon_cursor__["a" /* default */], null)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_9__toolbar_button__["a" /* default */],
      {
        toolbarPosition: position,
        active: tool === __WEBPACK_IMPORTED_MODULE_2__constants__["f" /* TOOL_PAN */],
        name: 'select-tool-pan',
        title: 'Pan',
        onClick: function onClick(event) {
          return handleChangeTool(event, __WEBPACK_IMPORTED_MODULE_2__constants__["f" /* TOOL_PAN */]);
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__icon_pan__["a" /* default */], null)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_9__toolbar_button__["a" /* default */],
      {
        toolbarPosition: position,
        active: tool === __WEBPACK_IMPORTED_MODULE_2__constants__["g" /* TOOL_ZOOM_IN */],
        name: 'select-tool-zoom-in',
        title: 'Zoom in',
        onClick: function onClick(event) {
          return handleChangeTool(event, __WEBPACK_IMPORTED_MODULE_2__constants__["g" /* TOOL_ZOOM_IN */]);
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__icon_zoom_in__["a" /* default */], null)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_9__toolbar_button__["a" /* default */],
      {
        toolbarPosition: position,
        active: tool === __WEBPACK_IMPORTED_MODULE_2__constants__["h" /* TOOL_ZOOM_OUT */],
        name: 'select-tool-zoom-out',
        title: 'Zoom out',
        onClick: function onClick(event) {
          return handleChangeTool(event, __WEBPACK_IMPORTED_MODULE_2__constants__["h" /* TOOL_ZOOM_OUT */]);
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7__icon_zoom_out__["a" /* default */], null)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      __WEBPACK_IMPORTED_MODULE_9__toolbar_button__["a" /* default */],
      {
        toolbarPosition: position,
        active: false,
        name: 'fit-to-viewer',
        title: 'Fit to viewer',
        onClick: function onClick(event) {
          return handleFit(event);
        } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8__icon_fit__["a" /* default */], null)
    )
  );
}

Toolbar.propTypes = {
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([__WEBPACK_IMPORTED_MODULE_2__constants__["j" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_2__constants__["k" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_2__constants__["l" /* POSITION_BOTTOM */], __WEBPACK_IMPORTED_MODULE_2__constants__["m" /* POSITION_LEFT */]]).isRequired,
  tool: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  onChangeValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  onChangeTool: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired
};

/***/ }),
/* 13 */
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

/* harmony default export */ __webpack_exports__["a"] = (ViewerEvent);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pan__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__zoom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(9);
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
    case __WEBPACK_IMPORTED_MODULE_0__constants__["h" /* TOOL_ZOOM_OUT */]:
      var SVGPoint = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["d" /* getSVGPoint */])(value, x, y);
      nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["a" /* zoom */])(value, SVGPoint.x, SVGPoint.y, 1 / props.scaleFactor);
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["g" /* TOOL_ZOOM_IN */]:
      nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["e" /* startZooming */])(value, x, y);
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["f" /* TOOL_PAN */]:
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
    case __WEBPACK_IMPORTED_MODULE_0__constants__["g" /* TOOL_ZOOM_IN */]:
      if (value.mode === __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* MODE_ZOOMING */]) nextValue = forceExit ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["f" /* stopZooming */])(value, x, y, props.scaleFactor) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["g" /* updateZooming */])(value, x, y);
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["f" /* TOOL_PAN */]:
      if (value.mode === __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* MODE_PANNING */]) nextValue = forceExit ? __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__pan__["c" /* stopPanning */])(value) : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__pan__["d" /* updatePanning */])(value, x, y, props.preventPanOutside ? 20 : undefined);
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
    case __WEBPACK_IMPORTED_MODULE_0__constants__["h" /* TOOL_ZOOM_OUT */]:
      if (value.mode === __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* MODE_ZOOMING */]) nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["f" /* stopZooming */])(value, x, y, 1 / props.scaleFactor);
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["g" /* TOOL_ZOOM_IN */]:
      if (value.mode === __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* MODE_ZOOMING */]) nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__zoom__["f" /* stopZooming */])(value, x, y, props.scaleFactor);
      break;

    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["f" /* TOOL_PAN */]:
      if (value.mode === __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* MODE_PANNING */]) nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__pan__["c" /* stopPanning */])(value, x, y);
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
    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_AUTO */]:
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


  if (!([__WEBPACK_IMPORTED_MODULE_0__constants__["e" /* TOOL_NONE */], __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_AUTO */]].indexOf(tool) >= 0)) return value;
  if (!props.detectAutoPan) return value;
  if (!value.focus) return value;

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__pan__["e" /* autoPanIfNeeded */])(value, x, y);
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(10);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_transformation_matrix__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events_event_factory__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__features_pan__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__features_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__features_interactions__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__features_interactions_touch__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__features_zoom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__features_miniature__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ui_cursor_polyfill__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ui_border_gradient__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ui_if__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ui_selection__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ui_toolbar_toolbar__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ui_detect_touch__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ui_miniature_miniature__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__constants__ = __webpack_require__(1);
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
      value: value ? value : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__features_common__["e" /* getDefaultValue */])(viewerWidth, viewerHeight, SVGWidth, SVGHeight),
      tool: tool ? tool : __WEBPACK_IMPORTED_MODULE_17__constants__["e" /* TOOL_NONE */]
    };
    _this.ViewerDOM = null;
    return _this;
  }

  _createClass(ReactSVGPanZoom, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = this.getValue();

      if (value.viewerWidth !== nextProps.width || value.viewerHeight !== nextProps.height) {
        var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__features_common__["f" /* setViewerSize */])(value, nextProps.width, nextProps.height);
        this.setValue(nextValue);
      }

      var _nextProps$children$p = nextProps.children.props,
          SVGWidth = _nextProps$children$p.width,
          SVGHeight = _nextProps$children$p.height;

      if (value.SVGWidth !== SVGWidth || value.SVGHeight !== SVGHeight) {
        var _nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__features_common__["g" /* setSVGSize */])(value, SVGWidth, SVGHeight);
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
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__features_pan__["a" /* pan */])(this.getValue(), SVGDeltaX, SVGDeltaY);
      this.setValue(nextValue);
    }
  }, {
    key: 'zoom',
    value: function zoom(SVGPointX, SVGPointY, scaleFactor) {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__features_zoom__["a" /* zoom */])(this.getValue(), SVGPointX, SVGPointY, scaleFactor);
      this.setValue(nextValue);
    }
  }, {
    key: 'fitSelection',
    value: function fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__features_zoom__["b" /* fitSelection */])(this.getValue(), selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight);
      this.setValue(nextValue);
    }
  }, {
    key: 'fitToViewer',
    value: function fitToViewer() {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__features_zoom__["c" /* fitToViewer */])(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: 'zoomOnViewerCenter',
    value: function zoomOnViewerCenter(scaleFactor) {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__features_zoom__["d" /* zoomOnViewerCenter */])(this.getValue(), scaleFactor);
      this.setValue(nextValue);
    }
  }, {
    key: 'setPointOnViewerCenter',
    value: function setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__features_common__["a" /* setPointOnViewerCenter */])(this.getValue(), SVGPointX, SVGPointY, zoomLevel);
      this.setValue(nextValue);
    }
  }, {
    key: 'reset',
    value: function reset() {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__features_common__["b" /* reset */])(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: 'changeTool',
    value: function changeTool(tool) {
      this.setState({ tool: tool });
      if (this.props.onChangeTool) this.props.onChangeTool(tool);
    }
  }, {
    key: 'openMiniature',
    value: function openMiniature() {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__features_miniature__["a" /* openMiniature */])(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: 'closeMiniature',
    value: function closeMiniature() {
      var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__features_miniature__["b" /* closeMiniature */])(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: 'handleViewerEvent',
    value: function handleViewerEvent(event) {
      var props = this.props,
          value = this.state.value,
          ViewerDOM = this.ViewerDOM;


      if (!([__WEBPACK_IMPORTED_MODULE_17__constants__["e" /* TOOL_NONE */], __WEBPACK_IMPORTED_MODULE_17__constants__["d" /* TOOL_AUTO */]].indexOf(this.getTool()) >= 0)) return;
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

      onEventHandler(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__events_event_factory__["a" /* default */])(event, value, ViewerDOM));
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
        var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_interactions__["a" /* onInterval */])(null, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props, coords);

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
      var CustomToolbar = props.customToolbar,
          CustomMiniature = props.customMiniature;


      var panningWithToolAuto = tool === __WEBPACK_IMPORTED_MODULE_17__constants__["d" /* TOOL_AUTO */] && value.mode === __WEBPACK_IMPORTED_MODULE_17__constants__["b" /* MODE_PANNING */] && value.startX !== value.endX && value.startY !== value.endY;

      var cursor = void 0;

      if (tool === __WEBPACK_IMPORTED_MODULE_17__constants__["f" /* TOOL_PAN */]) cursor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__ui_cursor_polyfill__["a" /* default */])(value.mode === __WEBPACK_IMPORTED_MODULE_17__constants__["b" /* MODE_PANNING */] ? 'grabbing' : 'grab');

      if (tool === __WEBPACK_IMPORTED_MODULE_17__constants__["g" /* TOOL_ZOOM_IN */]) cursor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__ui_cursor_polyfill__["a" /* default */])('zoom-in');

      if (tool === __WEBPACK_IMPORTED_MODULE_17__constants__["h" /* TOOL_ZOOM_OUT */]) cursor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__ui_cursor_polyfill__["a" /* default */])('zoom-out');

      if (panningWithToolAuto) cursor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_10__ui_cursor_polyfill__["a" /* default */])('grabbing');

      var blockChildEvents = [__WEBPACK_IMPORTED_MODULE_17__constants__["f" /* TOOL_PAN */], __WEBPACK_IMPORTED_MODULE_17__constants__["g" /* TOOL_ZOOM_IN */], __WEBPACK_IMPORTED_MODULE_17__constants__["h" /* TOOL_ZOOM_OUT */]].indexOf(tool) >= 0;
      blockChildEvents = blockChildEvents || panningWithToolAuto;

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
            style: cursor ? { cursor: cursor, display: "block" } : { display: 'block' },

            onMouseDown: function onMouseDown(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_interactions__["b" /* onMouseDown */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onMouseMove: function onMouseMove(event) {
              var _ViewerDOM$getBoundin = _this3.ViewerDOM.getBoundingClientRect(),
                  left = _ViewerDOM$getBoundin.left,
                  top = _ViewerDOM$getBoundin.top;

              var x = event.clientX - Math.round(left);
              var y = event.clientY - Math.round(top);

              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_interactions__["c" /* onMouseMove */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props, { x: x, y: y });
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.setState({ viewerX: x, viewerY: y });
              _this3.handleViewerEvent(event);
            },
            onMouseUp: function onMouseUp(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_interactions__["d" /* onMouseUp */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },

            onClick: function onClick(event) {
              _this3.handleViewerEvent(event);
            },
            onDoubleClick: function onDoubleClick(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_interactions__["e" /* onDoubleClick */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },

            onWheel: function onWheel(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_interactions__["f" /* onWheel */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
            },

            onMouseEnter: function onMouseEnter(event) {
              if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_15__ui_detect_touch__["a" /* default */])()) return;
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_interactions__["g" /* onMouseEnterOrLeave */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
            },
            onMouseLeave: function onMouseLeave(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__features_interactions__["g" /* onMouseEnterOrLeave */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
            },

            onTouchStart: function onTouchStart(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__features_interactions_touch__["a" /* onTouchStart */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onTouchMove: function onTouchMove(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__features_interactions_touch__["b" /* onTouchMove */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onTouchEnd: function onTouchEnd(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__features_interactions_touch__["c" /* onTouchEnd */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
              if (_this3.getValue() !== nextValue) _this3.setValue(nextValue);
              _this3.handleViewerEvent(event);
            },
            onTouchCancel: function onTouchCancel(event) {
              var nextValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__features_interactions_touch__["d" /* onTouchCancel */])(event, _this3.ViewerDOM, _this3.getTool(), _this3.getValue(), _this3.props);
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
              transform: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_transformation_matrix__["i" /* toSVG */])(value),
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
            __WEBPACK_IMPORTED_MODULE_12__ui_if__["a" /* default */],
            { condition: tool === __WEBPACK_IMPORTED_MODULE_17__constants__["e" /* TOOL_NONE */] && props.detectAutoPan && value.focus },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'g',
              { style: { pointerEvents: "none" } },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_12__ui_if__["a" /* default */],
                { condition: viewerY <= 20 },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__ui_border_gradient__["a" /* default */], { direction: __WEBPACK_IMPORTED_MODULE_17__constants__["j" /* POSITION_TOP */], width: value.viewerWidth, height: value.viewerHeight })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_12__ui_if__["a" /* default */],
                { condition: value.viewerWidth - viewerX <= 20 },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__ui_border_gradient__["a" /* default */], { direction: __WEBPACK_IMPORTED_MODULE_17__constants__["k" /* POSITION_RIGHT */], width: value.viewerWidth, height: value.viewerHeight })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_12__ui_if__["a" /* default */],
                { condition: value.viewerHeight - viewerY <= 20 },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__ui_border_gradient__["a" /* default */], { direction: __WEBPACK_IMPORTED_MODULE_17__constants__["l" /* POSITION_BOTTOM */], width: value.viewerWidth, height: value.viewerHeight })
              ),
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                __WEBPACK_IMPORTED_MODULE_12__ui_if__["a" /* default */],
                { condition: value.focus && viewerX <= 20 },
                __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_11__ui_border_gradient__["a" /* default */], { direction: __WEBPACK_IMPORTED_MODULE_17__constants__["m" /* POSITION_LEFT */], width: value.viewerWidth, height: value.viewerHeight })
              )
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_12__ui_if__["a" /* default */],
            { condition: value.mode === __WEBPACK_IMPORTED_MODULE_17__constants__["c" /* MODE_ZOOMING */] },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_13__ui_selection__["a" /* default */], { startX: value.startX, startY: value.startY, endX: value.endX, endY: value.endY })
          )
        ),
        props.toolbarPosition === __WEBPACK_IMPORTED_MODULE_17__constants__["i" /* POSITION_NONE */] ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(CustomToolbar, {
          position: props.toolbarPosition,
          value: value,
          onChangeValue: function onChangeValue(value) {
            return _this3.setValue(value);
          },
          tool: tool,
          onChangeTool: function onChangeTool(tool) {
            return _this3.changeTool(tool);
          } }),
        props.miniaturePosition === __WEBPACK_IMPORTED_MODULE_17__constants__["i" /* POSITION_NONE */] ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          CustomMiniature,
          {
            position: props.miniaturePosition,
            value: value,
            onChangeValue: function onChangeValue(value) {
              return _this3.setValue(value);
            },
            background: this.props.SVGBackground,
            width: this.props.miniatureWidth
          },
          props.children.props.children
        )
      );
    }
  }]);

  return ReactSVGPanZoom;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ReactSVGPanZoom);


ReactSVGPanZoom.propTypes = {
  //width of the viewer displayed on screen
  width: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,

  //height of the viewer displayed on screen
  height: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,

  //background of the viewer
  background: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,

  //background of the svg
  SVGBackground: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,

  //value of the viewer (current point of view)
  value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    version: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([2]).isRequired,
    mode: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([__WEBPACK_IMPORTED_MODULE_17__constants__["a" /* MODE_IDLE */], __WEBPACK_IMPORTED_MODULE_17__constants__["b" /* MODE_PANNING */], __WEBPACK_IMPORTED_MODULE_17__constants__["c" /* MODE_ZOOMING */]]).isRequired,
    focus: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
    a: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    b: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    c: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    d: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    e: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    f: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    viewerWidth: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    viewerHeight: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    SVGWidth: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    SVGHeight: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    startX: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    startY: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    endX: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    endY: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
    miniatureOpen: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired
  }),

  //CSS style of the Viewer
  style: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object,

  //className of the Viewer
  className: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,

  //detect zoom operation performed trough pinch gesture or mouse scroll
  detectWheel: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,

  //perform PAN if the mouse is on viewer border
  detectAutoPan: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,

  //toolbar position
  toolbarPosition: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([__WEBPACK_IMPORTED_MODULE_17__constants__["i" /* POSITION_NONE */], __WEBPACK_IMPORTED_MODULE_17__constants__["j" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_17__constants__["k" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_17__constants__["l" /* POSITION_BOTTOM */], __WEBPACK_IMPORTED_MODULE_17__constants__["m" /* POSITION_LEFT */]]),

  //handler something changed
  onChangeValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

  //handler tool changed
  onChangeTool: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

  //handler click
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

  //handler double click
  onDoubleClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

  //handler mouseup
  onMouseUp: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

  //handler mousemove
  onMouseMove: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

  //handler mousedown
  onMouseDown: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,

  //if disabled the user can move the image outside the viewer
  preventPanOutside: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,

  //how much scale in or out
  scaleFactor: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  tool: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([__WEBPACK_IMPORTED_MODULE_17__constants__["d" /* TOOL_AUTO */], __WEBPACK_IMPORTED_MODULE_17__constants__["e" /* TOOL_NONE */], __WEBPACK_IMPORTED_MODULE_17__constants__["f" /* TOOL_PAN */], __WEBPACK_IMPORTED_MODULE_17__constants__["g" /* TOOL_ZOOM_IN */], __WEBPACK_IMPORTED_MODULE_17__constants__["h" /* TOOL_ZOOM_OUT */]]),

  //modifier keys //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
  modifierKeys: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.array,

  //override toolbar component
  customToolbar: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func]),

  //miniature position
  miniaturePosition: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([__WEBPACK_IMPORTED_MODULE_17__constants__["i" /* POSITION_NONE */], __WEBPACK_IMPORTED_MODULE_17__constants__["k" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_17__constants__["m" /* POSITION_LEFT */]]),

  //miniature width
  miniatureWidth: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,

  //override miniature component
  customMiniature: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element, __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func]),

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
  toolbarPosition: __WEBPACK_IMPORTED_MODULE_17__constants__["k" /* POSITION_RIGHT */],
  modifierKeys: ["Alt", "Shift", "Control"],
  customToolbar: __WEBPACK_IMPORTED_MODULE_14__ui_toolbar_toolbar__["a" /* default */],
  preventPanOutside: true,
  scaleFactor: 1.1,
  miniaturePosition: __WEBPACK_IMPORTED_MODULE_17__constants__["m" /* POSITION_LEFT */],
  miniatureWidth: 100,
  customMiniature: __WEBPACK_IMPORTED_MODULE_16__ui_miniature_miniature__["a" /* default */]
};

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewer_mouse_event__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewer_touch_event__ = __webpack_require__(20);



/* harmony default export */ __webpack_exports__["a"] = (function (originalEvent, value, SVGViewer) {

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
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__features_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewer_event__ = __webpack_require__(13);
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

/* harmony default export */ __webpack_exports__["a"] = (ViewerMouseEvent);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__features_common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__viewer_event__ = __webpack_require__(13);
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

/* harmony default export */ __webpack_exports__["a"] = (ViewerTouchEvent);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interactions__ = __webpack_require__(14);
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
    if ([__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* MODE_PANNING */], __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* MODE_ZOOMING */]].indexOf(value.mode) >= 0) {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__common__["h" /* resetMode */])(value);
    } else if ([__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* MODE_IDLE */]].indexOf(value.mode) >= 0) {
      return value;
    }
  }

  switch (tool) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["h" /* TOOL_ZOOM_OUT */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["g" /* TOOL_ZOOM_IN */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["f" /* TOOL_PAN */]:
      event.stopPropagation();
      event.preventDefault();
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__interactions__["b" /* onMouseDown */])(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

function onTouchMove(event, ViewerDOM, tool, value, props) {
  if (!([__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* MODE_PANNING */], __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* MODE_ZOOMING */]].indexOf(value.mode) >= 0)) return value;

  var touchPosition = event.touches[0];

  var _ViewerDOM$getBoundin2 = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin2.left,
      top = _ViewerDOM$getBoundin2.top;

  var x = touchPosition.clientX - Math.round(left);
  var y = touchPosition.clientY - Math.round(top);

  switch (tool) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["h" /* TOOL_ZOOM_OUT */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["g" /* TOOL_ZOOM_IN */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["f" /* TOOL_PAN */]:
      event.stopPropagation();
      event.preventDefault();
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__interactions__["c" /* onMouseMove */])(event, ViewerDOM, tool, value, props, { x: x, y: y });

    default:
      return value;
  }
}

function onTouchEnd(event, ViewerDOM, tool, value, props) {
  if (!([__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* MODE_PANNING */], __WEBPACK_IMPORTED_MODULE_0__constants__["c" /* MODE_ZOOMING */]].indexOf(value.mode) >= 0)) return value;

  var touchPosition = event.changedTouches[0];

  var _ViewerDOM$getBoundin3 = ViewerDOM.getBoundingClientRect(),
      left = _ViewerDOM$getBoundin3.left,
      top = _ViewerDOM$getBoundin3.top;

  var x = touchPosition.clientX - Math.round(left);
  var y = touchPosition.clientY - Math.round(top);

  switch (tool) {
    case __WEBPACK_IMPORTED_MODULE_0__constants__["h" /* TOOL_ZOOM_OUT */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["g" /* TOOL_ZOOM_IN */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* TOOL_AUTO */]:
    case __WEBPACK_IMPORTED_MODULE_0__constants__["f" /* TOOL_PAN */]:
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__viewer__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ReactSVGPanZoom", function() { return __WEBPACK_IMPORTED_MODULE_0__viewer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_toolbar_toolbar__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Toolbar", function() { return __WEBPACK_IMPORTED_MODULE_1__ui_toolbar_toolbar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__features_common__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "setPointOnViewerCenter", function() { return __WEBPACK_IMPORTED_MODULE_2__features_common__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "reset", function() { return __WEBPACK_IMPORTED_MODULE_2__features_common__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__features_pan__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "pan", function() { return __WEBPACK_IMPORTED_MODULE_3__features_pan__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__features_zoom__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "zoom", function() { return __WEBPACK_IMPORTED_MODULE_4__features_zoom__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fitSelection", function() { return __WEBPACK_IMPORTED_MODULE_4__features_zoom__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fitToViewer", function() { return __WEBPACK_IMPORTED_MODULE_4__features_zoom__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "zoomOnViewerCenter", function() { return __WEBPACK_IMPORTED_MODULE_4__features_zoom__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__features_miniature__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "openMiniature", function() { return __WEBPACK_IMPORTED_MODULE_5__features_miniature__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "closeMiniature", function() { return __WEBPACK_IMPORTED_MODULE_5__features_miniature__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__(1);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MODE_IDLE", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MODE_PANNING", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MODE_ZOOMING", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TOOL_AUTO", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TOOL_NONE", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TOOL_PAN", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TOOL_ZOOM_IN", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TOOL_ZOOM_OUT", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "POSITION_NONE", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "POSITION_TOP", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "POSITION_RIGHT", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "POSITION_BOTTOM", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "POSITION_LEFT", function() { return __WEBPACK_IMPORTED_MODULE_6__constants__["m"]; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Viewer", function() { return Viewer; });








var Viewer = function Viewer() {
  var msg = "HEY! You are trying to use an older version of ReactSVGPanZoom. " + "Read here https://github.com/chrvadala/react-svg-pan-zoom/blob/master/docs/migrate-from-v1-to-v2.md";

  console.error(msg);
  return null;
};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = IconArrow;




//credits https://materialdesignicons.com/icon/chevron-up

function IconArrow(_ref) {
  var open = _ref.open,
      position = _ref.position;


  var transform = 0;

  switch (position) {
    case __WEBPACK_IMPORTED_MODULE_2__constants__["m" /* POSITION_LEFT */]:
      transform = open ? "rotate(225, 12, 13)" : "rotate(45, 12, 13)";
      break;

    case __WEBPACK_IMPORTED_MODULE_2__constants__["k" /* POSITION_RIGHT */]:
      transform = transform = open ? "rotate(135, 12, 13)" : "rotate(-45, 12, 13)";
  }

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'svg',
    { width: 24, height: 24, stroke: 'currentColor' },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      { transform: transform },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { fill: '#000000', d: 'M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z' })
    )
  );
}

IconArrow.propTypes = {
  open: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired,
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([__WEBPACK_IMPORTED_MODULE_2__constants__["k" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_2__constants__["m" /* POSITION_LEFT */]]).isRequired
};

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony export (immutable) */ __webpack_exports__["a"] = MiniatureMask;



function MiniatureMask(_ref) {
  var SVGWidth = _ref.SVGWidth,
      SVGHeight = _ref.SVGHeight,
      visibleAreaX = _ref.visibleAreaX,
      visibleAreaY = _ref.visibleAreaY,
      visibleAreaWidth = _ref.visibleAreaWidth,
      visibleAreaHeight = _ref.visibleAreaHeight,
      zoomToFit = _ref.zoomToFit;

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'g',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'defs',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'mask',
        { id: 'react-svg-pan-zoom-miniature-mask' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('rect', { x: '0', y: '0', width: SVGWidth, height: SVGHeight, fill: '#ffffff' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('rect', { x: visibleAreaX, y: visibleAreaY, width: visibleAreaWidth, height: visibleAreaHeight })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('rect', { x: '0',
      y: '0',
      width: SVGWidth,
      height: SVGHeight,
      style: {
        stroke: "none",
        fill: "#000",
        mask: "url(#react-svg-pan-zoom-miniature-mask)",
        opacity: 0.4
      }
    }),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('rect', {
      stroke: "#47484a",
      strokeWidth: 0.75 / zoomToFit,
      fill: 'transparent',
      x: visibleAreaX,
      y: visibleAreaY,
      width: visibleAreaWidth,
      height: visibleAreaHeight })
  );
}

MiniatureMask.propTypes = {
  SVGWidth: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  SVGHeight: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  visibleAreaX: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  visibleAreaY: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  visibleAreaWidth: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  visibleAreaHeight: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  zoomToFit: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired
};

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__features_miniature__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__icon_arrow__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = MiniatureToggleButton;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function MiniatureToggleButton(_ref) {
  var _style;

  var value = _ref.value,
      onChangeValue = _ref.onChangeValue,
      position = _ref.position;

  var style = (_style = {
    width: "24px",
    height: "24px",
    display: "block",
    position: "absolute",
    bottom: 0
  }, _defineProperty(_style, position === __WEBPACK_IMPORTED_MODULE_4__constants__["m" /* POSITION_LEFT */] ? 'left' : 'right', '0px'), _defineProperty(_style, 'background', "rgba(19, 20, 22, 0.901961)"), _defineProperty(_style, 'border', 0), _defineProperty(_style, 'padding', 0), _defineProperty(_style, 'outline', 0), _defineProperty(_style, 'color', "#fff"), _style);

  var action = value.miniatureOpen ? __WEBPACK_IMPORTED_MODULE_2__features_miniature__["b" /* closeMiniature */] : __WEBPACK_IMPORTED_MODULE_2__features_miniature__["a" /* openMiniature */];

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'button',
    { role: 'button', style: style, onClick: function onClick(event) {
        return onChangeValue(action(value));
      } },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__icon_arrow__["a" /* default */], { open: value.miniatureOpen, position: position })
  );
}

MiniatureToggleButton.propTypes = {
  value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  onChangeValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([__WEBPACK_IMPORTED_MODULE_4__constants__["k" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_4__constants__["m" /* POSITION_LEFT */]]).isRequired
};

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_transformation_matrix__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__miniature_toggle_button__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__miniature_mask__ = __webpack_require__(24);
/* harmony export (immutable) */ __webpack_exports__["a"] = Miniature;
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var min = Math.min,
    max = Math.max;


function Miniature(_ref) {
  var value = _ref.value,
      onChangeValue = _ref.onChangeValue,
      position = _ref.position,
      children = _ref.children,
      background = _ref.background,
      miniatureWidth = _ref.width;
  var SVGWidth = value.SVGWidth,
      SVGHeight = value.SVGHeight,
      viewerWidth = value.viewerWidth,
      viewerHeight = value.viewerHeight;

  var ratio = SVGWidth / SVGHeight;

  var miniatureHeight = miniatureWidth * ratio;

  var zoomToFit = miniatureWidth / SVGWidth;

  var _applyToPoints = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_transformation_matrix__["h" /* applyToPoints */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_transformation_matrix__["c" /* inverse */])(value), [{ x: 0, y: 0 }, { x: viewerWidth, y: viewerHeight }]),
      _applyToPoints2 = _slicedToArray(_applyToPoints, 2),
      _applyToPoints2$ = _applyToPoints2[0],
      x1 = _applyToPoints2$.x,
      y1 = _applyToPoints2$.y,
      _applyToPoints2$2 = _applyToPoints2[1],
      x2 = _applyToPoints2$2.x,
      y2 = _applyToPoints2$2.y;

  x1 = max(x1, 0);
  y1 = max(y1, 0);
  x2 = min(x2, SVGWidth);
  y2 = min(y2, SVGHeight);

  var width = void 0,
      height = void 0,
      bottom = void 0;

  if (value.miniatureOpen) {
    width = miniatureWidth;
    height = miniatureHeight;
  } else {
    width = 24;
    height = 24;
  }

  var style = _defineProperty({
    position: "absolute",
    overflow: "hidden",
    outline: "1px solid rgba(19, 20, 22, 0.90)",
    transition: "width 200ms ease, height 200ms ease, bottom 200ms ease",
    width: width + "px",
    height: height + "px",
    bottom: "6px"
  }, position === __WEBPACK_IMPORTED_MODULE_2__constants__["m" /* POSITION_LEFT */] ? 'left' : 'right', "6px");

  return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'div',
    { role: 'navigation', style: style },
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'svg',
      {
        width: miniatureWidth,
        height: miniatureHeight,
        style: { pointerEvents: "none" } },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'g',
        { transform: 'scale(' + zoomToFit + ', ' + zoomToFit + ')' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('rect', {
          fill: background,
          x: 0,
          y: 0,
          width: value.SVGWidth,
          height: value.SVGHeight }),
        children,
        x1 === 0 && y1 === 0 && x2 - x1 === SVGWidth && y2 - y1 === SVGHeight ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__miniature_mask__["a" /* default */], {
          SVGWidth: SVGWidth,
          SVGHeight: SVGHeight,
          visibleAreaX: x1,
          visibleAreaY: y1,
          visibleAreaWidth: x2 - x1,
          visibleAreaHeight: y2 - y1,
          zoomToFit: zoomToFit
        })
      )
    ),
    __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__miniature_toggle_button__["a" /* default */], { value: value, onChangeValue: onChangeValue, position: position })
  );
}

Miniature.propTypes = {
  position: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([__WEBPACK_IMPORTED_MODULE_2__constants__["k" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_2__constants__["m" /* POSITION_LEFT */]]).isRequired,
  value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.object.isRequired,
  onChangeValue: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  background: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  width: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired
};

/***/ }),
/* 27 */
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

/***/ }),
/* 28 */
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

/***/ }),
/* 29 */
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

/***/ }),
/* 30 */
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

/***/ }),
/* 31 */
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

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var ToolbarButton = function (_React$Component) {
  _inherits(ToolbarButton, _React$Component);

  function ToolbarButton(props) {
    _classCallCheck(this, ToolbarButton);

    var _this = _possibleConstructorReturn(this, (ToolbarButton.__proto__ || Object.getPrototypeOf(ToolbarButton)).call(this, props));

    _this.state = { hover: false };
    return _this;
  }

  _createClass(ToolbarButton, [{
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

      var style = {
        display: "block",
        width: "24px",
        height: "24px",
        margin: [__WEBPACK_IMPORTED_MODULE_2__constants__["j" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_2__constants__["l" /* POSITION_BOTTOM */]].indexOf(this.props.toolbarPosition) >= 0 ? "2px 1px" : "1px 2px",
        color: this.props.active || this.state.hover ? '#1CA6FC' : '#FFF',
        transition: "color 200ms ease",
        background: "none",
        padding: "0px",
        border: "0px",
        outline: "0px",
        cursor: "pointer"
      };

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'button',
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

          style: style,
          title: this.props.title,
          name: this.props.name,
          role: 'button'

        },
        this.props.children
      );
    }
  }]);

  return ToolbarButton;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (ToolbarButton);


ToolbarButton.propTypes = {
  title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  name: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  toolbarPosition: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
  onClick: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
  active: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired
};

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["a"] = BorderGradient;




function BorderGradient(_ref) {
  var direction = _ref.direction,
      width = _ref.width,
      height = _ref.height;


  var transform = void 0;

  switch (direction) {
    case __WEBPACK_IMPORTED_MODULE_2__constants__["j" /* POSITION_TOP */]:
      transform = 'translate(' + width + ', 0) rotate(90)';
      break;

    case __WEBPACK_IMPORTED_MODULE_2__constants__["k" /* POSITION_RIGHT */]:
      transform = 'translate(' + width + ', ' + height + ') rotate(180)';
      break;

    case __WEBPACK_IMPORTED_MODULE_2__constants__["l" /* POSITION_BOTTOM */]:
      transform = 'translate(0, ' + height + ') rotate(270)';
      break;

    case __WEBPACK_IMPORTED_MODULE_2__constants__["m" /* POSITION_LEFT */]:
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
  direction: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOf([__WEBPACK_IMPORTED_MODULE_2__constants__["j" /* POSITION_TOP */], __WEBPACK_IMPORTED_MODULE_2__constants__["k" /* POSITION_RIGHT */], __WEBPACK_IMPORTED_MODULE_2__constants__["l" /* POSITION_BOTTOM */], __WEBPACK_IMPORTED_MODULE_2__constants__["m" /* POSITION_LEFT */]]).isRequired,
  width: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
  height: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired
};

/***/ }),
/* 34 */
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

/* harmony default export */ __webpack_exports__["a"] = (function (cursor) {
  if (!needPrefix(cursor)) return cursor;
  if (isFirefox()) return '-moz-' + cursor;
  if (isWebkit()) return '-webkit-' + cursor;
});

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isTouchDevice;
//http://stackoverflow.com/a/4819886/1398836

function isTouchDevice() {
  return 'ontouchstart' in window // works on most browsers
  || navigator.maxTouchPoints; // works on IE10/11 and Surface
};

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
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
  condition: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool.isRequired
};

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(9);
/* harmony export (immutable) */ __webpack_exports__["a"] = Selection;




function Selection(_ref) {
  var startX = _ref.startX,
      startY = _ref.startY,
      endX = _ref.endX,
      endY = _ref.endY;

  if (!startX || !startY || !endX || !endY) return null;

  var box = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* calculateBox */])({ x: startX, y: startY }, { x: endX, y: endY });

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
  startX: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  startY: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  endX: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  endY: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(11);
  var warning = __webpack_require__(15);
  var ReactPropTypesSecret = __webpack_require__(16);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(10);
var invariant = __webpack_require__(11);

module.exports = function() {
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  function shim() {
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(10);
var invariant = __webpack_require__(11);
var warning = __webpack_require__(15);

var ReactPropTypesSecret = __webpack_require__(16);
var checkPropTypes = __webpack_require__(38);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = applyToPoint;
/* harmony export (immutable) */ __webpack_exports__["b"] = applyToPoints;
/**
 * Calculate a point transformed with an affine matrix
 * @param matrix Affine matrix
 * @param point Point
 * @returns {{x: number, y: number}} Point
 */
function applyToPoint(matrix, point) {
  return {
    x: matrix.a * point.x + matrix.c * point.y + matrix.e,
    y: matrix.b * point.x + matrix.d * point.y + matrix.f
  };
}

/**
 * Calculate an array of points transformed with an affine matrix
 * @param matrix Affine matrix
 * @param points Array of points
 * @returns {array} Array of points
 */
function applyToPoints(matrix, points) {
  return points.map(function (point) {
    return applyToPoint(matrix, point);
  });
}

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fromObject;
/**
 * Extract an affine matrix from an object that contains a,b,c,d,e,f keys
 * Each value could be a float or a string that contains a float
 * @param object
 * @return {{a: *, b: *, c: *, e: *, d: *, f: *}}}
 */
function fromObject(object) {
  return {
    a: parseFloat(object.a),
    b: parseFloat(object.b),
    c: parseFloat(object.c),
    d: parseFloat(object.d),
    e: parseFloat(object.e),
    f: parseFloat(object.f)
  };
}

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export fromString */
/**
 * @ignore
 * @type {RegExp}
 */
var matrixRegex = /^matrix\( *([0-9]*\.?[0-9]+) *, *([0-9]*\.?[0-9]+) *, *([0-9]*\.?[0-9]+) *, *([0-9]*\.?[0-9]+) *, *([0-9]*\.?[0-9]+) *, *([0-9]*\.?[0-9]+) *\)$/i;

/**
 * Parse a string matrix formatted as matrix(a,b,c,d,e,f)
 * @param string String with a matrix
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function fromString(string) {
  var parsed = string.match(matrixRegex);
  if (parsed === null || parsed.length < 7) throw new Error("'" + string + "' is not a matrix");
  return {
    a: parseFloat(parsed[1]),
    b: parseFloat(parsed[2]),
    c: parseFloat(parsed[3]),
    d: parseFloat(parsed[4]),
    e: parseFloat(parsed[5]),
    f: parseFloat(parsed[6])
  };
}

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = identity;
/**
 * Identity matrix
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function identity() {
  return {
    a: 1, c: 0, e: 0,
    b: 0, d: 1, f: 0
  };
}

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = inverse;
/**
 * Calculate a matrix that is the inverse of the provided matrix
 * @param matrix Affine matrix
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function inverse(matrix) {
  //http://www.wolframalpha.com/input/?i=Inverse+%5B%7B%7Ba,c,e%7D,%7Bb,d,f%7D,%7B0,0,1%7D%7D%5D

  var a = matrix.a,
      b = matrix.b,
      c = matrix.c,
      d = matrix.d,
      e = matrix.e,
      f = matrix.f;


  var denom = a * d - b * c;

  return {
    a: d / denom,
    b: b / -denom,
    c: c / -denom,
    d: a / denom,
    e: (d * e - c * f) / -denom,
    f: (b * e - a * f) / denom
  };
}

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isAffineMatrix */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Check if the object contain an affine matrix
 * @param object
 * @return {boolean}
 */
function isAffineMatrix(object) {
  var isNumeric = function isNumeric(n) {
    return typeof n === 'number' && !isNaN(n) && isFinite(n);
  };
  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.hasOwnProperty('a') && isNumeric(object.a) && object.hasOwnProperty('b') && isNumeric(object.b) && object.hasOwnProperty('c') && isNumeric(object.c) && object.hasOwnProperty('d') && isNumeric(object.d) && object.hasOwnProperty('e') && isNumeric(object.e) && object.hasOwnProperty('f') && isNumeric(object.f);
}

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export rotate */
/* unused harmony export rotateDEG */
var cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI;
/**
 * Calculate a rotation matrix
 * @param angle Angle in radians
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix *
 */

function rotate(angle) {
  var cosAngle = cos(angle);
  var sinAngle = sin(angle);
  return {
    a: cosAngle, c: -sinAngle, e: 0,
    b: sinAngle, d: cosAngle, f: 0
  };
}

/**
 * Calculate a rotation matrix with a DEG angle
 * @param angle Angle in degree
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function rotateDEG(angle) {
  return rotate(angle * PI / 180);
}

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = scale;
/**
 * Calculate a scaling matrix
 * @param sx Scaling on axis x
 * @param sy Scaling on axis y
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function scale(sx, sy) {
  return {
    a: sx, c: 0, e: 0,
    b: 0, d: sy, f: 0
  };
}

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export shear */
/**
 * Calculate a shear matrix
 * @param shx Shear on axis x
 * @param shy Shear on axis y
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function shear(shx, shy) {
  return {
    a: 1, c: shx, e: 0,
    b: shy, d: 1, f: 0
  };
}

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export toCSS */
/* harmony export (immutable) */ __webpack_exports__["a"] = toSVG;
/* unused harmony export toString */
/**
 * Serialize the matrix to a string that can be used with CSS or SVG
 * @param matrix Affine matrix
 * @returns {string} String that contains a matrix formatted as matrix(a,b,c,d,e,f)
 */
function toCSS(matrix) {
  return toString(matrix);
}

/**
 * Serialize the matrix to a string that can be used with CSS or SVG
 * @param matrix Affine matrix
 * @returns {string} String that contains a matrix formatted as matrix(a,b,c,d,e,f)
 */
function toSVG(matrix) {
  return toString(matrix);
}

/**
 * Serialize the matrix to a string that can be used with CSS or SVG
 * @param matrix Affine matrix
 * @returns {string} String that contains a matrix formatted as matrix(a,b,c,d,e,f)
 */
function toString(matrix) {
  return "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
}

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = transform;
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

/**
 * Merge multiple matrices into one
 * @param matrices {...object} list of matrices
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function transform() {
  for (var _len = arguments.length, matrices = Array(_len), _key = 0; _key < _len; _key++) {
    matrices[_key] = arguments[_key];
  }

  matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;

  var multiply = function multiply(m1, m2) {
    return {
      a: m1.a * m2.a + m1.c * m2.b, c: m1.a * m2.c + m1.c * m2.d, e: m1.a * m2.e + m1.c * m2.f + m1.e,
      b: m1.b * m2.a + m1.d * m2.b, d: m1.b * m2.c + m1.d * m2.d, f: m1.b * m2.e + m1.d * m2.f + m1.f
    };
  };

  switch (matrices.length) {
    case 0:
      throw new Error('no matrices provided');

    case 1:
      return matrices[0];

    case 2:
      return multiply(matrices[0], matrices[1]);

    default:
      var _matrices = matrices,
          _matrices2 = _toArray(_matrices),
          m1 = _matrices2[0],
          m2 = _matrices2[1],
          rest = _matrices2.slice(2);

      var m = multiply(m1, m2);
      return transform.apply(undefined, [m].concat(_toConsumableArray(rest)));
  }
}

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = translate;
/**
 * Calculate a translate matrix
 * @param tx Translation on axis x
 * @param ty Translation on axis y
 * @returns {{a: number, b: number, c: number, e: number, d: number, f: number}} Affine matrix
 */
function translate(tx, ty) {
  return {
    a: 1, c: 0, e: tx,
    b: 0, d: 1, f: ty
  };
}

/***/ })
/******/ ]);
//# sourceMappingURL=react-svg-pan-zoom.js.map