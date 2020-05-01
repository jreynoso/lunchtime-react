import React from 'react'
import PropTypes from 'prop-types'
import Jumbotron from 'react-bootstrap/Jumbotron'
import LunchOption from './LunchOption'

export default function LunchSuggestion (lunchOptions) {
  const options = {
    type: 'div',
    ...lunchOptions
  }
  return (
    <Jumbotron>
      <h2>Consider:</h2>
      <LunchOption {...options} />
    </Jumbotron>
  )
}

LunchSuggestion.propTypes = {
  lunchOptions: PropTypes.object
}
