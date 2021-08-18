import { syncYobta } from '../syncYobta'
import { maxItemsYobta, maxItemsMessage } from './'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = syncYobta(maxItemsYobta(1, customMessage))

it('accepts exact lenght', () => {
  let result = validate([1])
  expect(result).toEqual([[1], null])
})

it('accepts smaller lenght', () => {
  let result = validate([])
  expect(result).toEqual([[], null])
})

it('regects greater lenght', () => {
  let result = validate([1, 2])
  expect(result).toEqual([
    null,
    [{ field: '@root', message: customMessage(1), path: [] }]
  ])
})

it('has default error message', () => {
  let validateDefault = syncYobta(maxItemsYobta(1))
  let result = validateDefault([1, 2])
  expect(result).toEqual([
    null,
    [{ field: '@root', message: maxItemsMessage(1), path: [] }]
  ])
})
