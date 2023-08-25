/* eslint-disable import/extensions */
import { requiredYobta } from '../requiredYobta'
import { stringYobta } from '../stringYobta'
import { yobta } from '../yobta'
import { defaultYobta } from './'

const validate = yobta(defaultYobta('yobta'))

let voidValues = ['', '   ', undefined, null, NaN]

voidValues.forEach(value => {
  it(`sets default for ${value}`, () => {
    let result = validate(value)
    expect(result).toEqual('yobta')
  })
})

const values = [' a', 0, new Date(), new Set(), new URLSearchParams('')]
values.forEach(value => {
  it(`does not change ${value}`, () => {
    let result = validate(value)
    expect(result).toEqual(value)
  })
})

it('pipes', () => {
  let validateMultiple = yobta(
    stringYobta(),
    defaultYobta('yobta'),
    requiredYobta(),
  )
  let result = validateMultiple(null)
  expect(result).toEqual('yobta')
})
