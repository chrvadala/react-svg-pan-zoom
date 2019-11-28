# react-svg-pan-zoom
**react-svg-pan-zoom** is a React component that adds **pan** and **zoom** features to the **SVG images**. It helps to display big SVG images in a small space.

[![chrvadala](https://img.shields.io/badge/website-chrvadala-orange.svg)](https://chrvadala.github.io)
[![Code](https://img.shields.io/badge/sources-GitHub-c9510c.svg)](https://github.com/chrvadala/react-svg-pan-zoom)
[![npm](https://img.shields.io/npm/v/react-svg-pan-zoom.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-svg-pan-zoom)
[![Downloads](https://img.shields.io/npm/dm/react-svg-pan-zoom.svg)](https://www.npmjs.com/package/react-svg-pan-zoom)
[![Donate](https://img.shields.io/badge/donate-PayPal-green.svg)](https://www.paypal.me/chrvadala/25)

<!-- BEGIN_SECTION_SKIPPED_ONLINE -->
[![react-svg-pan-zoom](https://raw.githubusercontent.com/chrvadala/react-svg-pan-zoom/master/react-svg-pan-zoom.gif)](http://chrvadala.github.io/react-svg-pan-zoom/)

## Live Demo
available at [http://chrvadala.github.io/react-svg-pan-zoom/](http://chrvadala.github.io/react-svg-pan-zoom/)
<!-- END_SECTION_SKIPPED_ONLINE -->

## Features
This component can work in four different modes depending on the selected tool:
- With the tool **pan** the user can move the image and drag it around within the viewer, but can't interact with SVG child elements.
- With the tool **zoom** the user can scale the image either with a point click or selecting a region to zoom the specified area, but can't interact with SVG child elements.
- With the tool **none** the user can interact with SVG child elements and trigger events.
- With the tool **auto** the user can interact with SVG child elements, perform *pan* (dragging the image), *zoom in* (double click), *zoom out* (double click + shift).

## Documentation
- [Getting Started](./docs/getting-started.md#props)
- [Props](./docs/documentation.md#props)
- [Methods](./docs/documentation.md#methods)
- [API](./docs/documentation.md#api)
- [Autosizer viewer](./docs/autosizer-viewer.md)
- [SVG dynamically loaded](./docs/svg-dynamically-loaded.md)

<!-- BEGIN_SECTION_SKIPPED_ONLINE -->
## Install
### NPM
```sh
npm install --save react-svg-pan-zoom
```
### YARN
```sh
yarn add react-svg-pan-zoom
```
### UMD
```html
<script src="https://unpkg.com/prop-types@15/prop-types.js"></script>
<script src="https://unpkg.com/react-svg-pan-zoom@3"></script>
```
<!-- END_SECTION_SKIPPED_ONLINE -->

## Usage examples
- [**Basic**](./examples/controlled-component) - Basic usage of `<ReactSVGPanZoom>`.
- [**Uncontrolled Component**](./examples/uncontrolled-component) - Basic usage of `<UncontrolledReactSVGPanZoom>`.
- [**Advanced usage**](./examples/controlled-component-advanced-usage) - Complex usage of `<ReactSVGPanZoom>` that uses some advanced features.
- [**JSFiddle**](https://jsfiddle.net/chrvadala/f67qyfsd/) - This is a JSFiddle demo that uses UMD bundle.
- [**CodeSandbox**](https://codesandbox.io/s/1v19809803) - This is a CodeSandbox demo.

## Changelog
- **v2.0** - Project refactor. Follow [this guide](./docs/migrate-from-v1-to-v2.md) for migration instructions.
- **v2.1** - Adds `setPointOnViewerCenter`, `reset` methods and `className`, `style` props
- **v2.2** - Introduces tool `auto`, improves default toolbar
- **v2.3** - Adds touch events support
- **v2.4** - Adds es:next support, deploy new website
- **v2.5** - Adds `preventPanOutside` and `scaleFactor` props
- **v2.6** - Introduces [transformation-matrix](https://www.npmjs.com/package/transformation-matrix) that reduces bundle size thanks to three shaking, Fixes pan limit behaviour, Replaces toolbar links with buttons, minor improvements
- **v2.7** - Adds miniature feature, Adds [PropTypes](https://www.npmjs.com/package/prop-types) support
- **v2.8** - Adds storybook demo, Remove bower support, Adds pinch to zoom feature, Fixes miniature size
- **v2.9** - Reinvents miniature and introduce props `miniatureBackground`, `miniatureHeight`, Minor improvements & fix
- **v2.10** - Introduces prop `disableDoubleClickZoomWithToolAuto`
- **v2.11** - Improves docs, updates deps
- **v2.12** - Exports miniature to allow customization
- **v2.13** - Fixes resize issues (#58), Upgrades deps
- **v2.14** - Introduces prop `scaleFactorOnWheel`, Upgrades deps
- **v2.15** - Improves autopan feature ([#71](https://github.com/chrvadala/react-svg-pan-zoom/issues/71)), adds `scaleFactorMax`, `scaleFactorMin` props ([#71](https://github.com/chrvadala/react-svg-pan-zoom/issues/71)), Upgrades deps
- **v2.16** - Adds `onPan` and `onZoom` callbacks, Upgrade deps, Fixes boundaries feature
- **v2.17** - Upgrades deps
- **v2.18** - Introduces `toolbarProps.SVGAlignX` and `toolbarProps.SVGAlignY` props.  Adds alignment configuration in `fitToViewer(SVGAlignX = "left", SVGAlignY = "top")` method ([#120](https://github.com/chrvadala/react-svg-pan-zoom/pull/120)). Upgrades deps.
- **v3.0** - Upgrades to babel 7 and storybook 4; Introduces `<UncontrolledReactSVGPanZoom />` component and makes `<ReactSVGPanZoom>` a stateless component (except for some optimizations); Moves props related to miniature and toolbar, respectively into the `miniatureProp` and `toolbarProp` props. **Migration guide is available [here](./docs/migrate-from-v2-to-v3.md)**.
- **v3.1** - Upgrades to storybook 5 and [transformation-matrix 2](https://github.com/chrvadala/transformation-matrix); Fixes some Babel configuration issues
- **v3.2** - Upgrades deps
- **v3.3** - Adds SVG viewbox prop support [#150](https://github.com/chrvadala/react-svg-pan-zoom/pull/150) 
- **v3.4** - Upgrades deps and increases code quality (fixing eslint warnings)
- **v3.5** - Handles wheel event as passive [#158](https://github.com/chrvadala/react-svg-pan-zoom/pull/158), upgrades deps
- **v3.6** - Adds some unit tests, Fixes [#161](https://github.com/chrvadala/react-svg-pan-zoom/issues/161), upgrades deps

## Some projects using react-svg-pan-zoom
- [**Learn Anything**](https://github.com/learn-anything/learn-anything)
- [**React Planner**](https://github.com/cvdlab/react-planner)
- [Python extension for vscode](https://github.com/microsoft/vscode-python)
- [**Others...**](https://github.com/chrvadala/react-svg-pan-zoom/network/dependents)
- Pull request your project!

## Contributors
- [chrvadala](https://github.com/chrvadala) (author)
- [UtkuBelemir](https://github.com/UtkuBelemir)
- [pellebjerkestrand](https://github.com/pellebjerkestrand)
- [otake](https://github.com/otake)
- [DmitriySpirit](https://github.com/DmitriySpirit)
- [yozi-developer](https://github.com/yozi-developer)
- [auroranil](https://github.com/auroranil)
- [ahmedhosny](https://github.com/ahmedhosny)
- [spcfran](https://github.com/spcfran)
- [mariafronczak](https://github.com/mariafronczak)
- [jakoblaegdsmand](https://github.com/jakoblaegdsmand)
- [lionkeng](https://github.com/lionkeng)
- [KQLYYY](https://github.com/KQLYYY)
- [TimVanMourik](https://github.com/TimVanMourik)
- [kheyse-oqton](https://github.com/kheyse-oqton)
- [krnlde](https://github.com/krnlde)
