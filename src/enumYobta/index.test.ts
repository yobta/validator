import { syncYobta } from '../syncYobta'
import { enumYobta, enumMessage } from '.'

const customMessage = (): string => 'yobta!'
const validate = syncYobta(enumYobta(['yobta'], customMessage))

it('accepts listed', () => {
  let result = validate('yobta')
  expect(result).toBe('yobta')
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toBeUndefined()
})

it('rejects not listed', () => {
  let result = (): string | undefined => validate(null)
  expect(result).toThrow(customMessage())
})

it('has default error message', () => {
  let rule = enumYobta(['yobta'])
  let validateDefault = syncYobta(rule)
  let attempt = (): string | undefined => validateDefault(0)
  expect(attempt).toThrow(enumMessage(['yobta']))
})
