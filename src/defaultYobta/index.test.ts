/* eslint-disable import/extensions */
import { stringYobta } from '../stringYobta'
import { createValidator } from '../createValidator/createValidator'
import { defaultYobta } from './'

const validate = createValidator(defaultYobta('yobta'))

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
  const validateMultiple = createValidator(defaultYobta('yobta'), stringYobta())
  const result = validateMultiple(null)
  expect(result).toEqual('yobta')
})
