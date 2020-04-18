import React from "react"
import PropTypes from "prop-types"

export default function LunchOptions({ lunchOptions }) {
  if (!lunchOptions) {
    return <span>...</span>
  }
  if (lunchOptions === 'error') {
    return <div className="error">Unable to retrieve lunch options.</div>
  }
  if (!lunchOptions.options || lunchOptions.options.length === 0) {
    return <div>No lunch options within range. :(</div>
  }

  const lunchOptionList = lunchOptions.options.filter(lunchOption => lunchOption.id !== lunchOptions.suggestion.id)
  return (
    <div>
      {lunchOptions.suggestion &&
      <h2>Consider: {lunchOptions.suggestion.name}</h2>
      }
      {lunchOptionList &&
      <><h2>Other options:</h2>
      <ul>
        {lunchOptionList.map(lunchOption => (
          <li key={lunchOption.id}>
            {lunchOption.name}
          </li>
        ))}
      </ul></>
      }
    </div>
  )
}

LunchOptions.propTypes = {
  lunchOptions: PropTypes.object,
}