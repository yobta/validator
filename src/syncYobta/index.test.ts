import { minCharactersYobta } from '../minCharactersYobta'
import { numberYobta } from '../numberYobta'
import { requiredYobta } from '../requiredYobta'
import { stringYobta } from '../stringYobta'
import { YobtaError } from '../YobtaError'
import { syncYobta } from './'

let validate = syncYobta(numberYobta('yobta!'))

it('accepts valid', () => {
  let result = validate(1)
  expect(result).toEqual([1, null])
})

it('can pipe rules', () => {
  let validateMultiple = syncYobta(
    stringYobta(),
    requiredYobta<string>(),
    minCharactersYobta(5)
  )
  let result = validateMultiple('yobta')
  expect(result).toEqual(['yobta', null])
})

it('rejects invalid', () => {
  let result = validate([])
  expect(result).toEqual([
    null,
    [new YobtaError({ field: '@root', message: 'yobta!', path: [] })]
  ])
})
