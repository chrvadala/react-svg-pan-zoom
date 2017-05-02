var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { POSITION_TOP, POSITION_BOTTOM } from '../constants';

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
        margin: [POSITION_TOP, POSITION_BOTTOM].indexOf(this.props.toolbarPosition) >= 0 ? "2px 1px" : "1px 2px",
        color: this.props.active || this.state.hover ? '#1CA6FC' : '#FFF',
        transition: "color 200ms ease",
        background: "none",
        padding: "0px",
        border: "0px",
        outline: "0px",
        cursor: "pointer"
      };

      return React.createElement(
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
}(React.Component);

export default ToolbarButton;


ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toolbarPosition: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};