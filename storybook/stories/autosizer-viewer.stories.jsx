import React from 'react';
import {storiesOf, action} from '@kadira/storybook';
import {noArgsDecorator, viewerTouchEventDecorator, viewerMouseEventDecorator} from './utils/actions-decorator';
import {AutoSizer} from 'react-virtualized';

const fullSize = {
  width: "100%",
  height: "100%",
};

import {
  ReactSVGPanZoom,
  POSITION_BOTTOM
} from '../../src/index';
import Snake from './fixtures/snake.svg';

let stories = storiesOf('<ReactSVGPanZoom' + '>', module);

stories.add('Autosizer viewer', () => (
  <div style={fullSize}>
    <AutoSizer>
      {({width, height}) =>
        <ReactSVGPanZoom
          width={(width || 100)} height={(height || 100)}

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
      }
    </AutoSizer>
  </div>
));
