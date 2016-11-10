# Migrate From V1 to V2

If you are using *React SVG Pan Zoom* v1 you can migrate to v2 applying this changes

## Import
Change `import {Viewer} from 'react-svg-pan-zoom';`

with `import {ReactSVGPanZoom} from 'react-svg-pan-zoom';`

## Component name
Change `<Viewer> </Viewer>`

with `<ReactSVGPanZoom> </ReactSVGPanZoom>`

## Change handler
Change `onChange={event => this.setState({value: event.value})}`

with `onChangeValue={value => this.setState({value})}`

## Change wheel detection (if you are using it)
Change `detectPinch={true}`

with `detectWheel={true}`

[Working examples](../examples)
