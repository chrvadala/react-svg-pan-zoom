import React, {PropTypes, Component} from 'react';

export default class Link extends Component {

  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  render() {
    return (
      <a
        onMouseEnter={e => this.setState({hover: true})}
        onMouseLeave={e => this.setState({hover: false})}
        onClick={this.props.onClick}
        style={this.state.hover ? this.props.styleHover : this.props.style}
        title={this.props.title}
        href="javascript:;"
      >{this.props.children}</a>
    )
  }

}

Link.propTypes = {
  style: PropTypes.object.isRequired,
  styleHover: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
