import { syncYobta } from '../syncYobta'
import { YobtaError } from '../YobtaError'
import { minItemsYobta, minItemsMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = syncYobta(minItemsYobta(1, customMessage))

it('accepts exact lenght', () => {
  let result = validate([1])
  expect(result).toEqual([[1], null])
})

it('accepts greater lenght', () => {
  let result = validate([1, 2])
  expect(result).toEqual([[1, 2], null])
})

it('regects insufficient lenght', () => {
  let result = validate([])
  expect(result).toEqual([
    null,
    [new YobtaError({ field: '@root', message: customMessage(1), path: [] })]
  ])
})

it('has default error message', () => {
  let validateDefault = syncYobta(minItemsYobta(1))
  let result = validateDefault([])
  expect(result).toEqual([
    null,
    [new YobtaError({ field: '@root', message: minItemsMessage(1), path: [] })]
  ])
})
