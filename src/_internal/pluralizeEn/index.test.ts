/* eslint-disable import/extensions */
import { pluralizeEn } from './'

it('is plural for 1', () => {
  const result = pluralizeEn(1, 'yobta')
  expect(result).toBe('1 yobta')
})

it('is not plural for 21', () => {
  const result = pluralizeEn(21, 'yobta')
  expect(result).toBe('21 yobtas')
})

it('has custom suffix', () => {
  const result = pluralizeEn(101, 'yobta', 'z')
  expect(result).toBe('101 yobtaz')
})
