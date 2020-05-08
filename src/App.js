import React, { useState, useEffect } from 'react'
import mixpanel from 'mixpanel-browser'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { FaCarSide } from 'react-icons/fa'
import { RiEBike2Line, RiWalkLine } from 'react-icons/ri'
import LunchOptionList from './components/LunchOptionList'
import fetchLunchOptions from './service/Lunchtime'
import { getGeoLocation, getIpAddress } from './service/Location'
import config from './config/config.json'

const env = process.env.NODE_ENV || 'development'
const envConfig = config[env]
if (envConfig && envConfig.mixpanel_token) {
  mixpanel.init(envConfig.mixpanel_token)
}

export default function App () {
  const [ipAddress, setIpAddress] = useState(null)
  const [loc, setLoc] = useState(null)
  const [error, setError] = useState(null)
  const [lunchOptions, setLunchOptions] = useState(null)
  const [mode, setMode] = useState(() => window.localStorage.getItem('mode') || 'walk')

  const handleFetchLunchOptions = (loc, mode) => {
    fetchLunchOptions(loc, mode).then(
      (resultData) => {
        if (mixpanel) {
          const opts = {
            mode,
            options: (resultData && resultData.options) ? resultData.options.length : 0
          }
          mixpanel.track('page_view', opts)
        }
        setLunchOptions(resultData)
      },
      () => {
        if (mixpanel) {
          mixpanel.track('page_view_error', { loc, mode })
        }
        setLunchOptions('error')
      }
    )
  }

  const onChange = ({ coords }) => {
    setLoc(`${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`)
  }

  const onError = (error) => {
    setError(`Failed to get location: ${error.message}`)
  }

  useEffect(() => {
    getIpAddress().then((ip) => setIpAddress(ip))
  }, [])

  useEffect(() => {
    if (ipAddress && mixpanel) {
      mixpanel.identify(ipAddress)
    }
  }, [ipAddress])

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      return getGeoLocation(onChange, onError)
    }
    const options = {
      enableHighAccuracy: false,
      timeout: 10000
    }
    const handleUserDeniesGeoLocation = () => getGeoLocation(onChange, onError)
    navigator.geolocation.getCurrentPosition(onChange, handleUserDeniesGeoLocation, options)
  }, [])

  useEffect(() => {
    window.localStorage.setItem('mode', mode)
    if (loc && mode) {
      handleFetchLunchOptions(loc, mode)
    }
    return () => setLunchOptions(null)
  }, [loc, mode])

  const handleChange = (value) => {
    if (value && value !== mode) {
      setMode(value)
    } else if (loc && mode) {
      handleFetchLunchOptions(loc, mode)
    }
  }

  return (
    <>
      <Navbar bg="dark" expand="sm">
        <Navbar.Brand href="./" style={{ maxWidth: 280, marginRight: 0 }}>
          <img
            alt="Lunchtime!"
            src="/img/lunchtime-full.svg"
            width="100%"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-center" style={{ width: '100%' }}>
            <ButtonGroup title={'How will you get there?'} size="lg" className="ml-auto">
              <Button
                variant="outline-light"
                disabled={!loc}
                active={mode === 'walk'}
                onClick={() => handleChange('walk')}
                data-testid="Walk"
              >
                <RiWalkLine/>
              </Button>
              <Button
                variant="outline-light"
                disabled={!loc}
                active={mode === 'scoot'}
                onClick={() => handleChange('scoot')}
                data-testid="Scoot"
              >
                <RiEBike2Line/>
              </Button>
              <Button
                variant="outline-light"
                disabled={!loc}
                active={mode === 'drive'}
                onClick={() => handleChange('drive')}
                data-testid="Drive"
              >
                <FaCarSide/>
              </Button>
            </ButtonGroup>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid="sm">
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
