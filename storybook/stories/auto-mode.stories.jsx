import React, {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {withKnobs, boolean, number, select} from '@kadira/storybook-addon-knobs';
import {noArgsDecorator, viewerTouchEventDecorator, viewerMouseEventDecorator} from './utils/actions-decorator';

import {
  ReactSVGPanZoom,
  TOOL_AUTO,
  POSITION_NONE, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_LEFT
} from '../../src/index';
import Snake from './fixtures/snake.svg';


class Story extends Component {
  constructor(props){
    super(props);
    this.Viewer = null;
  }

  componentDidMount(){
    this.Viewer.fitToViewer();
  }

  render() {
    return (
      <ReactSVGPanZoom
        width={400} height={400}
        ref={Viewer => this.Viewer = Viewer}

        tool={TOOL_AUTO}
        detectAutoPan={boolean('detectAutoPan', true)}
        detectWheel={boolean('detectWheel', true)}

        preventPanOutside={boolean('preventPanOutside', true)}
        toolbarPosition={POSITION_NONE}

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


const miniatureAvailablePositions = [POSITION_NONE, POSITION_RIGHT, POSITION_LEFT];

let stories = storiesOf('<ReactSVGPanZoom' + '>', module);
stories.addDecorator(withKnobs);

stories.add('Viewer with tool auto', () => (<Story/>));
