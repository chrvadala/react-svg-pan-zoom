import React from 'react';
import Remarkable from 'remarkable'

import Readme from '../../README.md';

const md = new Remarkable({
  html:         false,
  xhtmlOut:     true,
  breaks:       false,
  linkify:      true,
});

let html = Readme
  html = html.replace(/<!-- BEGIN_SECTION_SKIPPED_ONLINE -->[\w\W]*<!-- END_SECTION_SKIPPED_ONLINE -->/g, '')
  html = md.render(html)
  html = html.replace(/\.\//g, 'https://github.com/chrvadala/react-svg-pan-zoom/tree/master/')
  html = html.replace(/<a/g, '<a target="_blank" ');

export default function Welcome(){
  return (
    <div style={{background: "#fff", padding: "1rem 2rem"}} className="markdown-body">
      <div dangerouslySetInnerHTML={{__html: html}}/>
    </div>
  )
}


