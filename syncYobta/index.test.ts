import { minCharactersYobta } from '../minCharactersYobta/index.js'
import { numberYobta } from '../numberYobta/index.js'
import { requiredYobta } from '../requiredYobta/index.js'
import { stringYobta } from '../stringYobta/index.js'
import { syncYobta } from './index.js'

let validate = syncYobta(numberYobta('yobta!'))

it('accepts valid', () => {
  let result = validate(1)
  expect(result).toEqual([1, null])
})

it('can pipe rules', () => {
  let validateMultiple = syncYobta(
    requiredYobta(stringYobta()),
    minCharactersYobta(5)
  )
  let result = validateMultiple('yobta')
  expect(result).toEqual(['yobta', null])
})

it('rejects invalid', () => {
  let result = validate([])
  expect(result).toEqual([
    null,
    [{ field: '@root', message: 'yobta!', path: [] }]
  ])
})
