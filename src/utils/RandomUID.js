import React from "react";
import getDisplayName from "./getDisplayName";

let uid = 1;
const nextUID = () => `uid${uid++}`;

export default function RandomUID(WrappedComponent) {
  class RandomUID extends React.Component {
    constructor(props) {
      super(props)
      this.state = {uid: nextUID()}
    }

    render() {
      return <WrappedComponent _uid={this.state.uid} {...this.props}/>
    }
  }

  RandomUID.displayName = `RandomUID(${getDisplayName(WrappedComponent)})`;

  return RandomUID;
}
