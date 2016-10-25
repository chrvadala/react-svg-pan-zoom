"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IconZoomIn;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IconZoomIn(_ref) {
  var color = _ref.color;

  return _react2.default.createElement(
    "svg",
    { width: 24, height: 24 },
    _react2.default.createElement(
      "g",
      null,
      _react2.default.createElement("path", { stroke: color,
        d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }),
      _react2.default.createElement("path", { d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z", stroke: color })
    )
  );
}

IconZoomIn.propTypes = {
  color: _react.PropTypes.string.isRequired
};