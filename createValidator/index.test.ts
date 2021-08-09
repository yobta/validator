import { createRule } from '../createRule/index.js'
import { invariant } from '../invariant/index.js'
import { createValidator } from './index.js'

let isNumber = createRule(<D>(data: D) => {
  invariant(typeof data === 'number', 'error')
  return data
})

let validate = createValidator(isNumber)

it('accepts', async () => {
  let [result, errors] = await validate(1)
  expect(result).toBe(1)
  expect(errors).toEqual([])
})

it('rejects', async () => {
  let [result, errors] = await validate('1')
  expect(result).toBe('1')
  expect(errors).toEqual([{ message: 'error', path: [] }])
})
