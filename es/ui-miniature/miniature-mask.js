import React from 'react';
import PropTypes from 'prop-types';

export default function MiniatureMask(_ref) {
  var SVGWidth = _ref.SVGWidth,
      SVGHeight = _ref.SVGHeight,
      visibleAreaX = _ref.visibleAreaX,
      visibleAreaY = _ref.visibleAreaY,
      visibleAreaWidth = _ref.visibleAreaWidth,
      visibleAreaHeight = _ref.visibleAreaHeight,
      zoomToFit = _ref.zoomToFit;

  return React.createElement(
    'g',
    null,
    React.createElement(
      'defs',
      null,
      React.createElement(
        'mask',
        { id: 'react-svg-pan-zoom-miniature-mask' },
        React.createElement('rect', { x: '0', y: '0', width: SVGWidth, height: SVGHeight, fill: '#ffffff' }),
        React.createElement('rect', { x: visibleAreaX, y: visibleAreaY, width: visibleAreaWidth, height: visibleAreaHeight })
      )
    ),
    React.createElement('rect', { x: '0',
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
    React.createElement('rect', {
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
  SVGWidth: PropTypes.number.isRequired,
  SVGHeight: PropTypes.number.isRequired,
  visibleAreaX: PropTypes.number.isRequired,
  visibleAreaY: PropTypes.number.isRequired,
  visibleAreaWidth: PropTypes.number.isRequired,
  visibleAreaHeight: PropTypes.number.isRequired,
  zoomToFit: PropTypes.number.isRequired
};