import React from 'react'
import ReactDOM from 'react-dom'
import AppConnected from './AppConnected'
import './index.css'
import reducer from './reducer'
import {createStore} from 'redux';

let middlewares = window.devToolsExtension ? window.devToolsExtension() : f => f;
let store = createStore(reducer, null, middlewares);

ReactDOM.render(
  <AppConnected store={store}/>,
  document.getElementById('root')
);
