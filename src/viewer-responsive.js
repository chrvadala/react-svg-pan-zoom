import React from 'react';
import Dimensions from 'react-dimensions';
import Viewer from './viewer';

class ViewerResponsive extends React.Component {
  render() {
    let {containerWidth, containerHeight, children, ...props} = this.props;
    return (
      <Viewer {...props} width={containerWidth} height={containerHeight}>
        {children}
      </Viewer>
    )
  }
}

export default Dimensions()(ViewerResponsive)
