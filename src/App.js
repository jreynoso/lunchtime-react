import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import LunchOptionList from './components/LunchOptionList'
import fetchLunchOptions from './service/Lunchtime'

export default function App () {
  const [loc, setLoc] = useState(null)
  const [error, setError] = useState(null)
  const [lunchOptions, setLunchOptions] = useState(null)
  const [mode, setMode] = useState(() => window.localStorage.getItem('mode'))

  const handleFetchLunchOptions = (loc, mode) => {
    fetchLunchOptions(loc, mode).then(
      resultData => setLunchOptions(resultData),
      () => setLunchOptions('error')
    )
  }

  const onChange = ({ coords }) => {
    setLoc(`${coords.latitude},${coords.longitude}`)
  }

  const onError = (error) => {
    setError(error.message)
  }

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported')
      return
    }
    const watcher = navigator.geolocation.watchPosition(onChange, onError)
    return () => watcher && navigator.geolocation.clearWatch(watcher)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('mode', mode)
    if (loc && mode) {
      handleFetchLunchOptions(loc, mode)
    }
    return () => setLunchOptions(null)
  }, [loc, mode])

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <Container fluid>
      <Navbar bg="dark" expand="md">
        <Navbar.Brand href="./">
          <img
            alt="Lunchtime!"
            src="/img/lunchtime-full.svg"
            width="400"
            height="80"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline>
            <ButtonGroup title={'How will you get there?'} size="lg">
              <Button variant="outline-light" disabled={!loc} onClick={handleChange} value="walk">{'Walk'}</Button>
              <Button variant="outline-light" disabled={!loc} onClick={handleChange} value="scoot">{'Scoot'}</Button>
              <Button variant="outline-light" disabled={!loc} onClick={handleChange} value="drive">{'Drive'}</Button>
            </ButtonGroup>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      {error && <Alert variant="danger">{error}</Alert>}
      <LunchOptionList lunchOptions={lunchOptions}/>
      <Navbar fixed="bottom" bg="dark" expand="lg" variant="dark">
        <Nav className="justify-content-end">
          <Navbar.Text>
            {'Copyright © '}
            <a href="http://dispassionproject.com/">{' dispassionproject '}</a>
            {new Date().getFullYear()}
            {'.'}
          </Navbar.Text>
        </Nav>
      </Navbar>
    </Container>
  )
}
