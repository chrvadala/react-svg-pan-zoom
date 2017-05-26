# React SVG Pan Zoom - documentation

## Props
  - `width` – **required** – width of the viewer displayed on screen (if you want to omit this see [Autosize](#autosize))
  - `height` – **required** – height of the viewer displayed on screen (if you want to omit this see  [Autosize](#autosize))
  - `value` - inject and lock the viewer to a specific value
  - `onChangeValue` - callback called when the viewer changes its value `fn(value: object)`
  - `tool` - inject and lock the viewer to a specific tool ( one of `none`, `pan`, `zoom-in`, `zoom-out`, `auto` )
  - `onChangeTool` - callback called when the viewer changes the used tool `fn(tool: string)`
  - `SVGBackground` - background of the SVG (default color: white)
  - `background` – background of the viewer (default color: dark grey)
  - `style` - CSS style of the viewer
  - `className` - CSS class of the viewer
  - `detectWheel` - perform zoom operation on mouse scroll
  - `detectAutoPan` - perform PAN if the mouse is on the border of the viewer
  - `detectPinchGesture` - perform zoom operation on pinch gesture
  - `toolbarPosition` - toolbar position (one of `none`, `top`, `right`, `bottom`, `left`)
  - `customToolbar` - React component with custom toolbar
  - `modifierKeys` - array with modifier keys used with the tool `auto` to swap `zoom in` and `zoom out` ([Accepted value]( https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState))
  - `preventPanOutside` - if false the user can move the image outside the viewer
  - `scaleFactor` - how much scale in or out (default: 1.1 = 110%)
  - `customToolbar` - override toolbar component
  - `miniaturePosition` - miniature position (one of `none`, `right`, `left`)
  - `miniatureBackground` - background of the miniature (default color: dark grey)
  - `miniatureWidth` - miniature width (default: 100px)
  - `miniatureHeight` - miniature height (default: 80px)
  - `customMiniature` - override miniature component
  - `onClick` - handler* for click `fn(viewerEvent: ViewerMouseEvent)`
  - `onDoubleClick` - handler* for dblclick `fn(viewerEvent: ViewerMouseEvent)`
  - `onMouseUp` - handler* for mouseup `fn(viewerEvent: ViewerMouseEvent)`
  - `onMouseMove` - handler* for mousemove `fn(viewerEvent: ViewerMouseEvent)`
  - `onMouseDown` - handler* for mousedown `fn(viewerEvent: ViewerMouseEvent)`
  - `onTouchStart` - handler* for mousedown `fn(viewerEvent: ViewerTouchEvent)`
  - `onTouchMove` - handler* for mousedown `fn(viewerEvent: ViewerTouchEvent)`
  - `onTouchEnd` - handler* for mousedown `fn(viewerEvent: ViewerTouchEvent)`
  - `onTouchCancel` - handler* for mousedown `fn(viewerEvent: ViewerTouchEvent)`

\* handler available only with the tool `none` or `auto`

##  Methods
 - `pan( SVGDeltaX, SVGDeltaY )` - Apply a pan
 - `zoom(SVGPointX, SVGPointY, scaleFactor)` - Zoom in or out the SVG
 - `fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight)` - Fit an SVG area to viewer
 - `fitToViewer()` - Fit all SVG to Viewer
 - `setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel)` - Set a point on Viewer center
 - `reset()` - Reset Viewer view to default
 - `zoomOnViewerCenter(scaleFactor)` - Zoom SVG on center
 - `getValue()` - Get current viewer value
 - `setValue(value)` - Through this method you can set a new value
 - `getTool()` - Get current tool
 - `setTool(tool)` - Set a tool (one of `none`,`pan`,`zoom-in`,`zoom-out`,`auto`)

## Event attributes
To your event handlers will be passed an instance of `ViewerMouseEvent` or `ViewerTouchEvent` (as the case). They have some useful attributes that map event positions to SVG coords.
If, for your purpose, you need the original React event instance (`SyntheticEvent`), you can get it through `event.originalEvent`. You can't use event in async way, see [React Event Pooling](https://facebook.github.io/react/docs/events.html#event-pooling) for more information.

### Viewer Mouse Event
  - `originalEvent: SyntheticEvent` - The original React event
  - `SVGViewer: SVGSVGElement ` - Reference to SVGViewer
  - `point: object ` - coordinates (x,y) of the event mapped to SVG coordinates
  - `x: number ` - x coordinate of the event mapped to SVG coordinates
  - `y: number ` - y coordinate of the event mapped to SVG coordinates
  - `scaleFactor: number ` - zoom level
  - `translationX: number ` - x delta from the viewer origin
  - `translationY: number ` - y delta from the viewer origin
  - `preventDefault(): void ` - alias `originalEvent.preventDefault()`
  - `stopPropagation(): void ` - alias `originalEvent.stopPropagation()`

### Viewer Touch Event
  - `originalEvent: SyntheticEvent` - The original React event
  - `SVGViewer: SVGSVGElement ` - Reference to SVGViewer
  - `points: array[{x, y, identifier}] ` - array with coordinates (x, y, identifier) of the touches mapped to SVG coordinates
  - `changedPoints: array[{x, y, identifier}] ` - coordinates (x, y, identifier) of the changed touches mapped to SVG coordinates
  - `scaleFactor: number ` - zoom level
  - `translationX: number ` - x delta from the viewer origin
  - `translationY: number ` - y delta from the viewer origin
  - `preventDefault(): void ` - alias `originalEvent.preventDefault()`
  - `stopPropagation(): void ` - alias `originalEvent.stopPropagation()`
