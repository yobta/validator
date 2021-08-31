import { syncYobta } from '../syncYobta'
import { fromEntriesYobta } from '.'

const validate = syncYobta(fromEntriesYobta())

it('creates object from entries array', () => {
  let result = validate([['yobta', 'param']])
  expect(result).toEqual({ yobta: 'param' })
})

it('creates object from URLSerchParams instance', () => {
  let params = new URLSearchParams('yobta=param')
  let result = validate(params)
  expect(result).toEqual({ yobta: 'param' })
})

it('creates object from FormData instance', () => {
  let params = new FormData()
  params.set('yobta', 'param')
  let result = validate(params)
  expect(result).toEqual({ yobta: 'param' })
})
