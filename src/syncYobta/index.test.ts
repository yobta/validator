import { minCharactersYobta } from '../minCharactersYobta'
import { numberYobta } from '../numberYobta'
import { requiredYobta } from '../requiredYobta'
import { stringYobta } from '../stringYobta'
import { syncYobta } from './'

let validate = syncYobta(numberYobta('yobta!'))

it('accepts valid', () => {
  let result = validate(1)
  expect(result).toBe(1)
})

it('can pipe rules', () => {
  let validateMultiple = syncYobta(
    stringYobta(),
    requiredYobta<string>(),
    minCharactersYobta(5)
  )
  let result = validateMultiple('yobta')
  expect(result).toBe('yobta')
})

it('rejects invalid', () => {
  let attempt = (): any => validate([])
  expect(attempt).toThrow('yobta!')
})
