/* eslint-disable import/extensions */
import { yobta } from '../yobta'
import { booleanMessage, booleanYobta } from './'

const customMessage = 'yobta!'
const validate = yobta(booleanYobta(customMessage))

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

it('accepts undefined', () => {
  const result = validate(undefined)
  expect(result).toBeUndefined()
})

it('rejects invalid', () => {
  const variants = [
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
  const validateDefault = yobta(rule)
  const attemt = (): any => validateDefault('')
  expect(attemt).toThrow(booleanMessage)
})
