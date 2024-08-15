# react-svg-pan-zoom
**react-svg-pan-zoom** is a React component that adds **pan** and **zoom** features to the **SVG images**. It helps to display big SVG images in a small space.

[![chrvadala](https://img.shields.io/badge/website-chrvadala-orange.svg)](https://chrvadala.github.io)
[![Test](https://github.com/chrvadala/react-svg-pan-zoom/workflows/Test/badge.svg)](https://github.com/chrvadala/react-svg-pan-zoom/actions)
[![npm](https://img.shields.io/npm/v/react-svg-pan-zoom.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-svg-pan-zoom)
[![Downloads](https://img.shields.io/npm/dm/react-svg-pan-zoom.svg)](https://www.npmjs.com/package/react-svg-pan-zoom)
[![Donate](https://img.shields.io/badge/donate-GithubSponsor-green.svg)](https://github.com/sponsors/chrvadala)



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
- [Getting Started](https://github.com/chrvadala/react-svg-pan-zoom/blob/main/docs/getting-started.md#props)
- [Props](https://github.com/chrvadala/react-svg-pan-zoom/blob/main/docs/documentation.md#props)
- [Methods](https://github.com/chrvadala/react-svg-pan-zoom/blob/main/docs/documentation.md#methods)
- [API](https://github.com/chrvadala/react-svg-pan-zoom/blob/main/docs/documentation.md#api)
- [Autosizer viewer](https://github.com/chrvadala/react-svg-pan-zoom/blob/main/docs/autosizer-viewer.md)
- [SVG dynamically loaded](https://github.com/chrvadala/react-svg-pan-zoom/blob/main/docs/svg-dynamically-loaded.md)

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
- [**Basic**](https://github.com/chrvadala/react-svg-pan-zoom/tree/main/examples/controlled-component) - Basic usage of `<ReactSVGPanZoom>`.
- [**Uncontrolled Component**](https://github.com/chrvadala/react-svg-pan-zoom/tree/main/examples/uncontrolled-component) - Basic usage of `<UncontrolledReactSVGPanZoom>`.
- [**JSFiddle**](https://jsfiddle.net/chrvadala/f67qyfsd/) - This is a JSFiddle demo that uses UMD bundle.
- [**CodeSandbox**](https://codesandbox.io/s/1v19809803) - This is a CodeSandbox demo.

## Changelog
- **v2.0** - Project refactor. Follow [this guide](https://github.com/chrvadala/react-svg-pan-zoom/blob/main/docs/migrate-from-v1-to-v2.md) for migration instructions.
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
- **v3.0** - Upgrades to babel 7 and storybook 4; Introduces `<UncontrolledReactSVGPanZoom />` component and makes `<ReactSVGPanZoom>` a stateless component (except for some optimizations); Moves props related to miniature and toolbar, respectively into the `miniatureProp` and `toolbarProp` props. **Migration guide is available [here](https://github.com/chrvadala/react-svg-pan-zoom/blob/main/docs/migrate-from-v2-to-v3.md)**.
- **v3.1** - Upgrades to storybook 5 and [transformation-matrix 2](https://github.com/chrvadala/transformation-matrix); Fixes some Babel configuration issues
- **v3.2** - Upgrades deps
- **v3.3** - Adds SVG viewbox prop support [#150](https://github.com/chrvadala/react-svg-pan-zoom/pull/150)
- **v3.4** - Upgrades deps and increases code quality (fixing eslint warnings)
- **v3.5** - Handles wheel event as passive [#158](https://github.com/chrvadala/react-svg-pan-zoom/pull/158), upgrades deps
- **v3.6** - Adds some unit tests, Fixes [#161](https://github.com/chrvadala/react-svg-pan-zoom/issues/161), upgrades deps
- **v3.7** - Adds some more unit tests, upgrades deps
- **v3.8** - Adds cover option on `fitToViewer` method [#167](https://github.com/chrvadala/react-svg-pan-zoom/pull/167), adds `activeToolColor` property [#168](https://github.com/chrvadala/react-svg-pan-zoom/pull/168), upgrades deps
- **v3.9** - Exports toolbar icons and buttons [#192](https://github.com/chrvadala/react-svg-pan-zoom/pull/192)
- **3.10** - Upgrades deps; Migrates to React 17 and Storybook 6; Updates examples and docs to React hooks
- **3.11** - Migrates from yarn to npm; Makes use of [chrvadala/github-actions](https://github.com/chrvadala/github-actions); Updates deps;
- **3.12** - Migrates to gh-sponsor; Improves docs; Deprecates v1 migration guide; Upgrades deps;
- **3.13** - Fixes migration doc [#218](https://github.com/chrvadala/react-svg-pan-zoom/pull/218); Removes deprecated defaultProps; Migrates to Storybook 8; Upgrades deps; Upgrades gh-actions;

## Some projects using react-svg-pan-zoom
- [**Learn Anything**](https://github.com/learn-anything/learn-anything)
- [**React Planner**](https://github.com/cvdlab/react-planner)
- [**Python extension for vscode**](https://github.com/microsoft/vscode-python)
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
- [UnHumbleBen](https://github.com/UnHumbleBen)
- [wolasss](https://github.com/wolasss)
- [leweohlsen](https://github.com/leweohlsen)
- [sroze](https://github.com/sroze)
- [justin-hackin](https://github.com/justin-hackin)
- [Hydroxycarbamide](https://github.com/Hydroxycarbamide)
- [andylwelch](https://github.com/andylwelch)
