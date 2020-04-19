import React from 'react'
import PropTypes from 'prop-types'

export default function LunchSuggestion ({ name }) {
  return (
    <h2>Consider: {name}</h2>
  )
}

LunchSuggestion.propTypes = {
  name: PropTypes.string
}
