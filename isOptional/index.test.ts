import { isOptional, optionalSet } from './index.js'

it('accepts valid', () => {
  optionalSet.forEach(validVariant => {
    let result = isOptional(validVariant)
    expect(result).toBe(true)
  })
})

it('rejects invalid', () => {
  ;['piu', 1, new Date(), String('s'), Symbol('y')].forEach(validVariant => {
    let result = isOptional(validVariant)
    expect(result).toBe(false)
  })
})
