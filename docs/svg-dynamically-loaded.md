# React SVG Pan Zoom - Dynamically Loading an SVG


## Using react-svg-pan-zoom-loader
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

## Using svg-parser and hast-to-hyperscript

If you are having trouble with using react-svg-pan-zoom-loader you may want to try this alternative method using [svg-parser](https://github.com/Rich-Harris/svg-parser) and [hast-to-hyperscript](https://github.com/syntax-tree/hast-to-hyperscript).

See [this CodeSandbox](https://codesandbox.io/s/stoic-voice-pc5jzx) to see it in action.

```js
import {parse as parseSVG} from 'svg-parser'
import {toH} from 'hast-to-hyperscript'

const Viewer = () => {
    const [svg, setSVG] = React.useState(<svg />)

    React.useEffect(() => {
        fetch('file/path/image.svg')
            .then((r) => r.text())
            .then((text) => {
                const hast = parseSVG(text)
                const element = toH(React.createElement, hast)
                setSVG(element)
            })
    }, [])

    return (
        <ReactSVGPanZoom width={500} height={500}>
            {svg}
        </ReactSVGPanZoom>
    )
}
```
