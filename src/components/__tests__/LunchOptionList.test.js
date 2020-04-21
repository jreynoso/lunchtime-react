import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Faker from 'faker'
import { render } from '@testing-library/react'
import LunchOptionList from '../LunchOptionList'

test('should show loading text when no lunch options', () => {
  const testLunchOptions = null
  const { getByText } = render(
    <LunchOptionList lunchOptions={testLunchOptions} />
  )
  expect(getByText('Loading...')).toBeInTheDocument()
})

test('should show error text when lunch options is error', () => {
  const errorLunchOptions = 'error'
  const { getByText } = render(
    <LunchOptionList lunchOptions={errorLunchOptions} />
  )
  expect(getByText('Unable to retrieve lunch options.')).toBeInTheDocument()
})

test('should show no lunch options text when no lunch options present', () => {
  const noLunchOptions = {}
  const { getByText } = render(
    <LunchOptionList lunchOptions={noLunchOptions} />
  )
  expect(getByText('No lunch options within range. :(')).toBeInTheDocument()
})

test('should show the lunch suggestion in lunch options', () => {
  const testSuggestedLunchOption = lunchOption()
  const testOtherLunchOption = lunchOption()
  const testLunchOptions = {
    suggestion: testSuggestedLunchOption,
    options: [testSuggestedLunchOption, testOtherLunchOption]
  }
  const { getByText } = render(
    <LunchOptionList lunchOptions={testLunchOptions} />
  )

  expect(getByText(testSuggestedLunchOption.name)).toBeInTheDocument()
  expect(getByText(testOtherLunchOption.name)).toBeInTheDocument()
})

function lunchOption (name = Faker.company.companyName()) {
  return {
    id: Faker.random.uuid(),
    name: name
  }
}
