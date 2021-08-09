import { invariant } from './index.js'

it('throws on false', () => {
  expect(() => {
    invariant(false, 'error')
  }).toThrow('error')
})

it('not throws on true', () => {
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  let result = invariant(true, 'error')
  expect(result).toBeUndefined()
})
