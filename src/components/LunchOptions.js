import React from "react"
import PropTypes from "prop-types"

export default function LunchOptions({ lunchOptions }) {
  if (lunchOptions === 'error') {
    return <div className="error">`Unable to retrieve lunch options`</div>
  }

  return (
    <div>
      {!lunchOptions &&
      <span>...</span>
      }
      {lunchOptions && lunchOptions.suggestion &&
      <h2>Consider: {lunchOptions.suggestion.name}</h2>
      }
      {lunchOptions && lunchOptions.options &&
      <ul>
        {lunchOptions.options.map(lunchOption => (
          <li key={lunchOption.id}>
            {lunchOption.name}
          </li>
        ))}
      </ul>
      }
    </div>
  )
}

LunchOptions.propTypes = {
  lunchOptions: PropTypes.object,
}