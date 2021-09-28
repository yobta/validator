import { jest } from '@jest/globals'

import { YobtaContext } from '../_internal/YobtaContext'
import { createRule } from './'

describe('sinc rule', () => {
  function validateNumber<I>(input: I): number {
    let number = Number(input)
    if (isNaN(number)) throw new Error('youbta!')
    return number
  }

  it('validates input', () => {
    let pushError = jest.fn()
    let testNumber = createRule(validateNumber)
    let context: YobtaContext = {
      data: 1,
      errors: [],
      field: 'f',
      path: ['price'],
      pushError
    }
    let result = testNumber(context)(1)
    expect(result).toEqual(1)
    expect(pushError).toHaveBeenCalledTimes(0)
  })

  it('does not intercept errors', () => {
    let pushError = jest.fn()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let simulateUnexpectedException = createRule((data: number) => {
      throw new Error('yobta!')
    })
    let context: YobtaContext = {
      data: 1,
      errors: [],
      field: 'f',
      path: ['price'],
      pushError
    }
    expect(() => simulateUnexpectedException(context)(1)).toThrow('yobta!')
    expect(pushError).toHaveBeenCalledTimes(0)
  })

  it('gets both data and context', () => {
    let pushError = jest.fn()
    let spy = jest.fn()
    let contextMock: YobtaContext = {
      data: 1,
      errors: [],
      field: 'f',
      path: ['price'],
      pushError
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let simulateUnexpectedException = createRule(
      (data: number, context: YobtaContext) => {
        spy(data, context)
        return data
      }
    )
    simulateUnexpectedException(contextMock)(1)
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
    let testNumber = createRule(validateNumber)
    let context: YobtaContext = {
      data: 1,
      errors: [],
      field: 'f',
      path: ['price'],
      pushError
    }
    let result = await testNumber(context)(1)
    expect(result).toEqual(1)
    expect(pushError).toHaveBeenCalledTimes(0)
  })
})
