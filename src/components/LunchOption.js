import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-bootstrap/Media'
import Rating from './Rating'

export default function LunchOption ({ name, imageUrl, address, rating }) {
  return (
    <Media as="li">
      <img
        width={64}
        height={64}
        className="mr-3"
        src={imageUrl}
        alt="lunch option"
      />
      <Media.Body>
        <h5>{name}</h5>
        <p><Rating rating={rating}/> {address}</p>
      </Media.Body>
    </Media>
  )
}

LunchOption.propTypes = {
  address: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number
}
