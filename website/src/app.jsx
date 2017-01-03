import React, {PropTypes} from 'react';
import GithubRibbon from './github-ribbon';
import Demo from './demo';
import Jumbotron from './jumbotron';
import Documentation from './documentation';

export default function App(props) {
  return (
    <div>
      <GithubRibbon/>
      <Jumbotron/>
      <Demo />
      <Documentation/>
    </div>);
}
