/* eslint-disable import/extensions */

import { yobta } from '../yobta'
import { testMessage, testYobta } from './'

const regExp = /fo*/

const customMessage = 'yobta!'
const validate = yobta(testYobta(regExp, customMessage))

describe('testYobta', () => {
  it('accepts if mathed', () => {
    let result = validate('table football')
    expect(result).toBe('table football')
  })

  it('accepts undefined', () => {
    let result = validate(undefined)
    expect(result).toBeUndefined()
  })

  it('accepts empty string', () => {
    let result = validate('')
    expect(result).toBe('')
  })

  it('regects if not matched', () => {
    let attempt = (): any => validate('yobta')
    expect(attempt).toThrow(customMessage)
  })

  it('has default error message', () => {
    let validateDefault = yobta(testYobta(regExp))
    let attempt = (): any => validateDefault('yobta')
    expect(attempt).toThrow(testMessage)
  })
})
