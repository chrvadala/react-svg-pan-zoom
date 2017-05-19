# react-svg-pan-zoom
**react-svg-pan-zoom** is a React component that adds **pan** and **zoom** features to the **SVG images**. It helps to display big SVG images in a small space.

[![npm](https://img.shields.io/npm/v/react-svg-pan-zoom.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/react-svg-pan-zoom)
[![Downloads](https://img.shields.io/npm/dm/react-svg-pan-zoom.svg)](https://www.npmjs.com/package/react-svg-pan-zoom)
![license-mit](https://img.shields.io/badge/license-MIT-42cd00.svg)
[![Donate](https://img.shields.io/badge/donate-%E2%82%AC%E2%82%AC%E2%82%AC-brightgreen.svg)](https://www.bountysource.com/teams/react-svg-pan-zoom)

<!-- START_NO_WEB:1 -->
[![react-svg-pan-zoom](https://raw.githubusercontent.com/chrvadala/react-svg-pan-zoom/master/react-svg-pan-zoom.gif)](http://chrvadala.github.io/react-svg-pan-zoom/)

## Live Demo
available at [http://chrvadala.github.io/react-svg-pan-zoom/](http://chrvadala.github.io/react-svg-pan-zoom/)
<!-- END_NO_WEB:1 -->

## Features
This component can work in four different modes depending on the selected tool:
- With the tool **pan** the user can move the image and drag it around within the viewer, but can't interact with SVG child elements.
- With the tool **zoom** the user can scale the image either with a point click or selecting a region to zoom the specified area, but can't interact with SVG child elements.
- With the tool **none** the user can interact with SVG child elements and trigger events.
- With the tool **auto** the user can interact with SVG child elements, perform *pan* (dragging the image), *zoom in* (double click), *zoom out* (double click + shift).

## Documentation
- [Props](https://github.com/chrvadala/react-svg-pan-zoom/blob/master/docs/documentation.md#props)
- [Methods](https://github.com/chrvadala/react-svg-pan-zoom/blob/master/docs/documentation.md#methods)
- [Autosizer viewer](https://github.com/chrvadala/react-svg-pan-zoom/blob/master/docs/autosizer-viewer.md)

<!-- START_NO_WEB:2 -->
## Install
```sh
npm install --save react-svg-pan-zoom
```
<!-- END_NO_WEB:2 -->

## Usage examples
- [**Basic**](./examples/1-basic/) - This project show how to use the component in a scenario when is not required a full control on the internal state. This is the easist React SVG Pan Zoom usage.
- [**Controlled state**](./examples/2-controlled-state/) - This advanced project show a scenario in which the parent component has a full control of the svg viewer. *The state is owned by the parent* and injected on the viewer throught `props`. Any state change request is performed by two callbacks `onChangeValue(value)` and `onChangeTool(tool)`. This demo apply the same pattern of an `<input>` tag ([React Controlled Components](https://facebook.github.io/react/docs/forms.html#controlled-components)).
- [**Redux**](./examples/3-redux/) - This advanced project show a scenario in which a redux store handle the state. Each component can dispatch a Redux action and edit the current view of the viewer.

## Changelog
- **v2.0** - Project refactor. Follow [this guide](./docs/migrate-from-v1-to-v2.md) for migration instructions.
- **v2.1** - Adds `setPointOnViewerCenter`, `reset` methods and `className`, `style` props
- **v2.2** - Introduce tool `auto`, improve default toolbar
- **v2.3** - Adds touch events support
- **v2.4** - Adds es:next support, deploy new website
- **v2.5** - Adds `preventPanOutside` and `scaleFactor` props
- **v2.6** - Introduce [transformation-matrix](https://www.npmjs.com/package/transformation-matrix) that reduce bundle size thanks to three shaking, Fix pan limit behaviour, Replaces toolbar links with buttons, minor improvements
- **v2.7** - Adds miniature feature, Adds [PropTypes](https://www.npmjs.com/package/prop-types) support
- **v2.8** - Adds storybook demo, Remove bower support

## Some projects using react-svg-pan-zoom
- [**React Planner**](https://github.com/cvdlab/react-planner)
- [**Others...**](https://libraries.io/npm/react-svg-pan-zoom/dependent-repositories)
- Pull request your project!

## Contributors
- [chrvadala](https://github.com/chrvadala) (author)
- [UtkuBelemir](https://github.com/UtkuBelemir)

## License
MIT
