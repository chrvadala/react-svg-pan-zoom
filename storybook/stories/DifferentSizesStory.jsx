import React, {Component} from 'react';
import {select} from '@storybook/addon-knobs';

import {
  ReactSVGPanZoom,
  ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT, ALIGN_TOP, ALIGN_BOTTOM
} from '../../src/index';

export default class DifferentSizesStory extends Component {
  constructor(props) {
    super(props);
    this.Viewer1 = null;
    this.Viewer2 = null;
    this.Viewer3 = null;
    this.Viewer4 = null;
    this.Viewer5 = null;
  }

  componentDidMount() {
    this.Viewer1.fitToViewer()
    this.Viewer2.fitToViewer()
    this.Viewer3.fitToViewer()
    this.Viewer4.fitToViewer()
    this.Viewer5.fitToViewer()
  }

  render() {
    return (
      <div>
        <ReactSVGPanZoom
          width={600} height={400}
          detectAutoPan={false}
          toolbarProps={{
            SVGAlignX: select('toolbarProps.SVGAlignX', [ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT]),
            SVGAlignY: select('toolbarProps.SVGAlignY', [ALIGN_TOP, ALIGN_CENTER, ALIGN_BOTTOM]),
          }}
          ref={Viewer => this.Viewer1 = Viewer}
        >
          <svg width={300} height={600}>
            <rect x="20" y="20" width="260" height="560" fill="green" stroke="black"/>
            <text x="20" y="15">300x600</text>
          </svg>
        </ReactSVGPanZoom>

        <hr/>

        <ReactSVGPanZoom
          width={600} height={400}
          detectAutoPan={false}
          toolbarProps={{
            SVGAlignX: select('toolbarProps.SVGAlignX', [ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT]),
            SVGAlignY: select('toolbarProps.SVGAlignY', [ALIGN_CENTER, ALIGN_TOP, ALIGN_BOTTOM]),
          }}
          ref={Viewer => this.Viewer2 = Viewer}
        >
          <svg width={600} height={300}>
            <rect x="20" y="20" width="560" height="260" fill="red" stroke="black"/>
            <text x="20" y="15">600x300</text>
          </svg>
        </ReactSVGPanZoom>

        <hr/>

        <ReactSVGPanZoom
          width={400} height={600}
          detectAutoPan={false}
          toolbarProps={{
            SVGAlignX: select('toolbarProps.SVGAlignX', [ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT]),
            SVGAlignY: select('toolbarProps.SVGAlignY', [ALIGN_CENTER, ALIGN_TOP, ALIGN_BOTTOM]),
          }}
          ref={Viewer => this.Viewer3 = Viewer}
        >
          <svg width={300} height={600}>
            <rect x="20" y="20" width="260" height="560" fill="yellow" stroke="black"/>
            <text x="20" y="15">300x600</text>
          </svg>
        </ReactSVGPanZoom>

        <hr/>

        <ReactSVGPanZoom
          width={400} height={600}
          detectAutoPan={false}
          toolbarProps={{
            SVGAlignX: select('toolbarProps.SVGAlignX', [ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT]),
            SVGAlignY: select('toolbarProps.SVGAlignY', [ALIGN_CENTER, ALIGN_TOP, ALIGN_BOTTOM]),
          }}
          ref={Viewer => this.Viewer4 = Viewer}
        >
          <svg width={600} height={300}>
            <rect x="20" y="20" width="560" height="260" fill="blue" stroke="black"/>
            <text x="20" y="15">600x300</text>
          </svg>
        </ReactSVGPanZoom>

        <hr/>

        <ReactSVGPanZoom
          width={400} height={400}
          detectAutoPan={false}
          toolbarProps={{
            SVGAlignX: select('toolbarProps.SVGAlignX', [ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT]),
            SVGAlignY: select('toolbarProps.SVGAlignY', [ALIGN_CENTER, ALIGN_TOP, ALIGN_BOTTOM]),
          }}
          ref={Viewer => this.Viewer5 = Viewer}
        >
          <svg width={300} height={300}>
            <rect x="20" y="20" width="260" height="260" fill="blue" stroke="black"/>
            <text x="20" y="15">400x400</text>
          </svg>
        </ReactSVGPanZoom>
      </div>
    )
  }
}
