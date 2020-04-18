import React from "react"

const dummyLunchOptions = {
  suggestion: {
    id: 'kurrytako',
    name: 'Kurry Tako'
  },
  options: [
    {
      id: 'lazarus',
      name: "Lazarus"
    },
    {
      id: 'kurrytako',
      name: 'Kurry Tako'
    }
  ]
}

export default function LunchtimeForm({ setLunchOptions }) {
  const [loc, setLoc] = React.useState(
    window.localStorage.getItem('loc') || '30.266406,-97.7090863' // TODO: get local pos
  )

  const [mode, setMode] = React.useState(
    window.localStorage.getItem('mode') || 'walk'
  )

  const [action, setAction] = React.useState('pending')

  React.useEffect(() => {
    window.localStorage.setItem('loc', loc)
    window.localStorage.setItem('mode', mode)

    if (!loc || !mode || action === 'pending') {
      console.log(`not ready: loc=${loc}, mode=${mode}, action=${action}`)
      return
    }
    fetchLunchOptions(loc, mode).then(resultData => {
      setLunchOptions(resultData)
    })

    return () => {
      setLunchOptions(null)
      setAction('pending')
    }
  }, [setLunchOptions, loc, mode, action])

  function handleSubmit(event) {
    event.preventDefault()
    setAction('ready')
  }

  const handleLocChange = event => setLoc(event.target.value)

  const handleModeChange = event => setMode(event.target.value)

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="locInput">Where are you?</label>
        <input id="locInput" type="text" value={loc} onChange={handleLocChange}/>
      </div>
      <div>
        <label htmlFor="modeInput">How will you get there?</label>
        <select id="modeInput" value={mode} onChange={handleModeChange}>
          <option value="walk">Walk</option>
          <option value="scoot">Scoot</option>
          <option value="drive">Drive</option>
        </select>
      </div>
      <button type="submit">Let's Eat!</button>
    </form>
  )
}

function fetchLunchOptions(loc, mode) {
  const lunchOptionsQuery = `loc=${loc}&mode=${mode}`

  return window.fetch(`http://localhost:8080/lunchtime?${lunchOptionsQuery}`)
  .then(r => r.json())
  .then(response => response || dummyLunchOptions)
}