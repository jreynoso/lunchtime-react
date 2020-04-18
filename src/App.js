import React, { useState, useEffect } from "react"
import "./styles.css"
import LunchOptions from "./components/LunchOptions"
import fetchLunchOptions from "./service/Lunchtime"

export default function App() {
  const [lunchOptions, setLunchOptions] = useState(null)
  const [loc, setLoc] = useState(() => window.localStorage.getItem('loc') || '')
  const [mode, setMode] = useState(() => window.localStorage.getItem('mode') || 'walk')

  useEffect(() => {
    console.log('Getting geolocation')
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('Got geolocation')
      const lat = position.coords.latitude
      const long = position.coords.longitude
      const location = `${lat},${long}`
      console.log(`lat=${lat}`)
      console.log(`long=${long}`)
      setLoc(location)
    })
  }, [])

  useEffect(() => {
    console.log('App.useEffect[loc, mode] called')
    window.localStorage.setItem('loc', loc)
    window.localStorage.setItem('mode', mode)

    if (loc && mode) {
      fetchLunchOptions(loc, mode).then(resultData => {
        setLunchOptions(resultData)
      })
    }
  }, [loc, mode])

  const handleSubmit = (event) => {
    event.preventDefault()
    fetchLunchOptions(loc, mode).then(resultData => {
      setLunchOptions(resultData)
    })
  }

  const handleChange = (event) => {
    console.log(event.target)
    setMode(event.target.value)
  }

  console.log('App rendering')

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
      <LunchOptions lunchOptions={lunchOptions} />
    </div>
  )
}
