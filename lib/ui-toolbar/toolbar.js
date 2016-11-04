'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _STYLE_TOOLBAR_ORIENT, _STYLE_ELEMENT_ORIENT;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Toolbar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('../constants');

var _iconCursor = require('./icon-cursor');

var _iconCursor2 = _interopRequireDefault(_iconCursor);

var _iconPan = require('./icon-pan');

var _iconPan2 = _interopRequireDefault(_iconPan);

var _iconZoomIn = require('./icon-zoom-in');

var _iconZoomIn2 = _interopRequireDefault(_iconZoomIn);

var _iconZoomOut = require('./icon-zoom-out');

var _iconZoomOut2 = _interopRequireDefault(_iconZoomOut);

var _common = require('../features/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var STYLE_TOOLBAR = {
  backgroundColor: "rgba(19, 20, 22, 0.90)",
  borderRadius: "2px",
  display: "flex"
};

var STYLE_TOOLBAR_ORIENTED = (_STYLE_TOOLBAR_ORIENT = {}, _defineProperty(_STYLE_TOOLBAR_ORIENT, _constants.ORIENTATION_HORIZONTAL, _extends({}, STYLE_TOOLBAR, {
  padding: "3px 5px 3px 3px",
  flexDirection: "row"
})), _defineProperty(_STYLE_TOOLBAR_ORIENT, _constants.ORIENTATION_VERTICAL, _extends({}, STYLE_TOOLBAR, {
  padding: "5px 3px 3px 3px",
  flexDirection: "column"
})), _STYLE_TOOLBAR_ORIENT);

var STYLE_ELEMENT = {
  display: "block",
  width: "24px",
  height: "24px"
};

var STYLE_ELEMENT_ORIENTED = (_STYLE_ELEMENT_ORIENT = {}, _defineProperty(_STYLE_ELEMENT_ORIENT, _constants.ORIENTATION_HORIZONTAL, _extends({}, STYLE_ELEMENT, {
  padding: "1px 2px"
})), _defineProperty(_STYLE_ELEMENT_ORIENT, _constants.ORIENTATION_VERTICAL, _extends({}, STYLE_ELEMENT, {
  padding: "2px 1px"
})), _STYLE_ELEMENT_ORIENT);

var ICON_COLOR_OFF = '#FFF';
var ICON_COLOR_ON = '#1CA6FC';

function Toolbar(_ref) {
  var tool = _ref.tool,
      value = _ref.value,
      onChangeValue = _ref.onChangeValue,
      onChangeTool = _ref.onChangeTool,
      orientation = _ref.orientation;


  var handleChangeTool = function handleChangeTool(event, tool) {
    onChangeTool(tool);
    event.stopPropagation();
    event.preventDefault();
  };

  var styleToolbarFull = STYLE_TOOLBAR_ORIENTED[orientation];
  var styleElementFull = STYLE_ELEMENT_ORIENTED[orientation];

  return _react2.default.createElement(
    'div',
    { style: styleToolbarFull },
    _react2.default.createElement(
      'a',
      { style: styleElementFull, href: 'javascript:;', title: 'Selection',
        onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_NONE);
        } },
      _react2.default.createElement(_iconCursor2.default, { color: tool === _constants.TOOL_NONE ? ICON_COLOR_ON : ICON_COLOR_OFF })
    ),
    _react2.default.createElement(
      'a',
      { style: styleElementFull, href: 'javascript:;', title: 'Pan', onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_PAN);
        } },
      _react2.default.createElement(_iconPan2.default, { color: tool === _constants.TOOL_PAN ? ICON_COLOR_ON : ICON_COLOR_OFF })
    ),
    _react2.default.createElement(
      'a',
      { style: styleElementFull, href: 'javascript:;', title: 'Zoom in', onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_ZOOM_IN);
        } },
      _react2.default.createElement(_iconZoomIn2.default, { color: tool === _constants.TOOL_ZOOM_IN ? ICON_COLOR_ON : ICON_COLOR_OFF })
    ),
    _react2.default.createElement(
      'a',
      { style: styleElementFull, href: 'javascript:;', title: 'Zoom out', onClick: function onClick(event) {
          return handleChangeTool(event, _constants.TOOL_ZOOM_OUT);
        } },
      _react2.default.createElement(_iconZoomOut2.default, { color: tool === _constants.TOOL_ZOOM_OUT ? ICON_COLOR_ON : ICON_COLOR_OFF })
    )
  );
}

Toolbar.propTypes = {
  orientation: _react.PropTypes.oneOf([_constants.ORIENTATION_VERTICAL, _constants.ORIENTATION_HORIZONTAL]).isRequired,
  tool: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.object.isRequired,
  onChangeValue: _react.PropTypes.func.isRequired,
  onChangeTool: _react.PropTypes.func.isRequired
};