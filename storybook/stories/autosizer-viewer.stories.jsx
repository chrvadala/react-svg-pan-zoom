import React, {Component} from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {noArgsDecorator, viewerTouchEventDecorator, viewerMouseEventDecorator} from './actions-decorator';
import {AutoSizer} from 'react-virtualized';

const fullSize = {
  width: "100%",
  height: "100%",
};

import {
  ReactSVGPanZoom,
  POSITION_BOTTOM
} from '../../src/index';
import Snake from './snake.svg';


class Story extends Component {
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

        toolbarPosition={POSITION_BOTTOM}

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

let stories = storiesOf('<ReactSVGPanZoom' + '>', module);

stories.add('Autosizer viewer', () => (
  <div style={fullSize}>
    <AutoSizer>
      {(({width, height}) => width === 0 || height === 0 ? null :
          <Story width={width} height={height}/>
      )}
    </AutoSizer>
  </div>
));
