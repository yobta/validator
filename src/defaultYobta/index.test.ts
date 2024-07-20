/* eslint-disable import/extensions */
import { stringYobta } from '../stringYobta'
import { yobta } from '../yobta'
import { defaultYobta } from './'

const validate = yobta(defaultYobta('yobta'))

const voidValues = ['', '   ', undefined, null, NaN]

voidValues.forEach(value => {
  it(`sets default for ${value}`, () => {
    const result = validate(value)
    expect(result).toEqual('yobta')
  })
})

const values = [' a', 0, new Date(), new Set(), new URLSearchParams('')]
values.forEach(value => {
  it(`does not change ${value}`, () => {
    const result = validate(value)
    expect(result).toEqual(value)
  })
})

it('pipes', () => {
  const validateMultiple = yobta(stringYobta(), defaultYobta('yobta'))
  const result = validateMultiple(null)
  expect(result).toEqual('yobta')
})
