import { numberYobta } from '../numberYobta/index.js'
import { stringYobta } from '../stringYobta/index.js'
import { syncYobta } from './index.js'

let validate = syncYobta(numberYobta('yobta!'))

it('accepts valid', () => {
  let result = validate(1)
  expect(result).toEqual([1, null])
})

it('can pipe rules', () => {
  let validateMultiple = syncYobta(numberYobta(), stringYobta())
  let result = validateMultiple(1)
  expect(result).toEqual(['1', null])
})

it('rejects invalid', () => {
  let result = validate([])
  expect(result).toEqual([
    null,
    [{ field: '@root', message: 'yobta!', path: [] }]
  ])
})
