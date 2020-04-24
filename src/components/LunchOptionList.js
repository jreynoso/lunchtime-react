import React from 'react'
import PropTypes from 'prop-types'
import LunchOption from './LunchOption'
import LunchSuggestion from './LunchSuggestion'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

export default function LunchOptionList ({ lunchOptions }) {
  if (!lunchOptions) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
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
    <Container>
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
    </Container>
  )
}

LunchOptionList.propTypes = {
  lunchOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}
