import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-bootstrap/Media'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Rating from './Rating'
import { Mixpanel } from '../mixpanel'

export default function LunchOption ({ name, imageUrl, address, rating, lastItem, bgColor = 'none' }) {
  const followLink = (evt, name) => {
    evt.preventDefault()
    Mixpanel.track('lunch_option_visited', { name })
    window.location.href = `https://www.google.com/maps/search/${encodeURIComponent(name).replace(/%20/g, '+')}`
  }

  return (
    <Navbar>
      <Nav style={{ background: bgColor, width: '100%', marginBottom: lastItem ? 60 : 0 }}>
        <Nav.Link href="#" onClick={(e) => followLink(e, name)} className="mt-auto mb-auto" style={{ width: '100%' }}>
          <Media>
            <img
              width={80}
              height={80}
              className="m-3"
              src={imageUrl}
              alt="lunch option"
            />
            <Media.Body className="mt-auto mb-auto py-3">
              <h5>{name}</h5>
              <Rating rating={rating}/>
              <p>{address}</p>
            </Media.Body>
          </Media>
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

LunchOption.propTypes = {
  address: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  rating: PropTypes.number,
  lastItem: PropTypes.bool,
  bgColor: PropTypes.string
}
