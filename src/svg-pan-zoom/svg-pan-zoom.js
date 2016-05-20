import React from 'react';

class SvgPanZoom extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <svg
        width={this.props.artboardWidth}
        height={this.props.artboardHeight}
        style={this.props.style}
      >
        {this.props.children}
      </svg>
    );
  }
}

SvgPanZoom.propTypes = {
  //width of the container displayed on screen
  artboardWidth: React.PropTypes.number.isRequired,

  //height of the container displayed on screen
  artboardHeight: React.PropTypes.number.isRequired,

  //width of the paper
  paperWidth: React.PropTypes.number.isRequired,

  //height of the paper
  paperHeight: React.PropTypes.number.isRequired,

  //style of the SVG tag
  style: React.PropTypes.object
};

SvgPanZoom.defaultProps = {
  style: {}
};

export default SvgPanZoom;
