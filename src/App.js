import React, { useState, useEffect } from 'react'
import './styles.css'
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
  }, [loc, mode])

  const handleSubmit = (event) => {
    event.preventDefault()
    handleFetchLunchOptions(loc, mode)
  }

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <div className="App">
      {error && <div className="error">{error}</div>}
      <h1>It&apos;s Lunchtime!</h1>
      <h2>(somewhere)</h2>
      <h3>I bet you&apos;re getting hungry...</h3>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="modeInput">How will you get there?</label>
          <select id="modeInput" value={mode} onChange={handleChange} >
            <option value="walk">Walk</option>
            <option value="scoot">Scoot</option>
            <option value="drive">Drive</option>
          </select>
        </div>
        <button disabled={!loc} type="submit">Let&apos;s Eat!</button>
      </form>
      <hr/>
      <LunchOptionList lunchOptions={lunchOptions} />
    </div>
  )
}
