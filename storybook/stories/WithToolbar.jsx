import React, {Component} from 'react';
import {action} from '@storybook/addon-actions';
import {withKnobs, boolean, number, select} from '@storybook/addon-knobs';
import {noArgsDecorator, viewerTouchEventDecorator, viewerMouseEventDecorator} from './actions-decorator';

import {
  ReactSVGPanZoom,
  POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT
} from '../../src/index';
import Snake from './snake.svg';

const miniatureAvailablePositions = [POSITION_NONE, POSITION_RIGHT, POSITION_LEFT];
const toolbarAvailablePositions = [POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT];


export default class ViewerWithToolbar extends Component {
  constructor(props) {
    super(props);
    this.Viewer = null;
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  render() {
    return (
      <ReactSVGPanZoom
        width={400} height={400}
        ref={Viewer => this.Viewer = Viewer}

        detectAutoPan={boolean('detectAutoPan', true)}
        detectWheel={boolean('detectWheel', true)}

        preventPanOutside={boolean('preventPanOutside', true)}
        toolbarPosition={select('toolbarPosition', toolbarAvailablePositions, POSITION_RIGHT)}

        miniaturePosition={select('miniaturePosition', miniatureAvailablePositions, POSITION_LEFT)}
        miniatureWidth={number('miniatureWidth', 100)}


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
      </ReactSVGPanZoom>
    )
  }
}
