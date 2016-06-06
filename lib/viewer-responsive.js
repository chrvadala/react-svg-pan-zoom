'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDimensions = require('react-dimensions');

var _reactDimensions2 = _interopRequireDefault(_reactDimensions);

var _viewer = require('./viewer');

var _viewer2 = _interopRequireDefault(_viewer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewerResponsive = function (_React$Component) {
  _inherits(ViewerResponsive, _React$Component);

  function ViewerResponsive() {
    _classCallCheck(this, ViewerResponsive);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ViewerResponsive).apply(this, arguments));
  }

  _createClass(ViewerResponsive, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var containerWidth = _props.containerWidth;
      var containerHeight = _props.containerHeight;
      var width = _props.width;
      var height = _props.height;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['containerWidth', 'containerHeight', 'width', 'height', 'children']);

      width = width || containerWidth;height = height || containerHeight;
      return _react2.default.createElement(
        _viewer2.default,
        _extends({}, props, { width: width, height: height }),
        children
      );
    }
  }]);

  return ViewerResponsive;
}(_react2.default.Component);

exports.default = (0, _reactDimensions2.default)()(ViewerResponsive);