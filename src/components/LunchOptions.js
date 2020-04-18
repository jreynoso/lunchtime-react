import React from "react"

export default function LunchOptions({ lunchOptions }) {
  console.log(lunchOptions)
  return (
    <div>
      {lunchOptions && lunchOptions.suggestion ?
        <div>
          <h2>Consider: {lunchOptions.suggestion.name}</h2>
        </div> :
        ''
      }
      {lunchOptions && lunchOptions.options ?
        <ul>
          {lunchOptions.options.map(lunchOption => (
            <li key={lunchOption.id}>
              {lunchOption.name}
            </li>
          ))}
        </ul> :
        <span>...</span>
      }
    </div>
  )
}