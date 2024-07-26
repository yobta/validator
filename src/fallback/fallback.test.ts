/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { string } from '../string'
import { fallback } from './fallback'

const validate = createValidator(fallback(() => 'yobta'))

test('undefined', () => {
  const result = validate(undefined)
  expect(result).toEqual('yobta')
})

test('null', () => {
  const result = validate(null)
  expect(result).toEqual('yobta')
})

const values = [
  ' a',
  0,
  new Date(),
  new Set(),
  new URLSearchParams(''),
  '',
  '   ',
  NaN,
]
values.forEach(value => {
  it(`does not change ${value}`, () => {
    const result = validate(value)
    expect(result).toEqual(value)
  })
})

it('pipes', () => {
  const validateMultiple = createValidator(
    fallback(() => 'yobta'),
    string(),
  )
  const result = validateMultiple(null)
  expect(result).toEqual('yobta')
})
