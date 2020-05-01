import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LunchOptionList from './components/LunchOptionList'
import fetchLunchOptions from './service/Lunchtime'

export default function App () {
  const [loc, setLoc] = useState(null)
  const [error, setError] = useState(null)
  const [lunchOptions, setLunchOptions] = useState(null)
  const [mode, setMode] = useState(() => window.localStorage.getItem('mode') || 'walk')

  const handleFetchLunchOptions = (loc, mode) => {
    fetchLunchOptions(loc, mode).then(
      resultData => setLunchOptions(resultData),
      () => setLunchOptions('error')
    )
  }

  const onChange = ({ coords }) => {
    setLoc(`${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`)
  }

  const onError = (error) => {
    setError(`Failed to get location: ${error.message}`)
  }

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported')
      return
    }
    const options = {
      enableHighAccuracy: false,
      timeout: 10000
    }
    navigator.geolocation.getCurrentPosition(onChange, onError, options)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('mode', mode)
    if (loc && mode) {
      handleFetchLunchOptions(loc, mode)
    }
    return () => setLunchOptions(null)
  }, [loc, mode])

  const handleChange = (event) => {
    if (mode !== event.target.value) {
      setMode(event.target.value)
    } else if (loc && mode) {
      handleFetchLunchOptions(loc, mode)
    }
  }

  return (
    <>
      <Navbar bg="dark" expand="sm">
        <Navbar.Brand href="./">
          <img
            alt="Lunchtime!"
            src="/img/lunchtime-full.svg"
            width="305"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <ButtonGroup title={'How will you get there?'} size="lg" className="ml-auto">
            <Button variant="outline-light" disabled={!loc} onClick={handleChange} value="walk">{'Walk'}</Button>
            <Button variant="outline-light" disabled={!loc} onClick={handleChange} value="scoot">{'Scoot'}</Button>
            <Button variant="outline-light" disabled={!loc} onClick={handleChange} value="drive">{'Drive'}</Button>
          </ButtonGroup>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        {error && <Alert variant="danger">{error}</Alert>}
        <LunchOptionList lunchOptions={lunchOptions}/>
      </Container>
      <Navbar fixed="bottom" bg="dark" expand="lg" variant="dark">
        <Nav className="m-auto">
          <Navbar.Text>
            {'Copyright © '}
            <a href="http://dispassionproject.com/">{' dispassionproject '}</a>
            {new Date().getFullYear()}
            {'.'}
          </Navbar.Text>
        </Nav>
      </Navbar>
    </>
  )
}
