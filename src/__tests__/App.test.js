import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Faker from 'faker'
import { render } from '@testing-library/react'
import App from '../App'

test('should render page with default mode selected and enabled submit button', () => {
  const mockPosition = {
    coords: {
      latitude: Faker.address.latitude(),
      longitude: Faker.address.longitude()
    }
  }
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce(success => Promise.resolve(
      success(mockPosition))
    ),
    clearWatch: jest.fn(),
    watchPosition: onChange => {
      onChange(mockPosition)
      return Faker.random.uuid()
    }
  }

  const testRender = render(<App/>)
  expect(testRender.getByLabelText('How will you get there?')).toHaveValue('walk')
  expect(testRender.getByText('Let\'s Eat!')).toBeEnabled()
})
