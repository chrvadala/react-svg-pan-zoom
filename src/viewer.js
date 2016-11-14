import React, {PropTypes} from 'react';

//common
import ViewerEvent from './viewer-event';

//features
import {pan} from './features/pan';
import {getDefaultValue, setViewerSize, setPointOnViewerCenter, reset} from './features/common';
import {onMouseDown, onMouseMove, onMouseUp, onWheel, onMouseEnterOrLeave, onInterval} from './features/interactions';
import {zoom, fitSelection, fitToViewer, zoomOnViewerCenter} from './features/zoom';

//ui
import cursor from './ui/cursor';
import BorderGradient from './ui/border-gradient';
import If from './ui/if';
import Selection from './ui/selection';
import ToolbarWrapper from './ui-toolbar/toolbar-wrapper';

import {
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  MODE_IDLE, MODE_PANNING, MODE_ZOOMING,
  POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT
} from './constants';

export default class ReactSVGPanZoom extends React.Component {

  constructor(props, context) {
    super(props, context);

    let {tool, value, width: viewerWidth, height: viewerHeight, children} = this.props;
    let {width: SVGWidth, height: SVGHeight} = children.props;

    this.state = {
      value: value ? value : getDefaultValue(viewerWidth, viewerHeight, SVGWidth, SVGHeight),
      tool: tool ? tool : TOOL_NONE
    };
    this.ViewerDOM = null;
  }

  componentWillReceiveProps(nextProps) {
    let value = this.getValue();
    if (value.viewerWidth !== nextProps.width || value.viewerHeight !== nextProps.height) {
      let nextValue = setViewerSize(value, nextProps.width, nextProps.height);
      this.setValue(nextValue);
    }
  }


  getValue() {
    return this.props.value ? this.props.value : this.state.value;
  }

  getTool() {
    return this.props.tool ? this.props.tool : this.state.tool;
  }

  setValue(nextValue) {
    this.setState({value: nextValue});
    if (this.props.onChangeValue) this.props.onChangeValue(nextValue);
  }

  pan(SVGDeltaX, SVGDeltaY) {
    let nextValue = pan(this.getValue(), SVGDeltaX, SVGDeltaY);
    this.setValue(nextValue);
  }

  zoom(SVGPointX, SVGPointY, scaleFactor) {
    let nextValue = zoom(this.getValue(), SVGPointX, SVGPointY, scaleFactor);
    this.setValue(nextValue);
  }

  fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
    let nextValue = fitSelection(this.getValue(), selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight);
    this.setValue(nextValue);
  }

  fitToViewer() {
    let nextValue = fitToViewer(this.getValue());
    this.setValue(nextValue);
  }

  zoomOnViewerCenter(scaleFactor) {
    let nextValue = zoomOnViewerCenter(this.getValue(), scaleFactor);
    this.setValue(nextValue);
  }

  setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
    let nextValue = setPointOnViewerCenter(this.getValue(), SVGPointX, SVGPointY, zoomLevel);
    this.setValue(nextValue);
  }

  reset() {
    let nextValue = reset(this.getValue());
    this.setValue(nextValue);
  }

  changeTool(tool) {
    this.setState({tool});
    if (this.props.onChangeTool) this.props.onChangeTool(tool);
  }

  handleEvent(event) {
    let {props: {onClick, onMouseMove, onMouseUp, onMouseDown}, state: {value}, ViewerDOM} = this;

    let eventsHandler = {
      click: onClick,
      mousemove: onMouseMove,
      mouseup: onMouseUp,
      mousedown: onMouseDown
    };

    if (this.getTool() !== TOOL_NONE) return;
    if (event.target === ViewerDOM) return;

    let onEventHandler = eventsHandler[event.type];
    if (!onEventHandler) return;

    onEventHandler(new ViewerEvent(event, value, ViewerDOM));
  }


  componentDidMount() {
    let {props, state} = this;
    if (props.onChangeValue) props.onChangeValue(state.value);

    this.autoPanTimer = setInterval(()=> {
      let coords = {x: this.state.viewerX, y: this.state.viewerY};
      let nextValue = onInterval(null, this.ViewerDOM, this.getTool(), this.getValue(), this.props, coords);

      if (this.getValue() !== nextValue) {
        this.setValue(nextValue);
      }
    }, 200);
  }

  componentWillUnmount() {
    clearTimeout(this.autoPanTimer);
  }

  handleMouseDown(event) {
    let nextValue = onMouseDown(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);

    if (this.getValue() !== nextValue) {
      this.setValue(nextValue);
    }
  }

  handlerMouseMove(event) {
    let {left, top} = this.ViewerDOM.getBoundingClientRect();
    let x = event.clientX - Math.round(left);
    let y = event.clientY - Math.round(top);

    let nextValue = onMouseMove(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props, {x, y});

    if (this.getValue() !== nextValue) {
      this.setValue(nextValue);
    }
    this.setState({viewerX: x, viewerY: y});
  }

  handlerMouseUp(event) {
    let nextValue = onMouseUp(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);

    if (this.getValue() !== nextValue) {
      this.setValue(nextValue);
    }
  }

  handlerWheel(event) {
    let nextValue = onWheel(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);

    if (this.getValue() !== nextValue) {
      this.setValue(nextValue);
    }
  }

  handlerMouseEnterOrLeave(event) {
    let nextValue = onMouseEnterOrLeave(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);

    if (this.getValue() !== nextValue) {
      this.setValue(nextValue);
    }
  }

  render() {
    let {props, state: {viewerX, viewerY}} = this;
    let style = props.style;
    let tool = this.getTool();
    let value = this.getValue();

    if (tool === TOOL_PAN)
      style = {
        cursor: cursor(value.mode === MODE_PANNING ? 'grabbing' : 'grab'),
        ...style
      };


    if (tool === TOOL_ZOOM_IN)
      style = {
        cursor: 'zoom-in',
        ...style
      };


    if (tool === TOOL_ZOOM_OUT)
      style = {
        cursor: 'zoom-out',
        ...style
      };


    return (
      <div
        style={{position: "relative", width: value.viewerWidth, height: value.viewerHeight}}
        className={this.props.className}>
        <svg
          ref={ViewerDOM => this.ViewerDOM = ViewerDOM}
          width={value.viewerWidth}
          height={value.viewerHeight}
          style={style}
          onMouseDown={ event => {
            this.handleMouseDown(event);
            this.handleEvent(event);
          }}
          onMouseMove={ event => {
            this.handlerMouseMove(event);
            this.handleEvent(event);
          }}
          onMouseUp={ event => {
            this.handlerMouseUp(event);
            this.handleEvent(event);
          }}
          onClick={event => this.handleEvent(event)}
          onWheel={ event => this.handlerWheel(event)}
          onMouseEnter={ event => this.handlerMouseEnterOrLeave(event)}
          onMouseLeave={ event => this.handlerMouseEnterOrLeave(event)}>


          <rect
            fill={props.background}
            x={0}
            y={0}
            width={value.viewerWidth}
            height={value.viewerHeight}
            style={{pointerEvents: "none"}}
          />

          <g
            transform={`matrix(${value.a}, ${value.b}, ${value.c}, ${value.d}, ${value.e}, ${value.f})`}
            style={tool === TOOL_NONE ? {} : {pointerEvents: "none"}}>
            <rect
              fill={this.props.SVGBackground}
              x={0}
              y={0}
              width={value.SVGWidth}
              height={value.SVGHeight}/>
            <g>
              {props.children.props.children}
            </g>
          </g>

          <If condition={tool === TOOL_NONE && props.detectAutoPan && value.focus}>
            <g style={{pointerEvents: "none"}}>
              <If condition={viewerY <= 20}>
                <BorderGradient direction={POSITION_TOP} width={value.viewerWidth} height={value.viewerHeight}/>
              </If>

              <If condition={value.viewerWidth - viewerX <= 20}>
                <BorderGradient direction={POSITION_RIGHT} width={value.viewerWidth} height={value.viewerHeight}/>
              </If>

              <If condition={ value.viewerHeight - viewerY <= 20}>
                <BorderGradient direction={POSITION_BOTTOM} width={value.viewerWidth} height={value.viewerHeight}/>
              </If>

              <If condition={value.focus && viewerX <= 20}>
                <BorderGradient direction={POSITION_LEFT} width={value.viewerWidth} height={value.viewerHeight}/>
              </If>
            </g>
          </If>

          <If condition={value.mode === MODE_ZOOMING}>
            <Selection startX={value.startX} startY={value.startY} endX={value.endX} endY={value.endY}/>
          </If>
        </svg>

        <If condition={props.toolbarPosition !== POSITION_NONE}>
          <ToolbarWrapper
            position={props.toolbarPosition}
            value={value}
            onChangeValue={value => this.setValue(value)}
            tool={tool}
            onChangeTool={tool => this.changeTool(tool)}/>
        </If>
      </div>
    );
  }
}

