import React, {Component} from 'react';
import {action} from '@storybook/addon-actions';
import {boolean, number, select} from '@storybook/addon-knobs';
import {noArgsDecorator, viewerMouseEventDecorator, viewerTouchEventDecorator} from './actions-decorator';

import {
  ALIGN_BOTTOM,
  ALIGN_CENTER,
  ALIGN_LEFT,
  ALIGN_RIGHT,
  ALIGN_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_NONE,
  POSITION_RIGHT,
  POSITION_TOP,
  ReactSVGPanZoom,
  TOOL_AUTO,
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
} from '../../src/index';
import Snake from './snake.svg';

const HAS_LOCAL_STORAGE = window.localStorage !== undefined;

export default class MainStory extends Component {
  constructor(props) {
    super(props);
    this.Viewer = null;
    this.state = {
      tool: TOOL_NONE,
      value: {},
      logValueOnConsole: false
    }
  }

  componentWillMount() {
    if (HAS_LOCAL_STORAGE && window.localStorage.logValueOnConsole)
      this.setState({
        logValueOnConsole: JSON.parse(window.localStorage.logValueOnConsole)
      })
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  changeLogValueOnConsole(e) {
    let logValueOnConsole = e.target.checked;
    this.setState({logValueOnConsole});
    if (HAS_LOCAL_STORAGE)
      window.localStorage.logValueOnConsole = JSON.stringify(logValueOnConsole);
  }

  render() {
    return (
      <div>
        <div style={{marginBottom: "10px", background: "#fff", padding: "10px"}}>
          <label>Tool</label> {" "}
          <select value={this.state.tool} onChange={e => this.setState({tool: e.target.value})}>
            <option value={TOOL_NONE}>{TOOL_NONE}</option>
            <option value={TOOL_AUTO}>{TOOL_AUTO}</option>
            <option value={TOOL_PAN}>{TOOL_PAN}</option>
            <option value={TOOL_ZOOM_IN}>{TOOL_ZOOM_IN}</option>
            <option value={TOOL_ZOOM_OUT}>{TOOL_ZOOM_OUT}</option>
          </select>
          {" - "}
          <label>Log on console (slow)</label>{" "}
          <input type="checkbox" checked={this.state.logValueOnConsole}
                 onChange={e => this.changeLogValueOnConsole(e)}/>
        </div>

        <ReactSVGPanZoom
          width={400} height={400}
          ref={Viewer => this.Viewer = Viewer}
          scaleFactor={number('scaleFactor', 1.1)}
          scaleFactorOnWheel={number('scaleFactorOnWheel', 1.1)}
          // SVGStyle={{stroke: "#fcc", strokeWidth: 20}}
          tool={this.state.tool}
          onChangeTool={tool => {
            action('onChangeTool')(tool)
            this.setState({tool})
          }}

          value={this.state.value}
          onChangeValue={value => {
            if (this.state.logValueOnConsole) {
              // action('onChangeValue')(value);
              console.info(value);
            }
            this.setState({value})
          }}

          onZoom={value => console.info('onZoom')}
          onPan={value => console.info('onPan')}

          detectAutoPan={boolean('detectAutoPan', true)}
          detectWheel={boolean('detectWheel', true)}
          detectPinchGesture={boolean('detectPinchGesture', true)}

          preventPanOutside={boolean('preventPanOutside', true)}
          toolbarPosition={select('toolbarPosition', {
            [POSITION_NONE]: POSITION_NONE,
            [POSITION_TOP]: POSITION_TOP,
            [POSITION_RIGHT]: POSITION_RIGHT,
            [POSITION_BOTTOM]: POSITION_BOTTOM,
            [POSITION_LEFT]: POSITION_LEFT,
            [POSITION_RIGHT]: POSITION_RIGHT,
          }, POSITION_RIGHT)}

          miniaturePosition={select('miniaturePosition', {
            [POSITION_NONE]: POSITION_NONE,
            [POSITION_RIGHT]: POSITION_RIGHT,
            [POSITION_LEFT]: POSITION_LEFT,
          }, POSITION_LEFT)}
          miniatureWidth={number('miniatureWidth', 100)}

          disableDoubleClickZoomWithToolAuto={boolean('disableDoubleClickZoomWithToolAuto', false)}

          onMouseDown={viewerMouseEventDecorator('onMouseDown')}
          onClick={viewerMouseEventDecorator('onClick')}
          onMouseMove={noArgsDecorator('onMouseMove')}
          onMouseUp={viewerMouseEventDecorator('onMouseUp')}
          onDoubleClick={viewerMouseEventDecorator('onDoubleClick')}

          onTouchStart={viewerTouchEventDecorator('onTouchStart')}
          onTouchMove={noArgsDecorator('onTouchMove')}
          onTouchEnd={viewerTouchEventDecorator('onTouchEnd')}

          scaleFactorMin={number('scaleFactorMin', 0)}
          scaleFactorMax={number('scaleFactorMax', 999999)}

          toolbarProps={{
            SVGAlignX: select('toolbarProps.SVGAlignX', {
              [ALIGN_LEFT]: ALIGN_LEFT,
              [ALIGN_CENTER]: ALIGN_CENTER,
              [ALIGN_RIGHT]: ALIGN_RIGHT
            }, ALIGN_LEFT),
            SVGAlignY: select('toolbarProps.SVGAlignY', {
              [ALIGN_TOP]: ALIGN_TOP,
              [ALIGN_CENTER]: ALIGN_CENTER,
              [ALIGN_BOTTOM]: ALIGN_BOTTOM
            }, ALIGN_TOP),
          }}
        >

          <svg width={1440} height={1440}>
            <Snake/>
          </svg>
        </ReactSVGPanZoom>
      </div>
    )
  }
}
