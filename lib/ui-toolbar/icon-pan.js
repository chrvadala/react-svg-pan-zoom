"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IconPan;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//https://materialdesignicons.com/icon/cursor-move

function IconPan() {
  return _react2.default.createElement(
    "svg",
    { width: 24, height: 24, stroke: "currentColor" },
    _react2.default.createElement("path", {
      d: "M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" })
  );
}