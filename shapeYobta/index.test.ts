import { syncYobta } from '../syncYobta/index.js'
import { stringYobta, stringMessage } from '../stringYobta/index.js'
import { shapeYobta, shapeMessage } from './index.js'

// const customMessage = 'yobta!'
const validate = syncYobta(
  shapeYobta({
    name: [stringYobta()]
  })
)

it('accepts valid shapes', () => {
  let result = validate({
    name: 'yobta'
  })
  expect(result).toEqual([{ name: 'yobta' }, null])
})

it('rejects invalid input', () => {
  let result = validate([])
  expect(result).toEqual([
    null,
    [{ field: '@root', message: shapeMessage, path: [] }]
  ])
})

it('can be undefined', () => {
  let result = validate(undefined)
  expect(result).toEqual([undefined, null])
})

it('has custom error messages', () => {
  let result = syncYobta(
    shapeYobta(
      {
        name: [stringYobta()]
      },
      'yobta!'
    )
  )([])
  expect(result).toEqual([
    null,
    [{ field: '@root', message: 'yobta!', path: [] }]
  ])
})

it('captures errors from field validators', () => {
  let result = validate({
    name: []
  })
  expect(result).toEqual([
    null,
    [{ field: 'name', message: stringMessage, path: ['name'] }]
  ])
})
