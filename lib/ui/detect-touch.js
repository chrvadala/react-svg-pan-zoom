'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isTouchDevice;
//http://stackoverflow.com/a/4819886/1398836

function isTouchDevice() {
  return 'ontouchstart' in window // works on most browsers
  || navigator.maxTouchPoints; // works on IE10/11 and Surface
};