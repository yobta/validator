/* eslint-disable import/extensions */
import { pipe } from './'

const addOne = (input: number): number => input + 1
const toString = (input: number): string => input.toString()

it('pipes one function', () => {
  const result = pipe(addOne)(0)
  expect(result).toBe(1)
})

it('pipes two functions', () => {
  const result = pipe(addOne, addOne)(0)
  expect(result).toBe(2)
})

it('pipes many functions', () => {
  const result = pipe(
    addOne,
    addOne,
    addOne,
    addOne,
    addOne,
    addOne,
    addOne,
    addOne,
    addOne,
    toString,
  )(0)
  expect(result).toBe('9')
})
