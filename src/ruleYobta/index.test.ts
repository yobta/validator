import { jest } from '@jest/globals'

import { ruleYobta } from '.'
import { createContext, YobtaContext } from '../_internal/createContext'

describe('sinc rule', () => {
  function validateNumber<I>(input: I): number {
    let number = Number(input)
    if (isNaN(number)) throw new Error('youbta!')
    return number
  }

  it('validates input', () => {
    let pushError = jest.fn()
    let testNumber = ruleYobta(validateNumber)
    let context = createContext(1)
    let result = testNumber(context)(1)
    expect(result).toEqual(1)
    expect(pushError).toHaveBeenCalledTimes(0)
  })

  it('does not intercept errors', () => {
    let pushError = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let simulateUnexpectedException = ruleYobta((data: number) => {
      throw new Error('yobta!')
    })
    let context = createContext(1)
    expect(() => simulateUnexpectedException(context)(1)).toThrow('yobta!')
    expect(pushError).toHaveBeenCalledTimes(0)
  })

  it('gets both data and context', () => {
    let spy = jest.fn()
    let contextMock = createContext(1)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let attempt = ruleYobta((data: number, context: YobtaContext) => {
      spy(data, context)
      return data
    })
    attempt(contextMock)(1)
    expect(spy).toHaveBeenCalledWith(1, contextMock)
  })
})

describe('asinc rule', () => {
  function validateNumber<I>(input: I): Promise<number> {
    let number = Number(input)
    if (isNaN(number)) throw new Error('youbta!')
    return Promise.resolve(number)
  }

  it('validates input', async () => {
    let pushError = jest.fn()
    let testNumber = ruleYobta(validateNumber)
    let context = createContext(1)
    let result = await testNumber(context)(1)
    expect(result).toEqual(1)
    expect(pushError).toHaveBeenCalledTimes(0)
  })
})
