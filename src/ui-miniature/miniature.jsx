import React, {PropTypes} from 'react';
import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT,
} from '../constants';
import {applyToPoints, inverse} from 'transformation-matrix';
const {min, max} = Math;

export default function Miniature({value, position, children, background}) {

  let {SVGWidth, SVGHeight, viewerWidth, viewerHeight} = value;
  let ratio = SVGWidth / SVGHeight;

  let width = 100;
  let height = width * ratio;

  let zoomToFit = width / SVGWidth;

  let [{x: x1, y: y1}, {x: x2, y: y2}] = applyToPoints(inverse(value), [
    {x: 0, y: 0},
    {x: viewerWidth, y: viewerHeight}
  ]);

  x1 = max(x1, 0);
  y1 = max(y1, 0);
  x2 = min(x2, SVGWidth);
  y2 = min(y2, SVGHeight);


  let style = {
    width: width + "px",
    height: height + "px",
    position: "relative",
    bottom: (height + 20) + "px",
    left: "20px",
    outline: "1px solid rgba(19, 20, 22, 0.90)"
  };

  return (
    <div role="navigation" style={style}>
      <svg
        width={width}
        height={height}
        style={{pointerEvents: "none"}}>
        <g transform={`scale(${zoomToFit}, ${zoomToFit})`}>

          <rect
            fill={background}
            x={0}
            y={0}
            width={value.SVGWidth}
            height={value.SVGHeight}/>

          {children}

          <rect
            stroke={"black"}
            strokeWidth="10px"
            fill="transparent"
            x={x1}
            y={y1}
            width={x2 - x1}
            height={y2 - y1}/>
        </g>
      </svg>
    </div>
  )
}

Miniature.propTypes = {
  position: PropTypes.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired,
  value: PropTypes.object.isRequired,
  background: PropTypes.string.isRequired,
};
