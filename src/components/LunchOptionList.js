import React from 'react'
import PropTypes from 'prop-types'
import LunchOption from './LunchOption'
import LunchSuggestion from './LunchSuggestion'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'

export default function LunchOptionList ({ lunchOptions }) {
  if (!lunchOptions) {
    return (
      <Row style={{ position: 'fixed', top: '50%', left: '50%' }}>
        <Spinner variant="dark" animation="border" role="status" className="m-auto my-auto">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Row>
    )
  }
  if (lunchOptions === 'error') {
    return <Alert variant="danger">Unable to retrieve lunch options.</Alert>
  }
  if (!lunchOptions.options || lunchOptions.options.length === 0) {
    return <Alert variant="warning">No lunch options within range. :(</Alert>
  }

  const lunchOptionList = lunchOptions.options.filter(lunchOption => lunchOption.id !== lunchOptions.suggestion.id)
  return (
    <>
      {lunchOptions.suggestion && <LunchSuggestion {...lunchOptions.suggestion} />}
      {lunchOptionList && <>
        <h2>Other options:</h2>
        <ul className="list-unstyled">
          {lunchOptionList.map(lunchOption => <LunchOption key={lunchOption.id} {...lunchOption} />)}
        </ul>
        <br/>
        <br/>
      </>
      }
    </>
  )
}

LunchOptionList.propTypes = {
  lunchOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}
