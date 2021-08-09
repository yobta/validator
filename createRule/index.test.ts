import { jest } from '@jest/globals'

import { invariant } from '../invariant/index.js'
import { createRule } from './index.js'

function validateNumber<I>(input: I): I {
  invariant(typeof input === 'number', 'please enter a number')
  return input
}

it('accepts', async () => {
  let pushError = jest.fn()
  let testNumber = createRule(validateNumber)
  let result = await testNumber({ data: 1, path: ['price'], pushError })
  expect(result).toBe(1)
  expect(pushError).toHaveBeenCalledTimes(0)
})

it('rejects', async () => {
  let pushError = jest.fn()
  let testNumber = createRule(validateNumber)
  let result = await testNumber({ data: '1', path: ['price'], pushError })
  expect(result).toBe('1')
  expect(pushError).toHaveBeenCalledTimes(1)
})

it('catches', async () => {
  let pushError = jest.fn()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let simulateUnexpectedException = createRule((data: number) => {
    throw new Error('')
  })
  let result = await simulateUnexpectedException({
    data: 1,
    path: ['price'],
    pushError
  })
  expect(result).toBe(1)
  expect(pushError).toHaveBeenCalledTimes(1)
})
