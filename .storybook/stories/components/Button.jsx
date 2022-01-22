import React from "react";

const STYLE_BUTTON = {
  fontFamily: 'courier',
  margin: "0rem 0.2rem 0.2rem",
  padding: "0.1rem",
  border: "1px solid black",
  background: "#000",
  color: "#0f0",
  cursor: "pointer"
};

export default ({onClick, children}) => (
  <button
    type="button"
    style={STYLE_BUTTON}
    onClick={onClick}>{children}</button>
)
