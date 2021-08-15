import { createSyncValidator } from '../createSyncValidator/index.js'
import { stringType, stringTypeMessage } from '../stringType/index.js'
import { plainObjectType, plainObjectTypeMessage } from './index.js'

// const customMessage = 'yobta!'
const validate = createSyncValidator(
  plainObjectType({
    name: [stringType()]
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
    [{ field: '@root', message: plainObjectTypeMessage, path: [] }]
  ])
})

it('has custom error messages', () => {
  let result = createSyncValidator(
    plainObjectType(
      {
        name: [stringType()]
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
    [{ field: 'name', message: stringTypeMessage, path: ['name'] }]
  ])
})
