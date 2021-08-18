import { minCharactersYobta } from '../minCharactersYobta'
import { numberYobta } from '../numberYobta'
import { requiredYobta } from '../requiredYobta'
import { stringYobta } from '../stringYobta'
import { syncYobta } from './'

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
