import React from 'react'
import PropTypes from 'prop-types'
import { SvgLoader } from 'react-svgmt'

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const ReactSvgPanZoomLoader = (props) => {
    return (
        <div>
            {props.render(
                <SvgLoader path={props.src}>
                    {props.proxy}
                </SvgLoader>
            )}
        </div>
    )
}

ReactSvgPanZoomLoader.defaultProps = {
    proxy: ""
}

ReactSvgPanZoomLoader.propTypes = {
    src: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    proxy: PropTypes.node
}

export {ReactSvgPanZoomLoader}
