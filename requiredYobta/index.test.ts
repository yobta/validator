import { stringYobta } from '../stringYobta/index.js'
import { syncYobta } from '../syncYobta/index.js'
import { requiredYobta, requiredMessage } from './index.js'

const customMessage = 'yobta!'
const validate = syncYobta(requiredYobta(stringYobta(), customMessage))

it('accepts value', () => {
  let result = validate('yobta')
  expect(result).toEqual(['yobta', null])
})

it('rejects undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([
    null,
    [{ field: '@root', message: customMessage, path: [] }]
  ])
})

it('has default error message', () => {
  let rule = requiredYobta(stringYobta())
  let validateDefault = syncYobta(rule)
  let result = validateDefault(undefined)
  expect(result).toEqual([
    null,
    [{ field: '@root', message: requiredMessage, path: [] }]
  ])
})
