# React SVG Pan Zoom - Migrate from V2 to V3

## Some props are now required.

React SVG Pan Zoom contains two different viewer: `ReactSVGPanZoom` and `UncontrolledReactSVGPanZoom`.

*ReactSVGPanZoom* is the preferred way to use this component. It works as a stateless component and, unlike the previous version, the following props are now required.

- `tool` - The tool actually used.  
- `onChangeTool(tool)` - An handler called when there's a tool change request.
- `value` - The actual camera view on the image (observer point of view).
- `onChangeValue(value)` - An handler called when the value is changed (may happens for different reasons).


You can thing to it as a React form input field.
```javascript
class MyViewer extends React.Component {
  state = {
    value:  {},
    tool: TOOL_NONE,
  }

  render() {
    return (
      <ReactSVGPanZoom
        width={200} height={400}
        tool={this.state.tool}
        onChangeTool={tool => this.setState({tool})}
        value={value}
        onChangeValue={value => this.setState({value})}
      >....</ReactSVGPanZoom>
    )
  }
}
```
If you don't need to handle tool and value in your code, just use the `UncontrolledReactSVGPanZoom` component that does this work for you.

To use it just replace:

```javascript
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
```
with
```javascript
import {UncontrolledReactSVGPanZoom} from 'react-svg-pan-zoom';
class MyViewer extends React.Component {
  render() {
    return (
      <UncontrolledReactSVGPanZoom
        width={200} height={400}
      >....</ReactSVGPanZoom>
    )
  }
}
```


## Toolbar and miniature props are now moved in two dedicated objects

Replace 

```javascript
<ReactSVGPanZoom 
    miniaturePosition="left"
    miniatureBackground="#fff"
    miniatureWidth={100}
    miniatureHeight={80}
    toolbarPosition="right"
/>
```

with
```javascript
const minitiatureProps= {
  miniaturePosition="left"
  miniatureBackground="#fff"
  miniatureWidth={100}
  miniatureHeight={80}
}

const toolbarProps = {
  toolbarPosition="right"
}

<ReactSVGPanZoom 
    toolbarProps={toolbarProps}
    miniatureProps={miniatureProps}
/>
```
