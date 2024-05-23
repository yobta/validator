/* eslint-disable import/extensions */
import { jest } from '@jest/globals'

import type { YobtaContext } from '../_internal/createContext'
import { createContext } from '../_internal/createContext'
import { ruleYobta } from './'

describe('sinc rule', () => {
  function validateNumber<I>(input: I): number {
    const number = Number(input)
    if (isNaN(number)) throw new Error('youbta!')
    return number
  }

  it('validates input', () => {
    const pushError = jest.fn()
    const testNumber = ruleYobta(validateNumber)
    const context = createContext(1)
    const result = testNumber(context)(1)
    expect(result).toEqual(1)
    expect(pushError).toHaveBeenCalledTimes(0)
  })

  it('does not intercept errors', () => {
    const pushError = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const simulateUnexpectedException = ruleYobta((data: number) => {
      throw new Error('yobta!')
    })
    const context = createContext(1)
    expect(() => simulateUnexpectedException(context)(1)).toThrow('yobta!')
    expect(pushError).toHaveBeenCalledTimes(0)
  })

  it('gets both data and context', () => {
    const spy = jest.fn()
    const contextMock = createContext(1)

    const attempt = ruleYobta((data: number, context: YobtaContext) => {
      spy(data, context)
      return data
    })
    attempt(contextMock)(1)
    expect(spy).toHaveBeenCalledWith(1, contextMock)
  })
})

describe('asinc rule', () => {
  function validateNumber<I>(input: I): Promise<number> {
    const number = Number(input)
    if (isNaN(number)) throw new Error('youbta!')
    return Promise.resolve(number)
  }

  it('validates input', async () => {
    const pushError = jest.fn()
    const testNumber = ruleYobta(validateNumber)
    const context = createContext(1)
    const result = await testNumber(context)(1)
    expect(result).toEqual(1)
    expect(pushError).toHaveBeenCalledTimes(0)
  })
})
