import React from 'react';
import {storiesOf} from '@kadira/storybook';
import Remarkable from 'remarkable';
import Readme from '../../README.md';

let stories = storiesOf('<ReactSVGPanZoom' + '>', module);

let md = new Remarkable();
let text = Readme
  .replace(/<!-- START_NO_WEB:1 -->[\w\W]*<!-- END_NO_WEB:1 -->/, '')
  .replace(/<!-- START_NO_WEB:2 -->[\w\W]*<!-- END_NO_WEB:2 -->/, '')
  .replace(/\.\//g, 'https://github.com/chrvadala/react-svg-pan-zoom/tree/master/');

let html = md.render(text)
  .replace(/<a/g, '<a target="_blank" ');

stories
  .add('Welcome', () => (
    <div style={{background: "#fff", padding: "1rem 2rem"}} className="markdown-body">
      <div dangerouslySetInnerHTML={{__html: html}}/>
    </div>
  ))


