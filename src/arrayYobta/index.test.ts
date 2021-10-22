import { yobta } from '../yobta'
import { arrayYobta } from './'

const stringRule = arrayYobta()
const validate = yobta(stringRule)

it('accepts array', () => {
  let result = validate(['yobta'])
  expect(result).toEqual(['yobta'])
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([])
})

it('accepts strings', () => {
  let result = validate('yobta')
  expect(result).toEqual(['yobta'])
})

it('accepts numbers', () => {
  let result = validate(1)
  expect(result).toEqual([1])
})

it('accepts plain objects', () => {
  let result = validate({ k: 'v' })
  expect(result).toEqual([{ k: 'v' }])
})

it('accepts dates', () => {
  let value = new Date()
  let result = validate(value)
  expect(result).toEqual([value])
})

it('accepts symbols', () => {
  let value = Symbol('y')
  let result = validate(value)
  expect(result).toEqual([value])
})

it('accepts sets', () => {
  let value = new Set([1, 2, 3])
  let result = validate(value)
  expect(result).toEqual([1, 2, 3])
})

it('accepts maps', () => {
  let value = new Map([['key', 1]])
  let result = validate(value)
  expect(result).toEqual([['key', 1]])
})
