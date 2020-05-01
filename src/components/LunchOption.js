import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-bootstrap/Media'
import Nav from 'react-bootstrap/Nav'
import Rating from './Rating'

export default function LunchOption ({ name, imageUrl, address, rating }) {

  const getGoogleMapsLink = (name) => {
    return `https://www.google.com/maps/search/${encodeURIComponent(name).replace(/%20/g, '+')}`
  }

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
        <Nav.Link href={getGoogleMapsLink(name)}>
          <h5>{name}</h5>
          <Rating rating={rating}/>
          <p>{address}</p>
        </Nav.Link>
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
