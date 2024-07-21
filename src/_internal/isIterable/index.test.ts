import { isIterable } from './index.js'

it('should return true for an array', () => {
  expect(isIterable([])).toBe(true)
})

it('should return false for a string', () => {
  expect(isIterable('test')).toBe(false)
})

it('should return true for a Map', () => {
  expect(isIterable(new Map())).toBe(true)
})

it('should return true for a Set', () => {
  expect(isIterable(new Set())).toBe(true)
})

it('should return false for an object', () => {
  expect(isIterable({})).toBe(false)
})

it('should return false for null', () => {
  expect(isIterable(null)).toBe(false)
})

it('should return false for a number', () => {
  expect(isIterable(123)).toBe(false)
})

it('should return false for a boolean', () => {
  expect(isIterable(true)).toBe(false)
})

it('should return false for a function', () => {
  expect(isIterable(() => {})).toBe(false)
})
