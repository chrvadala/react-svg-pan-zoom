"use strict";

import React from 'react';
import {
  ReactSVGPanZoom,
  Toolbar,
  TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
  POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT,
} from '../../src/index';
import Snake from './snake.svg';

const STYLE_BUTTON = {
  margin: "0rem 0.1rem 0.2rem 0rem",
  width: "6rem"
};

export default class Demo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: null,
      tool: TOOL_NONE,
      x: 0,
      y: 0,
      detectAutoPan: true,
      detectWheel: true,
      toolbarPosition: POSITION_RIGHT,
      preventPanOutside: true,
      miniatureWidth: "",
      miniaturePosition: POSITION_LEFT,
    };

    this.Viewer = null;
  }

  componentDidMount() {
    this.Viewer.fitToViewer()
  }

  handlerChangeValue(value) {
    console.debug('onChangeValue', value);
    this.setState({value});
  }

  handlerChangeTool(tool) {
    console.debug('onChangeTool', tool);
    this.setState({tool});
  }

  handlerSetPosition(x, y) {

  }

  debugClick(event) {
    console.log('click', event);
    console.log('X', event.x);
    console.log('Y', event.y);
    console.log('scaleFactor', event.scaleFactor);
    console.log('translationX', event.translationX);
    console.log('translationY', event.translationY);
    console.log('SVGViewer', event.SVGViewer)
  }

  render() {
    return (
      <div className="container" style={{marginTop: "2rem", maxWidth: "46rem"}}>

        <div className="row">
          <div className="col-md-6" style={{marginBottom: "1rem"}}>

            <ReactSVGPanZoom
              className="react-svg-pan-zoom"
              width={330} height={330}
              ref={Viewer => this.Viewer = Viewer}

              value={this.state.value}
              onChangeValue={value => this.handlerChangeValue(value)}

              tool={this.state.tool}
              onChangeTool={tool => this.handlerChangeTool(tool)}

              toolbarPosition={this.state.toolbarPosition}

              detectWheel={this.state.detectWheel}
              detectAutoPan={this.state.detectAutoPan}
              preventPanOutside={this.state.preventPanOutside}

              onClick={event => this.debugClick(event)}
              onMouseMove={event => this.setState({x: event.x, y: event.y})}
              onMouseUp={event => console.info('up', event.x, event.y)}
              onMouseDown={event => console.info('down', event.x, event.y)}
              onDoubleClick={event => console.info('dblclick', event.x, event.y)}

              miniaturePosition={this.state.miniaturePosition}
              miniatureWidth={isNaN(parseFloat(this.state.miniatureWidth)) ? undefined : parseFloat(this.state.miniatureWidth)}

              onTouchStart={event => {
                event.preventDefault();
                console.info('touchstart', 'points' + event.points.map(({x, y, identifier}) => `${x} ${y} ${identifier}`))
              }}
              onTouchEnd={event => {
                event.preventDefault();
                console.info('touchend', 'changedPoints' + event.changedPoints.map(({x, y, identifier}) => `${x} ${y} ${identifier}`))
              }}
              onTouchMove={event => {
                event.preventDefault();
                this.handlerSetPosition(event.points[0].x, event.points[0].y)
              }}

              style={{outline: '1px solid black'}}
            >
              <svg width={ 1440 } height={ 1440 }>
                <Snake />
                <circle cx="525" cy="780" r="10" fill="yellow" onClick={event => alert('hi!')}/>
              </svg>
            </ReactSVGPanZoom>

            <p className="text-primary">Coords: {Number(this.state.x).toFixed(2)},{Number(this.state.y).toFixed(2)}</p>

          </div>

          <div className="col-md-6">
            <div>
              <h6>Additional features</h6>
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" checked={this.state.detectWheel}
                         name="detectWheel"
                         onChange={ event => this.setState({detectWheel: event.target.checked})}/> detectWheel
                </label>
              </div>

              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" checked={this.state.detectAutoPan}
                         name="detectAutoPan"
                         onChange={ event => this.setState({detectAutoPan: event.target.checked})}/> detectAutoPan
                </label>
              </div>

              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" checked={this.state.preventPanOutside}
                         name="preventPanOutside"
                         onChange={ event => this.setState({preventPanOutside: event.target.checked})}/>
                  preventPanOutside
                </label>
              </div>
            </div>

            <hr/>

            <div className="row">
              <div className="col-sm-6">
                <h6>Toolbar position</h6>
                <div className="form-group">
                  <select value={this.state.toolbarPosition} className="form-control" name="toolbarPosition"
                          onChange={ event => this.setState({toolbarPosition: event.target.value})}>
                    <option value={POSITION_NONE}>none</option>
                    <option value={POSITION_TOP}>top</option>
                    <option value={POSITION_RIGHT}>right</option>
                    <option value={POSITION_BOTTOM}>bottom</option>
                    <option value={POSITION_LEFT}>left</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <h6>Tool</h6>
                <div className="form-group">
                  <select value={this.state.tool} className="form-control" name="tool"
                          onChange={ event => this.setState({tool: event.target.value})}>
                    <option value={TOOL_AUTO}>auto</option>
                    <option value={TOOL_NONE}>none</option>
                    <option value={TOOL_PAN}>pan</option>
                    <option value={TOOL_ZOOM_IN}>zoom in</option>
                    <option value={TOOL_ZOOM_OUT}>zoom out</option>
                  </select>
                </div>
              </div>
            </div>

            <hr/>

            <h6>Miniature</h6>

            <div className="row">
              <div className="col-sm-6">
                <h6>Position</h6>
                <div className="form-group">
                  <select value={this.state.miniaturePosition} className="form-control" name="miniaturePosition"
                          onChange={ event => this.setState({miniaturePosition: event.target.value})}>
                    <option value={POSITION_NONE}>none</option>
                    <option value={POSITION_RIGHT}>right</option>
                    <option value={POSITION_LEFT}>left</option>
                  </select>
                </div>
              </div>

              <div className="col-sm-6">
                <h6>Width <span
                  className="text-muted"> ({isNaN(parseFloat(this.state.miniatureWidth)) ? 'default' : parseFloat(this.state.miniatureWidth)})</span>
                </h6>
                <div className="form-group">
                  <input type="text" value={this.state.miniatureWidth} className="form-control" name="miniatureWidth"
                         onChange={ event => this.setState({miniatureWidth: event.target.value})}/>
                </div>
              </div>
            </div>

            <hr/>

            <div>
              <h6>Programmatically perform actions</h6>

              <div>
                <button type="button" className="btn btn-primary btn-sm" style={STYLE_BUTTON} name="fit-btn"
                        onClick={event => this.Viewer.fitToViewer()}>
                  Fit to viewer
                </button>

                <button type="button" className="btn btn-primary btn-sm" style={STYLE_BUTTON} name="reset-btn"
                        onClick={event => this.Viewer.reset()}>
                  Reset
                </button>

                <button type="button" className="btn btn-primary btn-sm" style={STYLE_BUTTON} name="zoom-area-btn"
                        onClick={event => this.Viewer.fitSelection(725, 40, 200, 120)}>
                  Zoom area
                </button>

                <button type="button" className="btn btn-primary btn-sm" style={STYLE_BUTTON} name="zoom-in-btn"
                        onClick={event => this.Viewer.zoomOnViewerCenter(1.1)}>
                  Zoom in
                </button>

                <button type="button" className="btn btn-primary btn-sm" style={STYLE_BUTTON} name="zoom-out-btn"
                        onClick={event => this.Viewer.zoomOnViewerCenter(0.9)}>
                  Zoom out
                </button>

                <button type="button" className="btn btn-primary btn-sm" style={STYLE_BUTTON} name="zoom-point-btn"
                        onClick={event => this.Viewer.setPointOnViewerCenter(525, 780, 2)}>
                  Zoom point
                </button>

                <button type="button" className="btn btn-primary btn-sm" style={STYLE_BUTTON} name="zoom-pan-top-btn"
                        onClick={event => this.Viewer.pan(0, -100)}>
                  Pan top
                </button>

                <button type="button" className="btn btn-primary btn-sm" style={STYLE_BUTTON} name="zoom-pan-right-btn"
                        onClick={event => this.Viewer.pan(100, 0)}>
                  Pan right
                </button>

                <button type="button" className="btn btn-primary btn-sm" style={STYLE_BUTTON} name="zoom-pan-bottom-btn"
                        onClick={event => this.Viewer.pan(0, 100)}>
                  Pan bottom
                </button>

                <button type="button" className="btn btn-primary btn-sm" style={STYLE_BUTTON} name="zoom-pan-left-btn"
                        onClick={event => this.Viewer.pan(-100, 0)}>
                  Pan left
                </button>
              </div>


              <div style={{marginBottom: "3px"}}>
                <div>Select tool:</div>

                <button type="button" className="btn btn-outline-primary btn-sm" style={STYLE_BUTTON}
                        name="select-tool-auto-btn"
                        onClick={event => this.Viewer.changeTool(TOOL_AUTO)}> auto
                </button>

                <button type="button" className="btn btn-outline-primary btn-sm" style={STYLE_BUTTON}
                        name="select-tool-none-btn"
                        onClick={event => this.Viewer.changeTool(TOOL_NONE)}> none
                </button>

                <button type="button" className="btn btn-outline-primary btn-sm" style={STYLE_BUTTON}
                        name="select-tool-pan-btn"
                        onClick={event => this.Viewer.changeTool(TOOL_PAN)}> pan
                </button>

                <button type="button" className="btn btn-outline-primary btn-sm" style={STYLE_BUTTON}
                        name="select-tool-zoom-in-btn"
                        onClick={event => this.Viewer.changeTool(TOOL_ZOOM_IN)}> zoom in
                </button>

                <button type="button" className="btn btn-outline-primary btn-sm" style={STYLE_BUTTON}
                        name="select-tool-zoom-out-btn"
                        onClick={event => this.Viewer.changeTool(TOOL_ZOOM_OUT)}> zoom out
                </button>
              </div>

              <div style={{marginBottom: "3px"}}>
                <div>Miniature:</div>

                <button type="button" className="btn btn-outline-primary btn-sm" style={STYLE_BUTTON}
                        name="select-tool-auto-btn"
                        onClick={event => this.Viewer.openMiniature()}> open
                </button>

                <button type="button" className="btn btn-outline-primary btn-sm" style={STYLE_BUTTON}
                        name="select-tool-none-btn"
                        onClick={event => this.Viewer.closeMiniature()}> close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
