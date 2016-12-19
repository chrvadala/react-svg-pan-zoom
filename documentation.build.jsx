
import React from 'react';

let html = `<div><h1>react-svg-pan-zoom</h1>
<p><strong>react-svg-pan-zoom</strong> is a React component that adds <strong>pan</strong> and <strong>zoom</strong> features to the <strong>SVG images</strong>. It helps to display big SVG images in a small space.</p>
<p><a href="https://www.npmjs.com/package/react-svg-pan-zoom"><img src="https://img.shields.io/npm/v/react-svg-pan-zoom.svg?maxAge=2592000?style=plastic" alt="npm"></a>
<img src="https://img.shields.io/badge/javascript-ES6-fbde34.svg" alt="javascript">
<img src="https://img.shields.io/badge/react%20version-15.0.0%20or%20later-61dafb.svg" alt="react-version">
<img src="https://img.shields.io/badge/license-MIT-42cd00.svg" alt="license-mit"></p>
<h2>Features</h2>
<p>This component can work in four different modes depending on the selected tool:</p>
<ul>
<li>With the tool <strong>pan</strong> the user can move the image and drag it around within the viewer, but can't interact with SVG child elements.</li>
<li>With the tool <strong>zoom</strong> the user can scale the image either with a point click or selecting a region to zoom the specified area, but can't interact with SVG child elements.</li>
<li>With the tool <strong>none</strong> the user can interact with SVG child elements and trigger events.</li>
<li>With the tool <strong>auto</strong> the user can interact with SVG child elements, perform <em>pan</em> (dragging the image), <em>zoom in</em> (double click), <em>zoom out</em> (double click + shift).</li>
</ul>
<h2>Additional Features</h2>
<ul>
<li>Zoom detection performed through pinch and scroll (optional)</li>
<li><em>Autopan</em> when the mouse is close to the edge of the viewer (optional)</li>
<li>Each callback function receives (x,y) coords mapped to the real size of the SVG</li>
<li>Programmatically controllable</li>
<li>Event info managed lazily to ensure high performance</li>
<li>ES6 syntax</li>
</ul>
<h2>Usage</h2>
<pre><code>npm install --save react-svg-pan-zoom
</code></pre>
<pre><code>bower install react-svg-pan-zoom
</code></pre>
<p><a href="https://github.com/chrvadala/react-svg-pan-zoom/tree/master/examples/1-basic/example1.jsx">Sample code available here</a></p>
<pre><code class="language-js">import React from 'react';
import ReactDOM from 'react-dom';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';

class Demo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.Viewer = null;
  }
  componentDidMount() {
    this.Viewer.fitToViewer();
  }
  render() {
    return (
      &lt;div&gt;
        &lt;button onClick={event =&gt; this.Viewer.zoomOnViewerCenter(1.1)}&gt;Zoom in&lt;/button&gt;
        &lt;button onClick={event =&gt; this.Viewer.fitSelection(40, 40, 200, 200)}&gt;Zoom area&lt;/button&gt;
        &lt;button onClick={event =&gt; this.Viewer.fitToViewer()}&gt;Fit&lt;/button&gt;

        &lt;hr/&gt;

        &lt;ReactSVGPanZoom
          style={{border: &quot;1px solid black&quot;}}
          width={500} height={500} ref={Viewer =&gt; this.Viewer = Viewer}
          onClick={event =&gt; console.log('click', event.x, event.y, event.originalEvent)}
          onMouseUp={event =&gt; console.log('up', event.x, event.y)}
          onMouseMove={event =&gt; console.log('move', event.x, event.y)}
          onMouseDown={event =&gt; console.log('down', event.x, event.y)}&gt;

          &lt;svg width={900} height={800}&gt;
              &lt;-- put here your SVG content --&gt;
          &lt;/svg&gt;
        &lt;/ReactSVGPanZoom&gt;
      &lt;/div&gt;
    );
  }
}
</code></pre>
<h2>Props</h2>
<ul>
<li><code>width</code> – <strong>required</strong> – width of the viewer displayed on screen (if you want to omit this see <a href="#autosize">Autosize</a>)</li>
<li><code>height</code> – <strong>required</strong> – height of the viewer displayed on screen (if you want to omit this see  <a href="#autosize">Autosize</a>)</li>
<li><code>value</code> - inject and lock the viewer to a specific value</li>
<li><code>onChangeValue</code> - callback called when the viewer changes its value <code>fn(value: object)</code></li>
<li><code>tool</code> - inject and lock the viewer to a specific tool ( one of <code>none</code>, <code>pan</code>, <code>zoom-in</code>, <code>zoom-out</code>, <code>auto</code> )</li>
<li><code>onChangeTool</code> - callback called when the viewer changes the used tool <code>fn(tool: string)</code></li>
<li><code>SVGBackground</code> - background of the SVG (default color: white)</li>
<li><code>background</code> – background of the viewer (default color: dark grey)</li>
<li><code>style</code> - CSS style of the viewer</li>
<li><code>className</code> - CSS class of the viewer</li>
<li><code>detectWheel</code> - detect zoom operation performed through pinch gesture or mouse scroll</li>
<li><code>detectAutoPan</code> - perform PAN if the mouse is on the border of the viewer</li>
<li><code>toolbarPosition</code> - toolbar position (one of <code>none</code>, <code>top</code>, <code>right</code>, <code>bottom</code>, <code>left</code>)</li>
<li><code>customToolbar</code> - React component with custom toolbar</li>
<li><code>modifierKeys</code> - array with modifier keys used with the tool <code>auto</code> to swap <code>zoom in</code> and <code>zoom out</code> (<a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState">Accepted value</a>)</li>
<li><code>onClick</code> - handler for click <code>fn(viewerEvent: ViewerMouseEvent)</code> <em>(available with the tool <code>none</code> or <code>auto</code>)</em></li>
<li><code>onDoubleClick</code> - handler for dblclick <code>fn(viewerEvent: ViewerMouseEvent)</code> <em>(available with the tool <code>none</code> or <code>auto</code>)</em></li>
<li><code>onMouseUp</code> - handler for mouseup <code>fn(viewerEvent: ViewerMouseEvent)</code> <em>(available with the tool <code>none</code> or <code>auto</code>)</em></li>
<li><code>onMouseMove</code> - handler for mousemove <code>fn(viewerEvent: ViewerMouseEvent)</code> <em>(available with the tool <code>none</code> or <code>auto</code>)</em></li>
<li><code>onMouseDown</code> - handler for mousedown <code>fn(viewerEvent: ViewerMouseEvent)</code> <em>(available with the tool <code>none</code> or <code>auto</code>)</em></li>
<li><code>onTouchStart</code> - handler for mousedown <code>fn(viewerEvent: ViewerTouchEvent)</code> <em>(available with the tool <code>none</code> or <code>auto</code>)</em></li>
<li><code>onTouchMove</code> - handler for mousedown <code>fn(viewerEvent: ViewerTouchEvent)</code> <em>(available with the tool <code>none</code> or <code>auto</code>)</em></li>
<li><code>onTouchEnd</code> - handler for mousedown <code>fn(viewerEvent: ViewerTouchEvent)</code> <em>(available with the tool <code>none</code> or <code>auto</code>)</em></li>
<li><code>onTouchCancel</code> - handler for mousedown <code>fn(viewerEvent: ViewerTouchEvent)</code> <em>(available with the tool <code>none</code> or <code>auto</code>)</em></li>
</ul>
<h2>Methods</h2>
<ul>
<li><code>pan( SVGDeltaX, SVGDeltaY )</code> - Apply a pan</li>
<li><code>zoom(SVGPointX, SVGPointY, scaleFactor)</code> - Zoom in or out the SVG</li>
<li><code>fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight)</code> - Fit an SVG area to viewer</li>
<li><code>fitToViewer()</code> - Fit all SVG to Viewer</li>
<li><code>setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel)</code> - Set a point on Viewer center</li>
<li><code>reset()</code> - Reset Viewer view to default</li>
<li><code>zoomOnViewerCenter(scaleFactor)</code> - Zoom SVG on center</li>
<li><code>getValue()</code> - Get current viewer value</li>
<li><code>setValue(value)</code> - Through this method you can set a new value</li>
<li><code>getTool()</code> - Get current tool</li>
<li><code>setTool(tool)</code> - Set a tool (one of <code>none</code>,<code>pan</code>,<code>zoom-in</code>,<code>zoom-out</code>,<code>auto</code>)</li>
</ul>
<h2>Event attributes</h2>
<p>To your event handlers will be passed an instance of <code>ViewerMouseEvent</code> or <code>ViewerTouchEvent</code> (as the case). They have some useful attributes that map event positions to SVG coords.
If, for your purpose, you need the original React event instance (<code>SyntheticEvent</code>), you can get it through <code>event.originalEvent</code>. You can't use event in async way, see <a href="https://facebook.github.io/react/docs/events.html#event-pooling">React Event Pooling</a> for more information.</p>
<h3>Viewer Mouse Event</h3>
<ul>
<li><code>originalEvent: SyntheticEvent</code> - The original React event</li>
<li><code>SVGViewer: SVGSVGElement</code> - Reference to SVGViewer</li>
<li><code>point: object</code> - coordinates (x,y) of the event mapped to SVG coordinates</li>
<li><code>x: number</code> - x coordinate of the event mapped to SVG coordinates</li>
<li><code>y: number</code> - y coordinate of the event mapped to SVG coordinates</li>
<li><code>scaleFactor: number</code> - zoom level</li>
<li><code>translationX: number</code> - x delta from the viewer origin</li>
<li><code>translationY: number</code> - y delta from the viewer origin</li>
<li><code>preventDefault(): void</code> - alias <code>originalEvent.preventDefault()</code></li>
<li><code>stopPropagation(): void</code> - alias <code>originalEvent.stopPropagation()</code></li>
</ul>
<h3>Viewer Touch Event</h3>
<ul>
<li><code>originalEvent: SyntheticEvent</code> - The original React event</li>
<li><code>SVGViewer: SVGSVGElement</code> - Reference to SVGViewer</li>
<li><code>points: array[{x, y, identifier}]</code> - array with coordinates (x, y, identifier) of the touches mapped to SVG coordinates</li>
<li><code>changedPoints: array[{x, y, identifier}]</code> - coordinates (x, y, identifier) of the changed touches mapped to SVG coordinates</li>
<li><code>scaleFactor: number</code> - zoom level</li>
<li><code>translationX: number</code> - x delta from the viewer origin</li>
<li><code>translationY: number</code> - y delta from the viewer origin</li>
<li><code>preventDefault(): void</code> - alias <code>originalEvent.preventDefault()</code></li>
<li><code>stopPropagation(): void</code> - alias <code>originalEvent.stopPropagation()</code></li>
</ul>
<h2>Examples</h2>
<ul>
<li><a href="https://github.com/chrvadala/react-svg-pan-zoom/tree/master/examples/1-basic/"><strong>Basic</strong></a> - This project show how to use the component in a scenario when is not required a full control on the internal state. This is the easist React SVG Pan Zoom usage.</li>
<li><a href="https://github.com/chrvadala/react-svg-pan-zoom/tree/master/examples/2-controlled-state/"><strong>Controlled state</strong></a> - This advanced project show a scenario in which the parent component has a full control of the svg viewer. <em>The state is owned by the parent</em> and injected on the viewer throught <code>props</code>. Any state change request is performed by two callbacks <code>onChangeValue(value)</code> and <code>onChangeTool(tool)</code>. This demo apply the same pattern of an <code>&lt;input&gt;</code> tag (<a href="https://facebook.github.io/react/docs/forms.html#controlled-components">React Controlled Components</a>).</li>
<li><a href="https://github.com/chrvadala/react-svg-pan-zoom/tree/master/examples/3-redux/"><strong>Redux</strong></a> - This advanced project show a scenario in which a redux store handle the state. Each component can dispatch a Redux action and edit the current view of the viewer.</li>
<li><a href="https://cvdlab.github.io/react-planner/"><strong>React Planner</strong></a> - This is an open source React project that use this component.</li>
</ul>
<h2>Autosize</h2>
<p><strong>React SVG Pan Zoom</strong> requires the properties <code>width</code> and <code>height</code> to be set in order to work properly. If you need an autosized component you can use <a href="https://github.com/digidem/react-dimensions">ReactDimension</a> to get the dimensions of a wrapper element and pass them as properties to its child element.</p>
<h2>Start local demo</h2>
<pre><code>git clone https://github.com/chrvadala/react-svg-pan-zoom.git
cd react-svg-pan-zoom
npm install &amp;&amp; npm start
</code></pre>
<h2>Changelog</h2>
<ul>
<li><strong>v2.0</strong> - Project refactor. Follow <a href="https://github.com/chrvadala/react-svg-pan-zoom/tree/master/docs/migrate-from-v1-to-v2.md">this guide</a> for migration instructions.</li>
<li><strong>v2.1</strong> - Adds <code>setPointOnViewerCenter</code>, <code>reset</code> methods and <code>className</code>, <code>style</code> props</li>
<li><strong>v2.2</strong> - Introduce tool <code>auto</code>, improve default toolbar</li>
</ul>
<h2>Contributing</h2>
<p>Your contributions (issues and pull request) are very appreciated!</p>
<h2>Author</h2>
<ul>
<li><a href="https://github.com/chrvadala">chrvadala</a></li>
</ul>
<h2>License</h2>
<p>MIT</p>
</div>`;

export default function Documentation() {
  return (<div className="doc" dangerouslySetInnerHTML={{__html: html}}></div>);
}
