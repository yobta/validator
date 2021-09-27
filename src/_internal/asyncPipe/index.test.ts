import { asyncPipe } from '.'

const addOne = (input: number): number => input + 1
const subtractOne = async (input: number): Promise<number> =>
  await Promise.resolve(input - 1)
const toString = (input: number): string => input.toString()

it('pipes one function', async () => {
  let result = await asyncPipe(addOne)(0)
  expect(result).toBe(1)
})

it('pipes two functions', async () => {
  let result = await asyncPipe(addOne, subtractOne)(0)
  expect(result).toBe(0)
})

it('pipes many functions', async () => {
  let result = await asyncPipe(addOne, subtractOne, addOne, toString)(0)
  expect(result).toBe('1')
})
