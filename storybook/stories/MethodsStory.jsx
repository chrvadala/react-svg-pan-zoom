import React, {StrictMode} from 'react';
import {action} from '@storybook/addon-actions';
import {noArgsDecorator, viewerTouchEventDecorator, viewerMouseEventDecorator} from './actions-decorator';

import {
  UncontrolledReactSVGPanZoom,
  TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT,
} from '../../src/index';
import Snake from './snake.svg';

const STYLE_BUTTON = {
  fontFamily: 'courier',
  margin: "0rem 0.2rem 0.2rem",
  padding: "0.1rem",
  border: "1px solid black",
  background: "#000",
  color: "#0f0",
  cursor: "pointer"
};

const HR_BUTTON = {
  borderTop: "0px",
  borderBottom: "1px solid #333"
}

export default class MethodsStory extends React.Component {
  constructor(props) {
    super(props)
    this.Viewer = null;
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  render() {
    return (
      <StrictMode>
        <div>
          <button type="button" style={STYLE_BUTTON} name="fit-btn"
                  onClick={event => this.Viewer.fitToViewer()}>.fitToViewer()
          </button>

          <button type="button" style={STYLE_BUTTON} name="reset-btn"
                  onClick={event => this.Viewer.reset()}>.reset()
          </button>

          <button type="button" style={STYLE_BUTTON} name="zoom-area-btn"
                  onClick={event => this.Viewer.fitSelection(725, 40, 200, 120)}>.fitSelection(725, 40, 200, 120)
          </button>

          <button type="button" style={STYLE_BUTTON} name="zoom-in-btn"
                  onClick={event => this.Viewer.zoomOnViewerCenter(1.1)}>.zoomOnViewerCenter(1.1)
          </button>

          <button type="button" style={STYLE_BUTTON} name="zoom-out-btn"
                  onClick={event => this.Viewer.zoomOnViewerCenter(0.9)}>.zoomOnViewerCenter(0.9)}
          </button>

          <button type="button" style={STYLE_BUTTON} name="zoom-point-btn"
                  onClick={event => this.Viewer.setPointOnViewerCenter(525, 780, 2)}>.setPointOnViewerCenter(525, 780,
            2)
          </button>

          <button type="button" style={STYLE_BUTTON} name="zoom-pan-top-btn"
                  onClick={event => this.Viewer.pan(0, -100)}>.pan(0, -100)
          </button>

          <button type="button" style={STYLE_BUTTON} name="zoom-pan-right-btn"
                  onClick={event => this.Viewer.pan(100, 0)}>.pan(100, 0)
          </button>

          <button type="button" style={STYLE_BUTTON} name="zoom-pan-bottom-btn"
                  onClick={event => this.Viewer.pan(0, 100)}>.pan(0, 100)
          </button>

          <button type="button" style={STYLE_BUTTON} name="zoom-pan-left-btn"
                  onClick={event => this.Viewer.pan(-100, 0)}>.pan(-100, 0)
          </button>
        </div>

        <hr style={HR_BUTTON}/>

        <div>

          <button type="button" style={STYLE_BUTTON} name="select-tool-auto-btn"
                  onClick={event => this.Viewer.changeTool(TOOL_AUTO)}>.changeTool(TOOL_AUTO)
          </button>
          <button type="button" style={STYLE_BUTTON} name="select-tool-none-btn"
                  onClick={event => this.Viewer.changeTool(TOOL_NONE)}>.changeTool(TOOL_NONE)
          </button>
          <button type="button" style={STYLE_BUTTON} name="select-tool-pan-btn"
                  onClick={event => this.Viewer.changeTool(TOOL_PAN)}>.changeTool(TOOL_PAN)
          </button>
          <button type="button" style={STYLE_BUTTON} name="select-tool-zoom-in-btn"
                  onClick={event => this.Viewer.changeTool(TOOL_ZOOM_IN)}>.changeTool(TOOL_ZOOM_IN)
          </button>
          <button type="button" style={STYLE_BUTTON} name="select-tool-zoom-out-btn"
                  onClick={event => this.Viewer.changeTool(TOOL_ZOOM_OUT)}>.changeTool(TOOL_ZOOM_OUT)
          </button>
        </div>

        <hr style={HR_BUTTON}/>

        <div>
          <button type="button" style={STYLE_BUTTON} name="select-tool-auto-btn"
                  onClick={event => this.Viewer.openMiniature()}>.openMiniature()
          </button>
          <button type="button" style={STYLE_BUTTON} name="select-tool-none-btn"
                  onClick={event => this.Viewer.closeMiniature()}>.closeMiniature()
          </button>
        </div>

        <hr style={HR_BUTTON}/>

        <UncontrolledReactSVGPanZoom
          width={400} height={400}

          ref={Viewer => this.Viewer = Viewer}

          onClick={viewerMouseEventDecorator('onClick')}
          onMouseMove={noArgsDecorator('onMouseMove')}
          onMouseUp={viewerMouseEventDecorator('onMouseUp')}
          onMouseDown={viewerMouseEventDecorator('onMouseDown')}
          onDoubleClick={viewerMouseEventDecorator('onDoubleClick')}

          onTouchStart={viewerTouchEventDecorator('onTouchStart')}
          onTouchMove={noArgsDecorator('onTouchMove')}
          onTouchEnd={viewerTouchEventDecorator('onTouchEnd')}

          onChangeValue={noArgsDecorator('onChangeValue')}
          onChangeTool={action('onChangeTool')}>

          <svg width={1440} height={1440}>
            <Snake />
          </svg>
        </UncontrolledReactSVGPanZoom>
      </StrictMode>
    )
  }
}
