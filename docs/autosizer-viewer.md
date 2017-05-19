# Autosizer viewer

**React SVG Pan Zoom** requires the properties `width` and `height` to be set in order to work properly. 
If you need to automatically adapt the viewer size on the parent size you can use the component [AutoSizer](https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md).
This component is able to extract `width` and `height` from the parent box and pass these to a children component. 

## Example
```jsx harmony
<div style={{width: "100%", height: "100%"}}>
    <AutoSizer>
      {({width, height}) =>
        <ReactSVGPanZoom  width={(width || 100)} height={(height || 100)}>
          <svg width={1440} height={1440}>
            <-- put here your SVG content -->
          </svg>
        </ReactSVGPanZoom>
      }
    </AutoSizer>
  </div>
```