ReactSVGPanZoom.propTypes = {
  //width of the viewer displayed on screen
  width: PropTypes.number.isRequired,

  //height of the viewer displayed on screen
  height: PropTypes.number.isRequired,

  //background of the viewer
  background: PropTypes.string,

  //background of the svg
  SVGBackground: PropTypes.string,

  //value of the viewer (current point of view)
  value: PropTypes.shape({
    version: PropTypes.oneOf([2]).isRequired,
    mode: PropTypes.oneOf([MODE_IDLE, MODE_PANNING, MODE_ZOOMING]).isRequired,
    focus: PropTypes.bool.isRequired,
    a: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    c: PropTypes.number.isRequired,
    d: PropTypes.number.isRequired,
    e: PropTypes.number.isRequired,
    f: PropTypes.number.isRequired,
    viewerWidth: PropTypes.number.isRequired,
    viewerHeight: PropTypes.number.isRequired,
    SVGWidth: PropTypes.number.isRequired,
    SVGHeight: PropTypes.number.isRequired,
    startX: PropTypes.number.isRequired,
    startY: PropTypes.number.isRequired,
    endX: PropTypes.number.isRequired,
    endY: PropTypes.number.isRequired,
  }),

  //CSS style of the Viewer
  style: PropTypes.object,

  //className of the Viewer
  className: PropTypes.string,

  //detect zoom operation performed trough pinch gesture or mouse scroll
  detectWheel: PropTypes.bool,

  //perform PAN if the mouse is on viewer border
  detectAutoPan: PropTypes.bool,

  //toolbar position
  toolbarPosition: PropTypes.oneOf([POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]),

  //handler something changed
  onChangeValue: PropTypes.func,

  //handler tool changed
  onChangeTool: PropTypes.func,

  //handler click
  onClick: PropTypes.func,

  //handler mouseup
  onMouseUp: PropTypes.func,

  //handler mousemove
  onMouseMove: PropTypes.func,

  //handler mousedown
  onMouseDown: PropTypes.func,

  //current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  tool: PropTypes.oneOf([TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT]),

  //accept only one node SVG
  children: function (props, propName, componentName) {
    // Only accept a single child, of the appropriate type
    //credits: http://www.mattzabriskie.com/blog/react-validating-children
    var prop = props[propName];
    var types = ['svg'];
    if (React.Children.count(prop) !== 1 ||
      types.indexOf(prop.type) === -1) {
      return new Error(
        '`' + componentName + '` ' +
        'should have a single child of the following types: ' +
        ' `' + types.join('`, `') + '`.'
      );
    }
    if (!prop.props.hasOwnProperty('width') || !prop.props.hasOwnProperty('height')) {
      return new Error('SVG should have props `width` and `height`');
    }

  }
};

ReactSVGPanZoom.defaultProps = {
  value: null,
  tool: null,
  style: {},
  background: "#616264",
  SVGBackground: "#fff",
  detectWheel: true,
  detectAutoPan: true,
  toolbarPosition: POSITION_RIGHT
};
