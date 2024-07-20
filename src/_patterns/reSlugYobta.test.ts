/* eslint-disable import/extensions */
import { reSlugYobta } from './reSlugYobta'

it('accepts lower case, digits and hyphens', () => {
  const result = reSlugYobta.test('my-name-12')
  expect(result).toBe(true)
})
it('rejects upper case', () => {
  const result = reSlugYobta.test('my-Name-12')
  expect(result).toBe(false)
})
it('can start wwith a digit', () => {
  const result = reSlugYobta.test('2pac')
  expect(result).toBe(true)
})
it('can not start with a hyphen', () => {
  const result = reSlugYobta.test('-my-name-12')
  expect(result).toBe(false)
})
it('can not end with a hyphen', () => {
  const result = reSlugYobta.test('my-name-12-')
  expect(result).toBe(false)
})
it('can have length of 2 symbols', () => {
  const result = reSlugYobta.test('m1')
  expect(result).toBe(true)
})
it('can not be shorter than 2 symbols', () => {
  const result = reSlugYobta.test('m')
  expect(result).toBe(false)
})
