import React, {PropTypes, Component} from 'react';

export default class Link extends Component {
  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  change(event) {
    event.preventDefault();
    event.stopPropagation();

    switch (event.type) {
      case 'mouseenter':
      case 'touchstart':
        this.setState({hover: true});
        break;
      case 'mouseleave':
      case 'touchend':
      case 'touchcancel':
        this.setState({hover: false});
        break;
    }
  }

  render() {
    return (
      <a
        onMouseEnter={e => this.change(e)}
        onMouseLeave={e => this.change(e)}

        onTouchStart={e => {
          this.change(e);
          this.props.onClick(e);
        }}
        onTouchEnd={e => this.change(e)}
        onTouchCancel={e => this.change(e)}

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
