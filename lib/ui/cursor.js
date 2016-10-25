'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cursor) {
  if (!needPrefix(cursor)) return cursor;
  if (isFirefox()) return '-moz-' + cursor;
  if (isWebkit()) return '-webkit-' + cursor;
};

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