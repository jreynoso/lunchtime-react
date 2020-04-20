import React from 'react'
import PropTypes from 'prop-types'

export default function LunchOption ({ name }) {
  return (
    <li>{name}</li>
  )
}

LunchOption.propTypes = {
  name: PropTypes.string
}
