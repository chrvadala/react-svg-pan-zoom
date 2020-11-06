import React, {StrictMode, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {withKnobs, boolean, number, select, color} from '@storybook/addon-knobs';
import ReactSVGPanZoom from '../../src/viewer';
import Snake from './components/Snake.svg'
import {useWindowSize} from '@react-hook/window-size'
import {
  ALIGN_BOTTOM,
  ALIGN_CENTER, ALIGN_COVER,
  ALIGN_LEFT, ALIGN_RIGHT, ALIGN_TOP,
  POSITION_BOTTOM,
  POSITION_LEFT,
  POSITION_NONE,
  POSITION_RIGHT,
  POSITION_TOP,
  TOOL_AUTO,
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, UncontrolledReactSVGPanZoom
} from "../../src";
import {action} from "@storybook/addon-actions";
import Button from "./components/Button";
import HR from "./components/HR";
import ToolSelector from "./components/ToolSelector";

export default {
  title: 'StandardViewer',
  component: ReactSVGPanZoom,
  decorators: [withKnobs],
  argTypes: {
    onClick: {action: 'onClick'},
    onDoubleClick: {action: 'onDoubleClick'},

    // onZoom: {action: 'onZoom'},  //disabled due to storybook performance issues
    // onPan: {action: 'onPan'},    //disabled due to storybook performance issues

    onMouseUp: {action: 'onMouseUp'},
    // onMouseMove: {action: 'onMouseMove'},   //disabled due to storybook performance issues
    onMouseDown: {action: 'onMouseDown'},

    onTouchStart: {action: 'onTouchStart'},
    // onTouchMove: {action: 'onTouchMove'},   //disabled due to storybook performance issues
    onTouchEnd: {action: 'onTouchEnd'},
  }
}

const Template = ({svgArgs, ...args}) => {
  const Viewer = useRef(null);
  const [tool, onChangeTool] = useState(TOOL_NONE)
  const [value, onChangeValue] = useState({})

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
    <>
      <div style={{marginBottom: "10px", background: "#fff", padding: "10px"}}>
        <label>Tool</label> {" "}
        <select value={tool} onChange={e => onChangeTool(e.target.value)}>
          <option value={TOOL_NONE}>{TOOL_NONE}</option>
          <option value={TOOL_AUTO}>{TOOL_AUTO}</option>
          <option value={TOOL_PAN}>{TOOL_PAN}</option>
          <option value={TOOL_ZOOM_IN}>{TOOL_ZOOM_IN}</option>
          <option value={TOOL_ZOOM_OUT}>{TOOL_ZOOM_OUT}</option>
        </select>
      </div>
      <ReactSVGPanZoom
        width={400} height={400}
        ref={Viewer}
        value={value} onChangeValue={onChangeValue}
        tool={tool} onChangeTool={onChangeTool}

        scaleFactor={number('scaleFactor', 1.1)}
        scaleFactorOnWheel={number('scaleFactorOnWheel', 1.1)}

        detectAutoPan={boolean('detectAutoPan', true)}
        detectWheel={boolean('detectWheel', true)}
        detectPinchGesture={boolean('detectPinchGesture', true)}

        preventPanOutside={boolean('preventPanOutside', true)}

        disableDoubleClickZoomWithToolAuto={boolean('disableDoubleClickZoomWithToolAuto', false)}

        scaleFactorMin={number('scaleFactorMin', 0)}
        scaleFactorMax={number('scaleFactorMax', 999999)}

        toolbarProps={{
          position: select('toolbarProps.position', {
            [POSITION_NONE]: POSITION_NONE,
            [POSITION_TOP]: POSITION_TOP,
            [POSITION_RIGHT]: POSITION_RIGHT,
            [POSITION_BOTTOM]: POSITION_BOTTOM,
            [POSITION_LEFT]: POSITION_LEFT,
            [POSITION_RIGHT]: POSITION_RIGHT,
          }, POSITION_RIGHT),

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

          activeToolColor: color('toolbarProps.activeToolColor', '#1CA6FC'),
        }}

        miniatureProps={{
          position: select('miniatureProps.position', {
            [POSITION_NONE]: POSITION_NONE,
            [POSITION_RIGHT]: POSITION_RIGHT,
            [POSITION_LEFT]: POSITION_LEFT,
          }, POSITION_LEFT),

          background: color('miniatureProps.color', '#616264'),
          width: number('miniatureProps.width', 100),
          height: number('miniatureProps.height', 80),
        }}

        {...args}
      >
        <svg width={1440} height={1440}>
          <Snake/>
        </svg>
      </ReactSVGPanZoom>
    </>
  )
}

export const Primary = Template.bind({});

const TemplateMultiMeasures = ({viewerWidth, viewerHeight, svgWidth, svgHeight}) => {
  const Viewer = useRef(null);
  const [tool, onChangeTool] = useState(TOOL_NONE)
  const [value, onChangeValue] = useState({})

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  const toolbarProps = useMemo(() => ({
    SVGAlignX: select('toolbarProps.SVGAlignX', {
      [ALIGN_LEFT]: ALIGN_LEFT,
      [ALIGN_CENTER]: ALIGN_CENTER,
      [ALIGN_RIGHT]: ALIGN_RIGHT,
      [ALIGN_COVER]: ALIGN_COVER,
    }, ALIGN_LEFT),
    SVGAlignY: select('toolbarProps.SVGAlignY', {
      [ALIGN_TOP]: ALIGN_TOP,
      [ALIGN_CENTER]: ALIGN_CENTER,
      [ALIGN_BOTTOM]: ALIGN_BOTTOM,
      [ALIGN_COVER]: ALIGN_COVER,
    }, ALIGN_TOP),
  }))

  return (
    <ReactSVGPanZoom
      width={viewerWidth} height={viewerHeight}
      ref={Viewer}
      toolbarProps={toolbarProps}
      value={value} onChangeValue={onChangeValue}
      tool={tool} onChangeTool={onChangeTool}
    >
      <svg width={svgWidth} height={svgHeight}>
        <rect x="20" y="20" width={svgWidth - 40} height={svgHeight - 40} fill="blue" stroke="black"/>
        <text x="20" y="15">{svgWidth}x{svgHeight}</text>
      </svg>
    </ReactSVGPanZoom>
  )
}

