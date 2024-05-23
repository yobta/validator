/* eslint-disable import/extensions */

import { yobta } from '../yobta'
import { testMessage, testYobta } from './'

const regExp = /fo*/

const customMessage = 'yobta!'
const validate = yobta(testYobta(regExp, customMessage))

describe('testYobta', () => {
  it('accepts if mathed', () => {
    const result = validate('table football')
    expect(result).toBe('table football')
  })

  it('accepts undefined', () => {
    const result = validate(undefined)
    expect(result).toBeUndefined()
  })

  it('accepts empty string', () => {
    const result = validate('')
    expect(result).toBe('')
  })

  it('regects if not matched', () => {
    const attempt = (): any => validate('yobta')
    expect(attempt).toThrow(customMessage)
  })

  it('has default error message', () => {
    const validateDefault = yobta(testYobta(regExp))
    const attempt = (): any => validateDefault('yobta')
    expect(attempt).toThrow(testMessage)
  })
})
