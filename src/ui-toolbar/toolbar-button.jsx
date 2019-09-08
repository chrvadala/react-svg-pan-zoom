import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  POSITION_TOP, POSITION_BOTTOM
} from '../constants';

const ToolbarButton = (props) => {
  const [hover, setHover] = useState(false)

  function change(event) {
    event.preventDefault();
    event.stopPropagation();

    switch (event.type) {
      case 'mouseenter':
      case 'touchstart':
        setHover(true);
        break;
      case 'mouseleave':
      case 'touchend':
      case 'touchcancel':
        setHover(false);
        break;
    }
  }

  const {title, name, active, toolbarPosition, onClick, children} = props;

  let style = {
    display: "block",
    width: "24px",
    height: "24px",
    margin: [POSITION_TOP, POSITION_BOTTOM].indexOf(toolbarPosition) >= 0 ? "2px 1px" : "1px 2px",
    color: active || hover ? '#1CA6FC' : '#FFF',
    transition: "color 200ms ease",
    background: "none",
    padding: "0px",
    border: "0px",
    outline: "0px",
    cursor: "pointer"
  };

  return (
    <button
      onMouseEnter={e => change(e)}
      onMouseLeave={e => change(e)}

      onTouchStart={e => {
        change(e);
        onClick(e);
      }}
      onTouchEnd={e => change(e)}
      onTouchCancel={e => change(e)}

      onClick={onClick}

      style={style}
      title={title}
      name={name}
      role="button"
      type="button"
    >{children}</button>
  )
}

ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  toolbarPosition: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired
};

export default ToolbarButton;
