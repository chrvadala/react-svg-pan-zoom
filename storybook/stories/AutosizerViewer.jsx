import React, {Component} from 'react';
import {action} from '@storybook/addon-actions';
import {noArgsDecorator, viewerTouchEventDecorator, viewerMouseEventDecorator} from './actions-decorator';
import {AutoSizer} from 'react-virtualized';
import {boolean, number, select} from '@storybook/addon-knobs';

import {
  ReactSVGPanZoom,
  POSITION_TOP
} from '../../src/index';
import Snake from './snake.svg';

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
      <ReactSVGPanZoom
        width={this.props.width} height={this.props.height}
        ref={Viewer => this.Viewer = Viewer}

        toolbarPosition={POSITION_TOP}
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
          <Snake />
        </svg>
      </ReactSVGPanZoom>
    )
  }
}
