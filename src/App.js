import React from "react"
import "./styles.css"

import LunchtimeForm from "./components/LunchtimeForm"
import LunchOptions from "./components/LunchOptions"

export default function App() {
  const [lunchOptions, setLunchOptions] = React.useState(null)

  return (
    <div className="App">
      <h1>It's Lunchtime!</h1>
      <h2>(somewhere)</h2>
      <h3>I bet you're getting hungry...</h3>
      <hr/>
      <LunchtimeForm setLunchOptions={setLunchOptions}/>
      <hr/>
      <LunchOptions lunchOptions={lunchOptions}/>
    </div>
  )
}
