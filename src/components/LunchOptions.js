import React from "react"
import PropTypes from "prop-types"

export default function LunchOptions({ lunchOptions }) {
  console.log(`LunchOptions lunchOptions=${lunchOptions}`)

  if (!lunchOptions) {
    return '...'
  }

  if (lunchOptions === 'error') {
    return `Unable to retrieve lunch options`
  }

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

LunchOptions.propTypes = {
  lunchOptions: PropTypes.object,
}