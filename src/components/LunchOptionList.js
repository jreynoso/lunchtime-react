import React from 'react'
import PropTypes from 'prop-types'
import LunchOption from './LunchOption'
import LunchSuggestion from './LunchSuggestion'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
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
      {lunchOptions.suggestion && <Row>
        <Col sm={12}><LunchSuggestion {...lunchOptions.suggestion} /></Col>
      </Row>}
      {lunchOptionList && <>
        {lunchOptionList.map((lunchOption, index) =>
          <Row key={lunchOption.id}>
            <Col sm={12}>
              <LunchOption
                lastItem={index === lunchOptionList.length - 1}
                bgColor={index % 2 === 0 ? 'none' : '#e9ecef'}
                {...lunchOption}/>
            </Col>
          </Row>
        )}
      </>
      }
    </>
  )
}

LunchOptionList.propTypes = {
  lunchOptions: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}
