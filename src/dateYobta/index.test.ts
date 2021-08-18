import { syncYobta } from '../syncYobta'
import { dateYobta, dateMessage } from './'

const customMessage = 'yobta!'
const validate = syncYobta(dateYobta(customMessage))

it('accepts valid dates', () => {
  let date = new Date()
  let result = validate(date)
  expect(result).toEqual([date, null])
})

it('accepts undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([undefined, null])
})

it('accepts timestamps', () => {
  let now = Date.now()
  let result = validate(now)
  expect(result).toEqual([new Date(now), null])
})

it('accepts stringified dates', () => {
  let string = '2021-08-16T13:16:32.000Z'
  let result = validate(string)
  expect(result).toEqual([new Date(string), null])
})

it('rejects invalid dates', () => {
  let variants = [null, 'yobta', [], {}, new Set(), new Map()]
  variants.forEach(variant => {
    let result = validate(variant)
    expect(result).toEqual([
      null,
      [{ field: '@root', message: customMessage, path: [] }]
    ])
  })
})

it('has default error message', () => {
  let validateDefault = syncYobta(dateYobta())
  let result = validateDefault(null)
  expect(result).toEqual([
    null,
    [{ field: '@root', message: dateMessage, path: [] }]
  ])
})
