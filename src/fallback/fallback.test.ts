/* eslint-disable import/extensions */
import { createValidator } from '../createValidator/createValidator'
import { string } from '../string'
import { minCharacters } from '../string/minCharacters'
import { fallback } from './fallback'

describe('rules', () => {
  const validate = createValidator(
    fallback('catched yobta!', string(), minCharacters(5)),
  )

  it('does not catch when no errors', () => {
    const result = validate('yobta')
    expect(result).toEqual('yobta')
  })

  it('catches when errors', () => {
    const result = validate('a')
    expect(result).toEqual('catched yobta!')
  })
})

describe('no rules', () => {
  const validate = createValidator(fallback('fallback yobta'))

  test('undefined', () => {
    const result = validate(undefined)
    expect(result).toEqual('fallback yobta')
  })

  test('empty string', () => {
    const result = validate('')
    expect(result).toEqual('fallback yobta')
  })

  const values = [
    ' a',
    0,
    new Date(),
    new Set(),
    new URLSearchParams(''),
    '   ',
    NaN,
    null,
  ]
  values.forEach(value => {
    it(`does not change ${value}`, () => {
      const result = validate(value)
      expect(result).toEqual(value)
    })
  })

  it('pipes', () => {
    const validateMultiple = createValidator(fallback('yobta'), string())
    const result = validateMultiple('')
    expect(result).toEqual('yobta')
  })
})
