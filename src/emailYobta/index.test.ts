/* eslint-disable import/extensions */
 
import { yobta } from '../yobta'
import { YobtaError } from '../YobtaError'
import { emailMessage, emailYobta } from './'

const customMessage = 'yobta!'
const validate = yobta(emailYobta(customMessage))

describe('emailYobta', () => {
  it(`accepts valid emails`, async () => {
    const result = validate('user-@example.org')
    expect(result).toBe('user-@example.org')
  })

  it('rejects undefined', () => {
    const attempts = (): string => validate(undefined)
    const error = new YobtaError({ field: '@', message: customMessage, path: [] })
    expect(attempts).toThrow(error)
  })

  it('trims whitespace', () => {
    const result = validate(' bill@microsoft.com ')
    expect(result).toBe('bill@microsoft.com')
  })

  it(`rejects invalid email`, () => {
    const attempt = (): any => validate('QA[icon]CHOCOLATE[icon]@test.com')
    expect(attempt).toThrow(customMessage)
  })

  it('has default error message', () => {
    const rule = emailYobta()
    const validateDefault = yobta(rule)
    const attempt = (): any => validateDefault('yobta')
    expect(attempt).toThrow(emailMessage)
  })
})
