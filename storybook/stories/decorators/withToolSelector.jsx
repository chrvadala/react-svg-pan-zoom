import React, {useState} from "react";
import {TOOL_AUTO, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} from "../../../src";

export default (story, context) => {
  const [tool, onChangeTool] = useState(TOOL_NONE)
  const [value, onChangeValue] = useState({})

  const args = {
    ...context.args,
    tool, onChangeTool,
    value, onChangeValue
  }

  return (
    <>
      <div className="toolSelector" style={{marginBottom: "10px", background: "#fff", padding: "10px"}}>
        <label>Tool</label> {" "}
        <select value={tool} onChange={e => onChangeTool(e.target.value)}>
          <option value={TOOL_NONE}>{TOOL_NONE}</option>
          <option value={TOOL_AUTO}>{TOOL_AUTO}</option>
          <option value={TOOL_PAN}>{TOOL_PAN}</option>
          <option value={TOOL_ZOOM_IN}>{TOOL_ZOOM_IN}</option>
          <option value={TOOL_ZOOM_OUT}>{TOOL_ZOOM_OUT}</option>
        </select>
      </div>
      {story({args})}
    </>
  )
}
