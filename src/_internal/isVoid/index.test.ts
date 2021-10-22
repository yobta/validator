import { isVoid } from '.'

const voidValues = ['', '   ', undefined, null, NaN, []]

voidValues.forEach(value => {
  it(`is void ${value}`, () => {
    expect(isVoid(value)).toBe(true)
  })
})

const values = [
  ' a',
  0,
  [1],
  { a: 1 },
  new Date(),
  new Set(),
  new URLSearchParams(''),
]

values.forEach(value => {
  it(`is void ${value}`, () => {
    expect(isVoid(value)).toBe(false)
  })
})
