import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
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
  TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT
} from "../../src";
import Button from "./components/Button";
import HR from "./components/HR";
import withToolSelector from "./decorators/withToolSelector";
import withNestedProps from "./decorators/withNestedProps";

export default {
  title: 'StandardViewer',
  component: ReactSVGPanZoom,
  decorators: [withToolSelector, withNestedProps],
  argTypes: {
    tool: {control: {disable: true}},
    value: {control: {disable: true}},
    customMiniature: {control: {disable: true}},
    customToolbar: {control: {disable: true}},
    children: {control: {disable: true}},

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

    "toolbarProps.position": {
      control: {type: 'select', options: [POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT]},
    },
    "toolbarProps.SVGAlignX": {
      control: {type: 'select', options: [ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT, ALIGN_COVER]},
    },
    "toolbarProps.SVGAlignY": {
      control: {type: 'select', options: [ALIGN_TOP, ALIGN_CENTER, ALIGN_BOTTOM, ALIGN_COVER]},
    },
    "toolbarProps.activeToolColor": {
      control: {type: 'color'},
    },
    "miniatureProps.position": {
      control: {type: 'select', options: [POSITION_NONE, POSITION_RIGHT, POSITION_LEFT]},
    },
    "miniatureProps.background": {
      control: {type: 'color'},
    },
    "miniatureProps.width": {
      control: {type: 'number', min: 1},
    },
    "miniatureProps.height": {
      control: {type: 'number', min: 1},
    },
  }
}

const Template = (args) => {
  const Viewer = useRef(null);

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
    <ReactSVGPanZoom ref={Viewer} {...args}>
      <svg width={1440} height={1440}>
        <Snake/>
      </svg>
    </ReactSVGPanZoom>
  )
}

export const Primary = Template.bind({});
Primary.args = {
  width: 400,
  height: 400,
}

const TemplateMultiMeasures = ({viewerWidth, viewerHeight, svgWidth, svgHeight, ...args}) => {
  const Viewer = useRef(null);

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
    <ReactSVGPanZoom ref={Viewer} {...args}>
      <svg width={svgWidth} height={svgHeight}>
        <rect x="20" y="20" width={svgWidth - 40} height={svgHeight - 40} fill="blue" stroke="black"/>
        <text x="20" y="15">{svgWidth}x{svgHeight}</text>
      </svg>
    </ReactSVGPanZoom>
  )
}

export const Square = TemplateMultiMeasures.bind({})
Square.args = {width: 400, height: 400, svgWidth: 300, svgHeight: 300}

export const Rect1 = TemplateMultiMeasures.bind({})
Rect1.args = {width: 600, height: 400, svgWidth: 300, svgHeight: 600}

export const Rect2 = TemplateMultiMeasures.bind({})
Rect2.args = {width: 600, height: 400, svgWidth: 600, svgHeight: 300}

export const Rect3 = TemplateMultiMeasures.bind({})
Rect3.args = {width: 400, height: 600, svgWidth: 300, svgHeight: 600}

export const Rect4 = TemplateMultiMeasures.bind({})
Rect4.args = {width: 400, height: 600, svgWidth: 600, svgHeight: 300}


export const Methods = (args) => {
  const Viewer = useRef(null);

  const changeTool = nextTool => args.onChangeTool(nextTool)

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
    <>
      <div>
        <Button onClick={event => Viewer.current.fitToViewer()}>.fitToViewer()
        </Button>

        <Button onClick={event => Viewer.current.reset()}>.reset()
        </Button>

        <Button onClick={event => Viewer.current.fitSelection(725, 40, 200, 120)}>.fitSelection(725, 40, 200, 120)
        </Button>

        <Button onClick={event => Viewer.current.zoomOnViewerCenter(1.1)}>.zoomOnViewerCenter(1.1)
        </Button>

        <Button onClick={event => Viewer.current.zoomOnViewerCenter(0.9)}>.zoomOnViewerCenter(0.9)}
        </Button>

        <Button onClick={event => Viewer.current.setPointOnViewerCenter(525, 780, 2)}>.setPointOnViewerCenter(525, 780,
          2)
        </Button>

        <Button onClick={event => Viewer.current.pan(0, -100)}>.pan(0, -100)
        </Button>

        <Button onClick={event => Viewer.current.pan(100, 0)}>.pan(100, 0)
        </Button>

        <Button onClick={event => Viewer.current.pan(0, 100)}>.pan(0, 100)
        </Button>

        <Button onClick={event => Viewer.current.pan(-100, 0)}>.pan(-100, 0)
        </Button>
      </div>

      <HR/>

      <div>

        <Button onClick={event => changeTool(TOOL_AUTO)}>.changeTool(TOOL_AUTO)
        </Button>
        <Button onClick={event => changeTool(TOOL_NONE)}>.changeTool(TOOL_NONE)
        </Button>
        <Button onClick={event => changeTool(TOOL_PAN)}>.changeTool(TOOL_PAN)
        </Button>
        <Button onClick={event => changeTool(TOOL_ZOOM_IN)}>.changeTool(TOOL_ZOOM_IN)
        </Button>
        <Button onClick={event => changeTool(TOOL_ZOOM_OUT)}>.changeTool(TOOL_ZOOM_OUT)
        </Button>
      </div>

      <HR/>

      <div>
        <Button onClick={event => Viewer.current.openMiniature()}>.openMiniature()
        </Button>
        <Button onClick={event => Viewer.current.closeMiniature()}>.closeMiniature()
        </Button>
      </div>

      <HR/>

      <ReactSVGPanZoom
        ref={Viewer}
        {...args}
      >
        <svg width={1440} height={1440}>
          <Snake/>
        </svg>
      </ReactSVGPanZoom>
    </>
  )
}

Methods.args = {
  width: 400,
  height: 400,
}

export const Resizable = (args) => {
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
      {...args}
    >
      <svg width={1440} height={1440}>
        <Snake/>
      </svg>
    </ReactSVGPanZoom>
  )
}

Resizable.decorators = [story => <div style={{height: '100%', margin: "-63px -14px -14px"}}>{story()}</div>]

