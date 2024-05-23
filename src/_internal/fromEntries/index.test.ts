/* eslint-disable import/extensions */
import { fromEntries } from './'

it('creates object from entries array', () => {
  const result = fromEntries([['yobta', 'param']])
  expect(result).toEqual({ yobta: 'param' })
})

it('creates object from URLSerchParams instance', () => {
  const params = new URLSearchParams('yobta=param')
  const result = fromEntries(params)
  expect(result).toEqual({ yobta: 'param' })
})

it('creates object from FormData instance', () => {
  const params = new FormData()
  params.set('yobta', 'param')
  const result = fromEntries(params)
  expect(result).toEqual({ yobta: 'param' })
})

it('understands arrays', () => {
  const params = new FormData()
  params.append('yobta', 'yobta 1')
  params.append('yobta', 'yobta 2')
  const result = fromEntries(params)
  expect(result).toEqual({ yobta: ['yobta 1', 'yobta 2'] })
})
