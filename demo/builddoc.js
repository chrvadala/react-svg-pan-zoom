const fs = require('fs');
const path = require('path');
const Remarkable = require('remarkable');


const README_FILE = path.join(__dirname, '../README.md');
const COMPONENT_FILE = path.join(__dirname, 'documentation.build.jsx');

let md = new Remarkable();
let readme = fs.readFileSync(README_FILE, 'utf8');

readme = readme.replace(/<!-- START_NO_WEB -->[\w\W]*<!-- END_NO_WEB -->/, '');
readme = readme.replace(/\.\//g, 'https://github.com/chrvadala/react-svg-pan-zoom/tree/master/');

let rendered = md.render(readme);

let component = `
import React from 'react';

let html = \`<div>${rendered}</div>\`;

export default function Documentation() {
  return (<div className="doc" dangerouslySetInnerHTML={{__html: html}}></div>);
}
`;

fs.writeFileSync(COMPONENT_FILE, component);
