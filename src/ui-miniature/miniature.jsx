import React from 'react';
import PropTypes from 'prop-types';
import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  POSITION_RIGHT, POSITION_LEFT,
} from '../constants';
import {applyToPoints, inverse} from 'transformation-matrix';
import MiniatureToggleButton from './miniature-toggle-button';
import MiniatureMask from './miniature-mask';

const {min, max} = Math;

export default function Miniature(props) {

  let {value, onChangeValue, position, children, background, SVGBackground, width: miniatureWidth, height: miniatureHeight} = props;
  let {SVGWidth, SVGHeight, viewerWidth, viewerHeight} = value;

  let ratio = SVGHeight / SVGWidth;

  let zoomToFit = ratio >= 1
    ? miniatureHeight / SVGHeight
    : miniatureWidth / SVGWidth;

  let [{x: x1, y: y1}, {x: x2, y: y2}] = applyToPoints(inverse(value), [
    {x: 0, y: 0},
    {x: viewerWidth, y: viewerHeight}
  ]);

  let width, height;
  if (value.miniatureOpen) {
    width = miniatureWidth;
    height = miniatureHeight;
  } else {
    width = 24;
    height = 24;
  }

  let style = {
    position: "absolute",
    overflow: "hidden",
    outline: "1px solid rgba(19, 20, 22, 0.90)",
    transition: "width 200ms ease, height 200ms ease, bottom 200ms ease",
    width: width + "px",
    height: height + "px",
    bottom: "6px",
    [position === POSITION_LEFT ? 'left' : 'right']: "6px",
    background
  };

  let centerTranslation = ratio >= 1
    ? `translate(${(miniatureWidth - (SVGWidth * zoomToFit)) / 2 }, 0)`
    : `translate(0, ${(miniatureHeight - (SVGHeight * zoomToFit)) / 2 })`;

  return (
    <div role="navigation" style={style}>
      <svg
        width={miniatureWidth}
        height={miniatureHeight}
        style={{pointerEvents: "none"}}>
        <g transform={centerTranslation}>
          <g transform={`scale(${zoomToFit}, ${zoomToFit})`}>

            <rect
              fill={SVGBackground}
              x={0}
              y={0}
              width={value.SVGWidth}
              height={value.SVGHeight}/>

            {children}

            <MiniatureMask
              SVGWidth={SVGWidth}
              SVGHeight={SVGHeight}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              zoomToFit={zoomToFit}
            />

          </g>
        </g>
      </svg>
      <MiniatureToggleButton value={value} onChangeValue={onChangeValue} position={position}/>
    </div>
  )
}

Miniature.propTypes = {
  position: PropTypes.oneOf([POSITION_RIGHT, POSITION_LEFT]).isRequired,
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  background: PropTypes.string.isRequired,
  SVGBackground: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};
