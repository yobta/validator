/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { booleanMessage, booleanYobta } from './'

const customMessage = 'yobta!'
const validate = createValidator(booleanYobta(customMessage))

it('accepts truthy', () => {
  const variants = ['yes', 'true', 'Yes', 'tRue', true, 1, '1']
  variants.forEach(variant => {
    const result = validate(variant)
    expect(result).toBe(true)
  })
})

it('accepts falsy', () => {
  const variants = ['no', 'false', 'No', 'FALSE', false, null, 'null', 0, '0']
  variants.forEach(variant => {
    const result = validate(variant)
    expect(result).toBe(false)
  })
})

it('rejects invalid', () => {
  const variants = [
    undefined,
    [],
    {},
    new Date(),
    Symbol('y'),
    new Set(),
    new Map(),
    2,
    () => 'yobta',
  ]
  variants.forEach(variant => {
    const attemt = (): any => validate(variant)
    expect(attemt).toThrow(customMessage)
  })
})

it('has default error message', () => {
  const rule = booleanYobta()
  const validateDefault = createValidator(rule)
  const attemt = (): any => validateDefault('')
  expect(attemt).toThrow(booleanMessage)
})
