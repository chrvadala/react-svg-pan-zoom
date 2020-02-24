import React from 'react';
import PropTypes from 'prop-types';

const style = {
  cursor: "pointer",
  fill: "black",
  fillOpacity: 0.2
};

export default class Scrollbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isMouseDown: false,
      lastMousePosition: {
        x: 0,
        y: 0
      }
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('mousemove', this.onMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseDown(event) {
    event.stopPropagation();
    const {pageX, pageY} = event;
    this.setState({isMouseDown: true, lastMousePosition: {x: pageX, y: pageY }});
    return false;
  }

  onMouseMove(event) {
    if(!this.state.isMouseDown)
      return;
    event.stopPropagation();
    const {pageX, pageY} = event;
    const {isVertical, onScroll} = this.props;
    const {lastMousePosition} = this.state;

    onScroll({value: isVertical ? pageY - lastMousePosition.y : pageX - lastMousePosition.x});

    this.setState({lastMousePosition: {x: pageX, y: pageY }});
  }

  onMouseUp(event) {
    if(!this.state.isMouseDown)
      return;
    event.stopPropagation();
    this.setState({isMouseDown: false});
  }
  render() {
    const {onMouseDown} = this;
    const {x, y, width, height} = this.props;
    return <rect
      onMouseDown={onMouseDown}
      rx="2"
      style={style}
      x={x}
      y={y}
      width={width}
      height={height}
    />
  }
}

Scrollbar.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onScroll: PropTypes.func.isRequired,
  isVertical: PropTypes.bool
};

Scrollbar.defaultProps = {
  isVertical: true
};
