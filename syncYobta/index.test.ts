import { createRule } from '../createRule/index.js'
import { syncYobta } from './index.js'

let isNumber = createRule(<D>(data: D) => {
  if (typeof data !== 'number') throw new Error('yobta!')
  return data
})

let validate = syncYobta(isNumber)

it('accepts valid', () => {
  let result = validate(1)
  expect(result).toEqual([1, null])
})

it('rejects invalid', () => {
  let result = validate('1')
  expect(result).toEqual([
    null,
    [{ field: '@root', message: 'yobta!', path: [] }]
  ])
})
