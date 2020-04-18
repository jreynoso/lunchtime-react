import React, { useState, useEffect } from "react"
import "./styles.css"
import LunchOptionList from "./components/LunchOptionList"
import fetchLunchOptions from "./service/Lunchtime"

export default function App() {
  const [lunchOptions, setLunchOptions] = useState(null)
  const [loc, setLoc] = useState(null)
  const [mode, setMode] = useState(() => window.localStorage.getItem('mode') || 'walk')

  useEffect(() => {
    if (!loc) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude
        const long = position.coords.longitude
        const location = `${lat},${long}`
        setLoc(location)
      })
    }
    return () => setLoc(null)
  }, [])

  const handleFetchLunchOptions = (loc, mode) => {
    fetchLunchOptions(loc, mode).then(
      resultData => setLunchOptions(resultData),
      () => setLunchOptions('error')
    )
  }

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
      <h1>It's Lunchtime!</h1>
      <h2>(somewhere)</h2>
      <h3>I bet you're getting hungry...</h3>
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
        <button type="submit">Let's Eat!</button>
      </form>
      <hr/>
      <LunchOptionList lunchOptions={lunchOptions} />
    </div>
  )
}
