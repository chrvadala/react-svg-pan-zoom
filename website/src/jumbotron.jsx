import React, {PropTypes} from 'react';

import esShield from '../images/es.svg';
import licenseShield from '../images/license.svg';
import reactVersionShield from '../images/react-version.svg';

const MEDIA_STYLE = `
  @media (max-width: 767px) {
    .jumbotron h1{ font-size: 2rem; }
   }
`;

export default function Jumbotron(props) {
  return (
    <div style={{marginTop: "0rem"}}>
      <style>{MEDIA_STYLE}</style>
      <div className="jumbotron" style={{backgroundColor: "#e7e7e7"}}>
        <h1 className="display-3 text-sm-center" style={{fontWeight: 100}}>react-svg-pan-zoom</h1>
        <p className="lead text-sm-center" style={{fontWeight: 100}}>
          A React component that adds pan and zoom features to SVG. It helps to
          display big SVG images in a small space.</p>
        <hr className="my-2"/>
        <p className="lead text-sm-center">

          <a href="https://www.npmjs.com/package/react-svg-pan-zoom">
            <img src="https://img.shields.io/npm/v/react-svg-pan-zoom.svg?maxAge=2592000?style=plastic" alt="npm"/>
          </a>
          &nbsp;
          <img src={esShield} alt="Javascript ES6"/>
          &nbsp;
          <img src={licenseShield} alt="license MIT"/>
          &nbsp;
          <img src={reactVersionShield} alt="React 15.0.0 or later"/>
          &nbsp;
          <iframe src="https://ghbtns.com/github-btn.html?user=chrvadala&repo=react-svg-pan-zoom&type=star&count=true"
                  className="align-middle"
                  frameBorder="0" scrolling="0" width="170px" height="20px" style={{border: "0rem"}}></iframe>

        </p>
      </div>
    </div>
  )
}
