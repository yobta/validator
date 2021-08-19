import { syncYobta } from '../syncYobta'
import { defaultYobta } from '.'
import { stringYobta } from '../stringYobta'
import { requiredYobta } from '../requiredYobta'

const validate = syncYobta(defaultYobta('yobta'))

let voidValues = ['', '   ', undefined, null, NaN]

voidValues.forEach(value => {
  it(`sets default for ${value}`, () => {
    let result = validate(value)
    expect(result).toEqual(['yobta', null])
  })
})

const values = [' a', 0, [], {}, new Date(), new Set(), new URLSearchParams('')]
values.forEach(value => {
  it(`does not change ${value}`, () => {
    let result = validate(value)
    expect(result).toEqual([value, null])
  })
})

it('pipes', () => {
  let validateMultiple = syncYobta(
    stringYobta(),
    defaultYobta('yobta'),
    requiredYobta<string>()
  )
  let result = validateMultiple(null)
  expect(result).toEqual(['yobta', null])
})
