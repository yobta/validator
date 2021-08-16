import { syncYobta } from '../syncYobta/index.js'
import { maximumYobta, maximumYobtaMessage } from './index.js'

const customMessage = (limit: number): string => `${limit} yobta!`
const validate = syncYobta(maximumYobta(1, customMessage))

it('accepts exact number', () => {
  let result = validate(1)
  expect(result).toEqual([1, null])
})

it('accepts smaller number', () => {
  let result = validate(0)
  expect(result).toEqual([0, null])
})

it('regects greater number', () => {
  let result = validate(2)
  expect(result).toEqual([
    null,
    [{ field: '@root', message: customMessage(1), path: [] }]
  ])
})

it('has default error message', () => {
  let validateDefault = syncYobta(maximumYobta(1))
  let result = validateDefault(2)
  expect(result).toEqual([
    null,
    [{ field: '@root', message: maximumYobtaMessage(1), path: [] }]
  ])
})
