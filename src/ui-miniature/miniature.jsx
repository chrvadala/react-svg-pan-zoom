import React, {PropTypes} from 'react';
import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT,
} from '../constants';
import {applyToPoints, inverse} from 'transformation-matrix';
import MiniatureToggleButton from './miniature-toggle-button';
const {min, max} = Math;

export default function Miniature({value, onChangeValue, position, children, background}) {

  let {SVGWidth, SVGHeight, viewerWidth, viewerHeight} = value;
  let ratio = SVGWidth / SVGHeight;

  let miniatureWidth = 100;
  let miniatureHeight = miniatureWidth * ratio;

  let zoomToFit = miniatureWidth / SVGWidth;

  let [{x: x1, y: y1}, {x: x2, y: y2}] = applyToPoints(inverse(value), [
    {x: 0, y: 0},
    {x: viewerWidth, y: viewerHeight}
  ]);

  x1 = max(x1, 0);
  y1 = max(y1, 0);
  x2 = min(x2, SVGWidth);
  y2 = min(y2, SVGHeight);


  let width, height, bottom;

  if (value.miniatureOpen) {
    width = miniatureWidth;
    height = miniatureHeight;
    bottom = (height + 20)
  } else {
    width = 24;
    height = 24;
    bottom = 24 + 20;
  }

  let style = {
    position: "relative",
    left: "20px",
    overflow: "hidden",
    outline: "1px solid rgba(19, 20, 22, 0.90)",
    transition: "width 200ms ease, height 200ms ease, bottom 200ms ease",
    width: width + "px",
    height: height + "px",
    bottom: bottom + "px",
  };

  return (
    <div role="navigation" style={style}>
      <svg
        width={miniatureWidth}
        height={miniatureHeight}
        style={{pointerEvents: "none"}}>
        <g transform={`scale(${zoomToFit}, ${zoomToFit})`}>

          <rect
            fill={background}
            x={0}
            y={0}
            width={value.SVGWidth}
            height={value.SVGHeight}/>

          {children}
          {x1 === 0 && y1 === 0 && x2 - x1 === SVGWidth && y2 - y1 === SVGHeight ? null :
            <rect
              stroke={"#131416"}
              strokeWidth={0.75 / zoomToFit}
              fill="transparent"
              x={x1}
              y={y1}
              width={x2 - x1}
              height={y2 - y1}/>
          }
        </g>
      </svg>
      <MiniatureToggleButton value={value} onChangeValue={onChangeValue}/>
    </div>
  )
}

Miniature.propTypes = {
  position: PropTypes.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired,
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  background: PropTypes.string.isRequired,
};
