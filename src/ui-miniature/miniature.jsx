import React from 'react';
import PropTypes from 'prop-types';
import {POSITION_LEFT, POSITION_RIGHT,} from '../constants';
import {applyToPoints, inverse} from 'transformation-matrix';
import MiniatureToggleButton from './miniature-toggle-button';
import MiniatureMask from './miniature-mask';

export default function Miniature(props) {

  let {value, onChangeValue, children, position, background, SVGBackground, width: miniatureWidth, height: miniatureHeight} = props;
  let {SVGMinX, SVGMinY, SVGWidth, SVGHeight, viewerWidth, viewerHeight} = value;

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
    ? `translate(${(miniatureWidth - (SVGWidth * zoomToFit)) / 2 - SVGMinX * zoomToFit}, ${ - SVGMinY * zoomToFit})`
    : `translate(${ - SVGMinX * zoomToFit}, ${(miniatureHeight - (SVGHeight * zoomToFit)) / 2 - SVGMinY * zoomToFit})`;

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
              x={SVGMinX}
              y={SVGMinY}
              width={SVGWidth}
              height={SVGHeight}/>

            {children}

            <MiniatureMask
              SVGWidth={SVGWidth}
              SVGHeight={SVGHeight}
              SVGMinX={SVGMinX}
              SVGMinY={SVGMinY}
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
  value: PropTypes.object.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  SVGBackground: PropTypes.string.isRequired,

  //customizations
  position: PropTypes.oneOf([POSITION_RIGHT, POSITION_LEFT]),
  background: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Miniature.defaultProps = {
  position: POSITION_LEFT,
  background: "#616264",
  width: 100,
  height: 80,
}
