/* eslint-disable import/extensions */
/* eslint-disable no-useless-escape */
import { emailYobta, emailMessage } from './'
import { yobta } from '../yobta'
import { YobtaError } from '../YobtaError'

const customMessage = 'yobta!'
const validate = yobta(emailYobta(customMessage))

describe('emailYobta', () => {
  it(`accepts valid emails`, async () => {
    let result = validate('user-@example.org')
    expect(result).toBe('user-@example.org')
  })

  it('rejects undefined', () => {
    let attempts = (): string => validate(undefined)
    let error = new YobtaError({ field: '@', message: customMessage, path: [] })
    expect(attempts).toThrow(error)
  })

  it('trims whitespace', () => {
    let result = validate(' bill@microsoft.com ')
    expect(result).toBe('bill@microsoft.com')
  })

  it(`rejects invalid email`, () => {
    let attempt = (): any => validate('QA[icon]CHOCOLATE[icon]@test.com')
    expect(attempt).toThrow(customMessage)
  })

  it('has default error message', () => {
    let rule = emailYobta()
    let validateDefault = yobta(rule)
    let attempt = (): any => validateDefault('yobta')
    expect(attempt).toThrow(emailMessage)
  })
})
