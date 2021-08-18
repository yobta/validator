import { pluralizeEn } from './index.js'

it('is plural for 1', () => {
  let result = pluralizeEn(1, 'yobta')
  expect(result).toBe('1 yobta')
})

it('is not plural for 21', () => {
  let result = pluralizeEn(21, 'yobta')
  expect(result).toBe('21 yobtas')
})

it('has custom suffix', () => {
  let result = pluralizeEn(101, 'yobta', 'z')
  expect(result).toBe('101 yobtaz')
})
