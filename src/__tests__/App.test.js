import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import Faker from 'faker'
import { render } from '@testing-library/react'
import App from '../App'

test('should render page with mode buttons enabled', async () => {
  const mockPosition = {
    coords: {
      latitude: parseFloat(Faker.address.latitude()),
      longitude: parseFloat(Faker.address.longitude())
    }
  }
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce(success => Promise.resolve(
      success(mockPosition))
    )
  }

  const testRender = await render(<App/>)
  expect(testRender.getByText('Walk')).toBeEnabled()
  expect(testRender.getByText('Scoot')).toBeEnabled()
  expect(testRender.getByText('Drive')).toBeEnabled()
})
