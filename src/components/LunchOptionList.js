import React from "react"
import PropTypes from "prop-types"
import LunchOption from "./LunchOption";
import LunchSuggestion from "./LunchSuggestion";

export default function LunchOptionList({ lunchOptions }) {
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
      {lunchOptions.suggestion && <LunchSuggestion {...lunchOptions.suggestion} />}
      {lunchOptionList && <>
      <h2>Other options:</h2>
      <ul>
        {lunchOptionList.map(lunchOption => <LunchOption key={lunchOption.id} {...lunchOption} />)}
      </ul></>
      }
    </div>
  )
}

LunchOptionList.propTypes = {
  lunchOptions: PropTypes.object,
}