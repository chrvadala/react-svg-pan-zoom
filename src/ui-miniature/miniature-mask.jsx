import React from 'react';
import PropTypes from 'prop-types';

export default function MiniatureMask({SVGWidth, SVGHeight, x1, y1, x2, y2, zoomToFit}) {
  return (
    <g>
      <defs>
        <mask id="react-svg-pan-zoom-miniature-mask">
          <rect x="0" y="0" width={SVGWidth} height={SVGHeight} fill="#ffffff"/>
          <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1}/>
        </mask>
      </defs>

      <rect x="0"
            y="0"
            width={SVGWidth}
            height={SVGHeight}
            style={{
              stroke: "none",
              fill: "#000",
              mask: "url(#react-svg-pan-zoom-miniature-mask)",
              opacity: 0.4
            }}
      />

    </g>)
}

MiniatureMask.propTypes = {
  SVGWidth: PropTypes.number.isRequired,
  SVGHeight: PropTypes.number.isRequired,
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
  zoomToFit: PropTypes.number.isRequired,
}
