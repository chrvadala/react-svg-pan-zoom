import React, {Component, StrictMode} from 'react';
import {action} from '@storybook/addon-actions';
import {noArgsDecorator, viewerMouseEventDecorator, viewerTouchEventDecorator} from './actions-decorator';
import {AutoSizer} from 'react-virtualized';
import {boolean} from '@storybook/addon-knobs';

import {POSITION_BOTTOM, UncontrolledReactSVGPanZoom} from '../../src/index';
import Snake from './snake.svg';

const toolbarProps = {position: POSITION_BOTTOM}

export default class AutosizerViewer extends Component {
  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <AutoSizer>
          {(({width, height}) => width === 0 || height === 0 ? null :
              <Viewer width={width} height={height}/>
          )}
        </AutoSizer>
      </div>
    )
  }
}


class Viewer extends Component {
  constructor(props) {
    super(props);
    this.Viewer = null;
  }

  componentDidMount() {
    this.Viewer.fitToViewer();
  }

  render() {
    return (
      <StrictMode>
        <UncontrolledReactSVGPanZoom
          width={this.props.width} height={this.props.height}
          ref={Viewer => this.Viewer = Viewer}

          toolbarProps={toolbarProps}
          detectAutoPan={boolean('detectAutoPan', true)}
          detectWheel={boolean('detectWheel', true)}
          detectPinchGesture={boolean('detectPinchGesture', true)}

          preventPanOutside={boolean('preventPanOutside', true)}

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
            <Snake/>
          </svg>
        </UncontrolledReactSVGPanZoom>
      </StrictMode>
    )
  }
}
