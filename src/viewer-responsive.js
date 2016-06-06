import React from 'react';
import Dimensions from 'react-dimensions';
import Viewer from './viewer';

class ViewerResponsive extends React.Component {
  render() {
    let {containerWidth, containerHeight, width, height, children, ...props} = this.props;
    width = width || containerWidth; height = height || containerHeight;
    return (
      <Viewer {...props} width={width} height={height}>
        {children}
      </Viewer>
    )
  }
}

export default Dimensions()(ViewerResponsive)
