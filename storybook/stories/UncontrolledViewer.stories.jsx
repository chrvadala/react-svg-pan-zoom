import React, {useEffect, useRef} from "react";
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs';
import UncontrolledReactSVGPanZoom from '../../src/uncontrolled-viewer';
import Snake from './components/Snake.svg'
import {ReactSVGPanZoom} from "../../src";

export default {
  title: 'UncontrolledViewer',
  component: UncontrolledReactSVGPanZoom
};

const Template = args => {
  const Viewer = useRef(null);

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
    <UncontrolledReactSVGPanZoom width={400} height={400} {...args} ref={Viewer}>
      <svg width={1440} height={1440}>
        <Snake/>
      </svg>
    </UncontrolledReactSVGPanZoom>
  )
}

export const Primary = Template.bind({});
Primary.args = {
};
