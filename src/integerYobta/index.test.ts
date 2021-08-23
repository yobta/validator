import { syncYobta } from '../syncYobta'
import { YobtaError } from '../YobtaError'
import { integerYobta, integerMessage } from './'

const customMessage = 'yobta!'
const validate = syncYobta(integerYobta(customMessage))

it('accepts integers', () => {
  let result = validate(1)
  expect(result).toEqual([1, null])
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([undefined, null])
})

it('rejects floats', () => {
  let result = validate(2.2)
  expect(result).toEqual([
    null,
    [new YobtaError({ field: '@root', message: customMessage, path: [] })]
  ])
})

it('has default error message', () => {
  let validateDefault = syncYobta(integerYobta())
  let result = validateDefault(0.1)
  expect(result).toEqual([
    null,
    [new YobtaError({ field: '@root', message: integerMessage, path: [] })]
  ])
})
