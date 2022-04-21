/* eslint-disable import/extensions */
import { getIn } from './'

const voidValues = [
  '',
  undefined,
  null,
  NaN,
  0,
  [],
  {},
  new Date(),
  new Set(),
  new URLSearchParams(''),
]

voidValues.forEach(value => {
  it(`is undefined for empty path in ${value}`, () => {
    expect(getIn(value, [])).toBeUndefined()
  })
  it(`is still undefined when path is pointing to the wrong diection in ${value}`, () => {
    expect(getIn(value, [1])).toBeUndefined()
  })
})

it('works with strings', () => {
  expect(getIn('yobta', [1])).toBe('o')
})

it('works with arrays', () => {
  expect(getIn('yobta'.split(''), [1])).toBe('o')
})

it('works with plain objects', () => {
  expect(getIn({ one: { 'two.three': 3 } }, ['one', 'two.three'])).toBe(3)
})
