import React from 'react'
import PropTypes from 'prop-types'
import Badge from 'react-bootstrap/Badge'

export default function Rating ({ rating }) {
  const stars = ''.padEnd(Math.round(rating), '☆')
  return (
    <Badge pill variant="dark">
      {stars}
    </Badge>
  )
}

Rating.propTypes = {
  rating: PropTypes.number
}
