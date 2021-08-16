import { isOptional, optionalSet } from './index.js'

it('accepts valid', () => {
  optionalSet.forEach(validVariant => {
    let result = isOptional(validVariant)
    expect(result).toBe(true)
  })
})

it('rejects invalid', () => {
  let options = ['piu', 1, new Date(), String('s'), Symbol('y')]
  options.forEach(option => {
    let result = isOptional(option)
    expect(result).toBe(false)
  })
})
