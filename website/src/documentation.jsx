import React, {PropTypes} from 'react';
import Remarkable from 'remarkable';
import Prism from 'prismjs';

import README from '../../README.md';

let md = new Remarkable({
  highlight: function (code, lang) {
    if (lang == 'sh')return code;
    return Prism.highlight(code, Prism.languages.javascript);
  }
});

let rendered = README
  .replace(/<!-- START_NO_WEB -->[\w\W]*<!-- END_NO_WEB -->/, '')
  .replace(/\.\//g, 'https://github.com/chrvadala/react-svg-pan-zoom/tree/master/');

rendered = md.render(rendered);
let html = `<div>${rendered}</div>`;

export default function Documentation() {
  return (<div className="container"
               dangerouslySetInnerHTML={{__html: html}}></div>);
}
