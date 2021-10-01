import { fromEntries } from '.'

it('creates object from entries array', () => {
  let result = fromEntries([['yobta', 'param']])
  expect(result).toEqual({ yobta: 'param' })
})

it('creates object from URLSerchParams instance', () => {
  let params = new URLSearchParams('yobta=param')
  let result = fromEntries(params)
  expect(result).toEqual({ yobta: 'param' })
})

it('creates object from FormData instance', () => {
  let params = new FormData()
  params.set('yobta', 'param')
  let result = fromEntries(params)
  expect(result).toEqual({ yobta: 'param' })
})

it('understands arrays', () => {
  let params = new FormData()
  params.append('yobta', 'yobta 1')
  params.append('yobta', 'yobta 2')
  let result = fromEntries(params)
  expect(result).toEqual({ yobta: ['yobta 1', 'yobta 2'] })
})
