import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './demo';
import DemoResponsive from './demo-responsive';


ReactDOM.render(
  React.createElement(Demo),
  document.getElementById('demo')
);

ReactDOM.render(
  React.createElement(DemoResponsive),
  document.getElementById('demo-responsive')
);
