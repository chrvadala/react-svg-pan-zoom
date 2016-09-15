import {DIRECTION_UP, DIRECTION_RIGHT, DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_NONE} from './constants';

export default direction => {

  let transform;

  switch (direction) {

    case DIRECTION_LEFT:
      transform = " ";
      break;

    case DIRECTION_RIGHT:
      transform = "translate(500, 500) rotate(180)";
      break;

    case DIRECTION_UP:
      transform = "translate(500, 0) rotate(90)";
      break;

    case DIRECTION_DOWN:
      transform = "translate(0, 500) rotate(270)";
      break;

    case DIRECTION_NONE:
    default:
      return null;
  }

  return (
    <g>
      <defs>
        <linearGradient id="react-svg-pan-zoom-gradient1" x1="0%" y1="0%" x2="100%" y2="0%" spreadMethod="pad">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0.5"/>
        </linearGradient>

        <mask id="react-svg-pan-zoom-mask1" x="0" y="0" width="20" height="500">
          <rect x="0" y="0" width="20" height="500" style={{stroke: "none", fill: "url(#react-svg-pan-zoom-gradient1)"}}/>
        </mask>
      </defs>

      <rect x="0" y="0" width="20" height="500" style={{stroke: "none", fill: "#000", mask: "url(#react-svg-pan-zoom-mask1)"}}
            transform={transform}/>
    </g>
  );


}
