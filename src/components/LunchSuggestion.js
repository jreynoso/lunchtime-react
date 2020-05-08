import React from 'react'
import PropTypes from 'prop-types'
import Jumbotron from 'react-bootstrap/Jumbotron'
import LunchOption from './LunchOption'

export default function LunchSuggestion (lunchOptions) {
  return (
    <Jumbotron style={{ padding: '4rem' }}>
      <h2>Consider:</h2>
      <LunchOption {...lunchOptions} />
    </Jumbotron>
  )
}

LunchSuggestion.propTypes = {
  lunchOptions: PropTypes.object
}
