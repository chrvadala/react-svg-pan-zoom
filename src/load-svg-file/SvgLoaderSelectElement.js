import React from 'react'
import PropTypes from 'prop-types'
import { SvgProxy } from 'react-svgmt'

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const SvgLoaderSelectElement = (props) => {
    const { selector, ...other } = props
    return (
        <SvgProxy selector={selector} {...other} />
    )
}

SvgLoaderSelectElement.defaultProps = {
    selector: PropTypes.string.isRequired
}

export {SvgLoaderSelectElement}