import React, {PropTypes} from 'react';

export default function If({condition, children}) {
  children = <div>{children}</div>;
  return condition ? children : null;
}

If.propTypes = {
  condition: PropTypes.bool.isRequired
};
