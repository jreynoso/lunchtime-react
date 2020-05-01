import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-bootstrap/Media'
import Nav from 'react-bootstrap/Nav'
import Rating from './Rating'

export default function LunchOption ({ name, imageUrl, address, rating, type = 'li' }) {
  const getGoogleMapsLink = (name) => {
    return `https://www.google.com/maps/search/${encodeURIComponent(name).replace(/%20/g, '+')}`
  }

  return (
    <Media as={type}>
      <Nav.Link href={getGoogleMapsLink(name)} className="mt-auto mb-auto">
        <img
          width={80}
          height={80}
          className="m-3"
          src={imageUrl}
          alt="lunch option"
        />
      </Nav.Link>
      <Media.Body className="mt-auto mb-auto py-3">
        <h5>{name}</h5>
        <Rating rating={rating}/>
        <p>{address}</p>
      </Media.Body>
    </Media>
  )
}

LunchOption.propTypes = {
  address: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  type: PropTypes.string
}
