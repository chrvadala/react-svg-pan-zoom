# React SVG Pan Zoom - documentation

## Available Props

|Prop|Default|Type|Description|
|-----|------|-----|-----|
| width             | **required** | Number | Width of the viewer displayed on screen *(if you want to omit this see [Autosize](#autosize))* |
| height            | **required** | Number | Height of the viewer displayed on screen *(if you want to omit this see  [Autosize](#autosize))* |
| value             | **required** | Object | Lock the viewer to a specific value *(if you want to omit this use `<UncontrolledReactSVGPanZoom>` component)*|
| onChangeValue     | **required** | `fn(value: object)` | Callback called when the viewer changes its value *(if you want to omit this use `<UncontrolledReactSVGPanZoom>` component)*|
| tool              | **required** | one of `none`, `pan`, `zoom-in`, `zoom-out`, `auto` |  Lock the viewer to a specific tool *(if you want to omit this use `<UncontrolledReactSVGPanZoom>` component)*|
| onChangeTool      | **required** | `fn(tool: string)` | Callback called when the viewer changes the used tool *(if you want to omit this use `<UncontrolledReactSVGPanZoom>` component)*|
| background        | `#616264`  | String | Background of the viewer |
| SVGBackground    | `white`      | String | Background of the SVG |
| SVGStyle          | `{}`       | Object | Style of the SVG |
| style            | -            | Object | CSS style of the viewer |
| className         | -            | String | CSS class of the viewer |
| detectWheel       | `true`       | Boolean | Perform zoom operation on mouse scroll |
| detectAutoPan     | `true`       | Boolean | Perform PAN if the mouse is on the border of the viewer |
| detectPinchGesture| `true`       | Boolean | Perform zoom operation on pinch gesture |
| onZoom            | -            | `fn(value: object)` | Callback called when the zoom level changes |
| onPan             | -            | `fn(value: object)` | Callback called when a pan action is performed |
| onClick         | - | `fn(viewerEvent: ViewerMouseEvent)` | Handler* for click |
| onDoubleClick     | - | `fn(viewerEvent: ViewerMouseEvent)` | Handler* for dblclick |
| onMouseUp         | - | `fn(viewerEvent: ViewerMouseEvent)` | Handler* for mouseup |
| onMouseMove        | - | `fn(viewerEvent: ViewerMouseEvent)` | Handler* for mousemove |
| onMouseDown        | - | `fn(viewerEvent: ViewerMouseEvent)` | Handler* for mousedown |
| onTouchStart       | - | `fn(viewerEvent: ViewerTouchEvent)` | Handler* for mousedown |
| onTouchMove        | - | `fn(viewerEvent: ViewerTouchEvent)` | Handler* for mousedown |
| onTouchEnd         | - | `fn(viewerEvent: ViewerTouchEvent)` | Handler* for mousedown |
| onTouchCancel      | - | `fn(viewerEvent: ViewerTouchEvent)` | Handler* for mousedown |
| preventPanOutside | `true`       | Boolean | User can't move the image outside the viewer |
| scaleFactor       | `1.1`        | Number | How much scale in or out (%) |
| scaleFactorOnWheel| `1.06`        | Number | how much scale in or out on mouse wheel (requires `detectWheel` to be enabled) (%) |
| scaleFactorMax    | -            | Number | maximum amount of scale a user can zoom in to
| scaleFactorMin    | -            | Number | minimum amount of scale a user can zoom out of
| modifierKeys      | -            | Array | Array with modifier keys used with the tool `auto` to swap `zoom in` and `zoom out` ([Accepted value]( https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState)) |
| disableDoubleClickZoomWithToolAuto | `false` | Boolean | Turn off zoom on double click |
| customMiniature   | -            | Component |  Override miniature component |
| miniatureProps | {} | Object | Miniature settings |
| miniatureProps.position | `left`       | one of `none`, `right`, `left` | Miniature position |
| miniatureProps.background | `#616264`| String | background of the miniatureProps. |
| miniatureProps.width    | `100`        | Number | Miniature width (px) |
| miniatureProps.height   | `80`         | Number | Miniature height (px) |
| customToolbar     | -            | Component | Override toolbar component |
| toolbarProps | {} | Object | Toolbar settings |
| toolbarProps.position   | `right`      | one of `none`, `top`, `right`, `bottom`, `left` | Toolbar position |
| toolbarProps.SVGAlignX | `left` | one of `left`, `center`, `right` | X Alignment used for "Fit to Viewer" action |
| toolbarProps.SVGAlignY | `top` | one of `top`, `center`, `bottom` | Y Alignment used for "Fit to Viewer" action |

\* handler available only with the tool `none` or `auto`

##  Methods
|Method|Description|
|-----|------|
| `pan(SVGDeltaX, SVGDeltaY)`               | Apply a pan |
| `zoom(SVGPointX, SVGPointY, scaleFactor)`   | Zoom in or out the SVG |
| `fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight)`| Fit an SVG area to viewer |
| `fitToViewer(SVGAlignX = "left", SVGAlignY = "top")`         | Fit all SVG to Viewer (`SVGAlignX`: one of `left`, `center`, `right`, `SVGAlignY`: one of `top`, `center`, `bottom`)  |
| `setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel)`| Set a point on Viewer center |
| `reset()`                                      | Reset Viewer view to default |
| `zoomOnViewerCenter(scaleFactor)`              | Zoom SVG on center |
| `getValue()`                                   | Get current viewer value |
| `setValue(value)`                              | Through this method you can set a new value |
| `getTool()`                                    | Get current tool |
| `changeTool(tool)`                             | Change the tool (one of `none`,`pan`,`zoom-in`,`zoom-out`,`auto`) |
| `openMiniature`                                | Open the miniature | 
| `closeMiniature`                               | Close the miniature | 

## Event attributes
To your event handlers will be passed an instance of `ViewerMouseEvent` or `ViewerTouchEvent` (as the case). They have some useful attributes that map event positions to SVG coords.
If, for your purpose, you need the original React event instance (`SyntheticEvent`), you can get it through `event.originalEvent`. You can't use event in async way, see [React Event Pooling](https://facebook.github.io/react/docs/events.html#event-pooling) for more information.

### Viewer Mouse Event
|Property|Return|Description|
|-----|------|------|
|`originalEvent`      | SyntheticEvent | The original React event |
| `SVGViewer `        | SVGSVGElement  | Reference to SVGViewer |
| `point`             | Object         | Coordinates (x,y) of the event mapped to SVG coordinates |
| `x`                 | Number         | x coordinate of the event mapped to SVG coordinates |
| `y`                 | Number         | y coordinate of the event mapped to SVG coordinates
| `scaleFactor`       | Number         | Zoom level |
| `translationX`      | Number         | x delta from the viewer origin |
| `translationY`      | Number         | y delta from the viewer origin |
| `preventDefault()`  | -              | alias `originalEvent.preventDefault()` |
| `stopPropagation()` | -              | alias `originalEvent.stopPropagation()` |

### Viewer Touch Event
|Property|Return|Description|
|-----|------|------|
|`originalEvent`     | SyntheticEvent | The original React event |
| `SVGViewer `       | SVGSVGElement  | Reference to SVGViewer |
| `points`           | Array          | Array with coordinates (x, y, identifier) of the touches mapped to SVG coordinates |
| `changedPoints`    | Array          | Coordinates (x, y, identifier) of the changed touches mapped to SVG coordinates |
| `scaleFactor`      | Number         | Zoom level |
| `translationX`     | Number         | x delta from the viewer origin |
| `translationY`     | Number         | y delta from the viewer origin |
| `preventDefault()` | -              | alias `originalEvent.preventDefault()` |
| `stopPropagation()`| -              | alias `originalEvent.stopPropagation()` |

# API

This is a list of **components**, **functions** and **constants** exported by the library.

```javascript
import {
  //components
  ReactSVGPanZoom,             //Controlled component
  UncontrolledReactSVGPanZoom, //Uncontrolled component
  
  //functions to manipulate the state. The signature is quite similar to component methods, expect for the first parameter that is the current value. These are usefull only for some advanced integrations (e.g. reducers). 
  setPointOnViewerCenter,   //setPointOnViewerCenter(value, SVGPointX, SVGPointY, zoomLevel)
  reset,                    //reset(value)
  pan,                      //pan(value, SVGDeltaX, SVGDeltaY)
  zoom,                     //zoom(value, SVGPointX, SVGPointY, scaleFactor)
  fitSelection,             //fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight)
  fitToViewer,              //fitToViewer(value, SVGAlignX = "left", SVGAlignY = "top")
  zoomOnViewerCenter,       //zoomOnViewerCenter(value, scaleFactor)
  openMiniature,
  closeMiniature,
  
  //constants
  MODE_IDLE,
  MODE_PANNING,
  MODE_ZOOMING,
  
  TOOL_AUTO,
  TOOL_NONE,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  
  POSITION_NONE,
  POSITION_TOP,
  POSITION_RIGHT,
  POSITION_BOTTOM,
  POSITION_LEFT,
  
  ACTION_ZOOM,
  ACTION_PAN,
  
  ALIGN_CENTER,
  ALIGN_LEFT,
  ALIGN_RIGHT,
  ALIGN_TOP,
  ALIGN_BOTTOM,
  
  INITIAL_VALUE
} from 'react-svg-pan-zoom'
```


