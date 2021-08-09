import { createValidator } from '../createValidator/index.js'
import { optionalList } from '../isOptional/index.js'
import { stringType, stringTypeMessage } from './index.js'

const customMessage = 'string type error'
const stringRule = stringType(customMessage)
const validate = createValidator(stringRule)

const validVariants = ['piu', '1', '', String('')]
const invalidVariants = [
  [],
  {},
  0,
  new Date(),
  Symbol('y'),
  new Set(),
  new Map()
]

it('accepts valid', async () => {
  let tests = validVariants.map(async variant => {
    let [result, errors] = await validate(variant)
    expect(result).toBe(variant)
    expect(errors).toEqual([])
  })
  await Promise.all(tests)
})

it('accepts optional', async () => {
  let tests = optionalList.map(async variant => {
    let [result, errors] = await validate(variant)
    expect(result).toBe(variant)
    expect(errors).toEqual([])
  })
  await Promise.all(tests)
})

it('rejects invalid', async () => {
  let tests = invalidVariants.map(async variant => {
    let [result, errors] = await validate(variant)
    expect(result).toBe(variant)
    expect(errors).toEqual([{ message: customMessage, path: [] }])
  })
  await Promise.all(tests)
})

it('has default error message', async () => {
  let defaultString = stringType()
  let validateDefault = createValidator(defaultString)
  let [result, errors] = await validateDefault(1)
  expect(result).toBe(1)
  expect(errors).toEqual([{ message: stringTypeMessage, path: [] }])
})