export const Square = TemplateMultiMeasures.bind()
Square.args = {viewerWidth: 400, viewerHeight: 400, svgWidth: 300, svgHeight: 300}

export const Rect1 = TemplateMultiMeasures.bind()
Rect1.args = {viewerWidth: 600, viewerHeight: 400, svgWidth: 300, svgHeight: 600}

export const Rect2 = TemplateMultiMeasures.bind()
Rect2.args = {viewerWidth: 600, viewerHeight: 400, svgWidth: 600, svgHeight: 300}

export const Rect3 = TemplateMultiMeasures.bind()
Rect3.args = {viewerWidth: 400, viewerHeight: 600, svgWidth: 300, svgHeight: 600}

export const Rect4 = TemplateMultiMeasures.bind()
Rect4.args = {viewerWidth: 400, viewerHeight: 600, svgWidth: 600, svgHeight: 300}


export const Methods = () => {
  const Viewer = useRef(null);
  const [tool, changeTool] = useState(TOOL_NONE)
  const [value, changeValue] = useState({})

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);


  return (
    <>
      <div>
        <ToolSelector tool={tool} changeTool={changeTool}/>

        <Button name="fit-btn"
                onClick={event => Viewer.current.fitToViewer()}>.fitToViewer()
        </Button>

        <Button name="reset-btn"
                onClick={event => Viewer.current.reset()}>.reset()
        </Button>

        <Button name="zoom-area-btn"
                onClick={event => Viewer.current.fitSelection(725, 40, 200, 120)}>.fitSelection(725, 40, 200, 120)
        </Button>

        <Button name="zoom-in-btn"
                onClick={event => Viewer.current.zoomOnViewerCenter(1.1)}>.zoomOnViewerCenter(1.1)
        </Button>

        <Button name="zoom-out-btn"
                onClick={event => Viewer.current.zoomOnViewerCenter(0.9)}>.zoomOnViewerCenter(0.9)}
        </Button>

        <Button name="zoom-point-btn"
                onClick={event => Viewer.current.setPointOnViewerCenter(525, 780, 2)}>.setPointOnViewerCenter(525, 780,
          2)
        </Button>

        <Button name="zoom-pan-top-btn"
                onClick={event => Viewer.current.pan(0, -100)}>.pan(0, -100)
        </Button>

        <Button name="zoom-pan-right-btn"
                onClick={event => Viewer.current.pan(100, 0)}>.pan(100, 0)
        </Button>

        <Button name="zoom-pan-bottom-btn"
                onClick={event => Viewer.current.pan(0, 100)}>.pan(0, 100)
        </Button>

        <Button name="zoom-pan-left-btn"
                onClick={event => Viewer.current.pan(-100, 0)}>.pan(-100, 0)
        </Button>
      </div>

      <HR/>

      <div>

        <Button name="select-tool-auto-btn"
                onClick={event => changeTool(TOOL_AUTO)}>.changeTool(TOOL_AUTO)
        </Button>
        <Button name="select-tool-none-btn"
                onClick={event => changeTool(TOOL_NONE)}>.changeTool(TOOL_NONE)
        </Button>
        <Button name="select-tool-pan-btn"
                onClick={event => changeTool(TOOL_PAN)}>.changeTool(TOOL_PAN)
        </Button>
        <Button name="select-tool-zoom-in-btn"
                onClick={event => changeTool(TOOL_ZOOM_IN)}>.changeTool(TOOL_ZOOM_IN)
        </Button>
        <Button name="select-tool-zoom-out-btn"
                onClick={event => changeTool(TOOL_ZOOM_OUT)}>.changeTool(TOOL_ZOOM_OUT)
        </Button>
      </div>

      <HR/>

      <div>
        <Button name="select-tool-auto-btn"
                onClick={event => Viewer.current.openMiniature()}>.openMiniature()
        </Button>
        <Button name="select-tool-none-btn"
                onClick={event => Viewer.current.closeMiniature()}>.closeMiniature()
        </Button>
      </div>

      <HR/>

      <ReactSVGPanZoom
        width={400} height={400}
        ref={Viewer}
        value={value} onChangeValue={changeValue}
        tool={tool} onChangeTool={changeTool}
      >
        <svg width={1440} height={1440}>
          <Snake/>
        </svg>
      </ReactSVGPanZoom>
    </>
  )
}

export const Resizable = () => {
  const Viewer = useRef(null);
  const [tool, onChangeTool] = useState(TOOL_NONE)
  const [value, onChangeValue] = useState({})
  const [width, height] = useWindowSize({initialWidth: 400, initialHeight: 400})

  useLayoutEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
    <ReactSVGPanZoom
      width={width} height={height}
      ref={Viewer}
      value={value} onChangeValue={onChangeValue}
      tool={tool} onChangeTool={onChangeTool}
    >
      <svg width={1440} height={1440}>
        <Snake/>
      </svg>
    </ReactSVGPanZoom>
  )
}

Resizable.decorators = [(Story) => <div style={{height: '100%', margin: -14}}><Story/></div>]
