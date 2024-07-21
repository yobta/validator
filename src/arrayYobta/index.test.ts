/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { arrayYobta } from './'

const validate = yobta(arrayYobta())

it('accepts array', () => {
  const result = validate(['yobta'])
  expect(result).toEqual(['yobta'])
})

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toEqual([])
})

it('accepts strings', () => {
  const result = validate('yobta')
  expect(result).toEqual(['yobta'])
})

it('accepts numbers', () => {
  const result = validate(1)
  expect(result).toEqual([1])
})

it('accepts plain objects', () => {
  const result = validate({ k: 'v' })
  expect(result).toEqual([{ k: 'v' }])
})

it('accepts dates', () => {
  const value = new Date()
  const result = validate(value)
  expect(result).toEqual([value])
})

it('accepts symbols', () => {
  const value = Symbol('y')
  const result = validate(value)
  expect(result).toEqual([value])
})

it('accepts sets', () => {
  const value = new Set([1, 2, 3])
  const result = validate(value)
  expect(result).toEqual([1, 2, 3])
})

it('accepts maps', () => {
  const value = new Map([['key', 1]])
  const result = validate(value)
  expect(result).toEqual([['key', 1]])
})

it('accepts null', () => {
  const result = validate(null)
  expect(result).toEqual([null])
})

it('accepts NaN', () => {
  const result = validate(NaN)
  expect(result).toEqual([NaN])
})
