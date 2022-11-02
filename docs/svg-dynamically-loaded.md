# React SVG Pan Zoom - Getting Started

To load an SVG dynamically there's a standalone package (made in collaboration with [nufaylr](https://github.com/nufaylr)).
It's available here https://github.com/nufaylr/react-svg-pan-zoom-loader.

The full documentation is available here: [React SVG Pan Zoom Loader documentation](https://github.com/nufaylr/react-svg-pan-zoom-loader/blob/main/README.md)

```js
import {ReactSVGPanZoom} from 'react-svg-pan-zoom'
import {ReactSvgPanZoomLoader} from 'react-svg-pan-zoom-loader'

const Viewer = () => (
  <ReactSvgPanZoomLoader src="file/path/image.svg" render= {(content) => (
      <ReactSVGPanZoom width={500} height={500}>
          <svg width={500} height={500} >
              {content}
          </svg>  
      </ReactSVGPanZoom>
  )}/>
)
```

