function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import PropTypes from 'prop-types';
import { openMiniature, closeMiniature } from '../features/miniature';
import IconArrow from './icon-arrow';
import { POSITION_RIGHT, POSITION_LEFT } from '../constants';

export default function MiniatureToggleButton(_ref) {
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
  }, _defineProperty(_style, position === POSITION_LEFT ? 'left' : 'right', '0px'), _defineProperty(_style, 'background', "rgba(19, 20, 22, 0.901961)"), _defineProperty(_style, 'border', 0), _defineProperty(_style, 'padding', 0), _defineProperty(_style, 'outline', 0), _defineProperty(_style, 'color', "#fff"), _style);

  var action = value.miniatureOpen ? closeMiniature : openMiniature;

  return React.createElement(
    'button',
    { role: 'button', style: style, onClick: function onClick(event) {
        return onChangeValue(action(value));
      } },
    React.createElement(IconArrow, { open: value.miniatureOpen, position: position })
  );
}

MiniatureToggleButton.propTypes = {
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  position: PropTypes.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired
};