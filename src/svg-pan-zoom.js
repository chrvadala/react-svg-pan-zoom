import React from 'react';
import MatrixHelper from './matrix-helper';

const MODE_IDLE = 'idle';
const MODE_PANNING = 'panning';
const MODE_ZOOMING = 'zooming';

class SvgPanZoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: MatrixHelper.identity(),
      mode: MODE_IDLE
    };
  }

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
      if (event.buttons === 0) {
        this.setState({
          mode: MODE_IDLE
        });
        return;
      }

      let translation = MatrixHelper.extractTranslation(startMatrix);

      let deltaX = startPoint.x - x;
      let deltaY = startPoint.y - y;

      let XTranslation = translation.x - deltaX;
      let YTranslation = translation.y - deltaY;

      //avoid that paper exit from screen
      let maxBounding = 50;
      XTranslation = Math.min(XTranslation, artboardWidth - maxBounding);
      XTranslation = Math.max(XTranslation, -(paperWidth - maxBounding));
      YTranslation = Math.min(YTranslation, artboardHeight - maxBounding);
      YTranslation = Math.max(YTranslation, -(paperHeight - maxBounding));

      this.setState({
        matrix: MatrixHelper.translate(startMatrix, XTranslation, YTranslation)
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

  _handleZoom(event) {
    let {matrix} = this.state;
    let x = event.nativeEvent.offsetX, y = event.nativeEvent.offsetY;

    if (event.shiftKey) {
      this.setState({
        matrix: MatrixHelper.scale(matrix, 1.1, x, y)
      });
    }
  }

  render() {

    let matrix = this.state.matrix;

    return (
      <svg
        ref="svg"
        width={this.props.artboardWidth}
        height={this.props.artboardHeight}
        style={this.props.style}
        onMouseDown={ event => {this._handleZoom(event); this._handleStartPanning(event)} }
        onMouseMove={ event => this._handleUpdatePanning(event) }
        onMouseUp={ event => this._handleStopPanning(event) }
      >

        <rect
          fill={this.props.artboardBackground}
          x={0}
          y={0}
          width={this.props.artboardWidth}
          height={this.props.artboardHeight}/>

        <g ref="paper" transform={MatrixHelper.stringify(matrix)}>
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
