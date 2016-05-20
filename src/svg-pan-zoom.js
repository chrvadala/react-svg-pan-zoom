import React from 'react';

const MODE_IDLE = 'idle';
const MODE_PANNING = 'panning';

class SvgPanZoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: {
        a: 1, c: 0, e: 0,
        b: 0, d: 1, f: 0
      }
    };
  }

  //componentDidMount() {
  //  let svgElement = this.refs.svg;
  //  this.setState({
  //    matrix: svgElement.createSVGMatrix()
  //  });
  //}

  _handleStartPanning(event) {
    let {matrix} = this.state;
    let x = event.clientX, y = event.clientY;

    this.setState({
      mode: MODE_PANNING,
      panningInfo: {
        startPoint: {x, y},
        startMatrix: Object.assign({}, matrix)
      }
    });
  }

  _handleUpdatePanning(event) {
    let state = this.state, props = this.props;
    let x = event.clientX, y = event.clientY;
    let {
      artboardWidth,
      artboardHeight,
      paperWidth,
      paperHeight
      } = props;

    if (state.mode === MODE_PANNING) {
      let {startPoint, startMatrix} = state.panningInfo;

      //the mouse exited and reentered from svg
      if(event.buttons === 0){
        this.setState({
          mode: MODE_IDLE
        });
        return;
      }

      let deltaX = startPoint.x - x;
      let deltaY = startPoint.y - y;

      let newXTranslation = startMatrix.e - deltaX;
      let newYTranslation = startMatrix.f - deltaY;

      //avoid that paper exit from screen
      let maxBounding = 50;
      newXTranslation = Math.min(newXTranslation, artboardWidth - maxBounding);
      newXTranslation = Math.max(newXTranslation, -(paperWidth - maxBounding));
      newYTranslation = Math.min(newYTranslation, artboardHeight - maxBounding);
      newYTranslation = Math.max(newYTranslation, -(paperHeight - maxBounding));

      let newMatrixComponents = {
        e: newXTranslation,
        f: newYTranslation
      };

      this.setState({
        matrix: Object.assign({}, startMatrix, newMatrixComponents)
      });
      event.preventDefault();
    }
  }

  _handleStopPanning(event) {
    let state = this.state;
    if (state.mode === MODE_PANNING) {
      this._handleUpdatePanning(event);
      this.setState({
        mode: MODE_IDLE
      });
    }
  }

  render() {

    let matrix = this.state.matrix;
    let DOMMatrix = `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`;

    return (
      <svg
        ref="svg"
        width={this.props.artboardWidth}
        height={this.props.artboardHeight}
        style={this.props.style}
        onMouseDown={ event => this._handleStartPanning(event) }
        onMouseMove={ event => this._handleUpdatePanning(event) }
        onMouseUp={ event => this._handleStopPanning(event) }
      >

        <rect
          fill={this.props.artboardBackground}
          x={0}
          y={0}
          width={this.props.artboardWidth}
          height={this.props.artboardHeight}/>

        <g ref="paper" transform={DOMMatrix}>
          <rect
            fill={this.props.paperBackground}
            x={0}
            y={0}
            width={this.props.paperWidth}
            height={this.props.paperHeight}/>
          <g ref="content">
            {this.props.children}
          </g>
        </g>
      </svg>
    );
  }
}

SvgPanZoom
  .propTypes = {
  //width of the container displayed on screen
  artboardWidth: React.PropTypes.number.isRequired,

  //height of the container displayed on screen
  artboardHeight: React.PropTypes.number.isRequired,

  //background of the artboard
  artboardBackground: React.PropTypes.string,

  //width of the paper
  paperWidth: React.PropTypes.number.isRequired,

  //height of the paper
  paperHeight: React.PropTypes.number.isRequired,

  //background of the paper
  paperBackground: React.PropTypes.string,

  //style of the SVG tag
  style: React.PropTypes.object
};

SvgPanZoom
  .defaultProps = {
  style: {},
  artboardBackground: "#616264",
  paperBackground: "#fff"
};

export
default
SvgPanZoom;
