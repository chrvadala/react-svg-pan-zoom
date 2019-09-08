import React, {useState} from "react";
import getDisplayName from "./getDisplayName";

let uid = 1;
const nextUID = () => `uid${uid++}`;

export default function RandomUID(WrappedComponent) {
  const RandomUID = (props) => {
    const [uid, setUID] = useState(nextUID())
    return <WrappedComponent _uid={uid} {...props}/>
  }

  RandomUID.displayName = `RandomUID(${getDisplayName(WrappedComponent)})`;

  return RandomUID;
}
