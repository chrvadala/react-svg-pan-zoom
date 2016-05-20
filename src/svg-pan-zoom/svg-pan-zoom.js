import React from 'react';

class SvgPanZoom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg
        width={this.props.artboardWidth}
        height={this.props.artboardHeight}
        style={this.props.style}
      >

        <rect
          fill={this.props.artboardBackground}
          x={0}
          y={0}
          width={this.props.artboardWidth}
          height={this.props.artboardHeight}/>

        <g ref="paper">
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

SvgPanZoom.propTypes = {
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

SvgPanZoom.defaultProps = {
  style: {},
  artboardBackground: "#616264",
  paperBackground: "#fff"
};

export default SvgPanZoom;
