import { syncYobta } from '../syncYobta'
import { oneOfYobta, oneOfMessage } from '.'

const customMessage = (): string => 'yobta!'
const validate = syncYobta(oneOfYobta(['yobta'], customMessage))

it('accepts listed', () => {
  let result = validate('yobta')
  expect(result).toBe('yobta')
})

it('rejects not listed', () => {
  let result = (): string => validate(null)
  expect(result).toThrow(customMessage())
})

it('has default error message', () => {
  let rule = oneOfYobta(['yobta'])
  let validateDefault = syncYobta(rule)
  let attempt = (): string => validateDefault(0)
  expect(attempt).toThrow(oneOfMessage(['yobta']))
})
