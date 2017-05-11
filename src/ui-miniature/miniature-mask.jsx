import React from 'react';
import PropTypes from 'prop-types';

export default function MiniatureMask({SVGWidth, SVGHeight, visibleAreaX, visibleAreaY, visibleAreaWidth, visibleAreaHeight, zoomToFit}) {
  return (
    <g>
      <defs>
        <mask id="react-svg-pan-zoom-miniature-mask">
          <rect x="0" y="0" width={SVGWidth} height={SVGHeight} fill="#ffffff"/>
          <rect x={visibleAreaX} y={visibleAreaY} width={visibleAreaWidth} height={visibleAreaHeight}/>
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
      <rect
        stroke={"#47484a"}
        strokeWidth={0.75 / zoomToFit}
        fill="transparent"
        x={visibleAreaX}
        y={visibleAreaY}
        width={visibleAreaWidth}
        height={visibleAreaHeight}/>

    </g>)
}

MiniatureMask.propTypes = {
  SVGWidth: PropTypes.number.isRequired,
  SVGHeight: PropTypes.number.isRequired,
  visibleAreaX: PropTypes.number.isRequired,
  visibleAreaY: PropTypes.number.isRequired,
  visibleAreaWidth: PropTypes.number.isRequired,
  visibleAreaHeight: PropTypes.number.isRequired,
  zoomToFit: PropTypes.number.isRequired,
}
