/* eslint-disable import/extensions */
import { YobtaError } from './'

it('extends Error', () => {
  const error = new YobtaError({ field: '@', message: 'yobta', path: [] })
  expect(error instanceof Error).toBe(true)
})

it('has metadata', () => {
  const error = new YobtaError({ field: 'f1', message: 'yobta', path: ['yobta'] })
  expect(error.field).toBe('f1')
  expect(error.message).toBe('yobta')
  expect(error.path).toEqual(['yobta'])
})
