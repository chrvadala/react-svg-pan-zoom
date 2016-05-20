"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import {SvgPanZoom} from '../index';

class Simple extends React.Component {
  render() {
    return (
      <div style={{margin:'100px'}}>
        <SvgPanZoom
          artboardWidth={400}
          artboardHeight={400}
          paperWidth={800}
          paperHeight={800}
          style={{border:'1px solid black'}}
        >

          <rect x="30" y="50" width="100" height="70" fill="black" />
          <circle cx="210" cy="120" r="50" fill="blue" />


        </SvgPanZoom>
      </div>

    );
  }
}


ReactDOM.render(
  React.createElement(Simple),
  document.getElementById('app')
);
