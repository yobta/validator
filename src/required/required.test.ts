/* eslint-disable import/extensions */
import { createAsyncValidator } from '../createAsyncValidator/createAsyncValidator'
import { createValidator } from '../createValidator/createValidator'
import { asyncShape, shape } from '../shape'
import { string } from '../string'
import { YobtaError } from '../YobtaError'
import { required, requiredMessage } from './required'

const customMessage = 'yobta!'

const opt = [undefined, '']
const req = [
  'str',
  NaN,
  null,
  0,
  new Date(),
  new Set(),
  new URLSearchParams(''),
  {},
  [],
]

describe('optional', () => {
  const validate = createValidator(required(customMessage))
  for (const value of opt) {
    it(`rejects ${value}`, () => {
      expect(() => validate(value)).toThrow(customMessage)
    })
  }
})

describe('async optional', () => {
  const validate = createAsyncValidator(required())
  for (const value of opt) {
    it(`rejects ${value}`, async () => {
      const result = await validate(value)
      expect(result).toEqual([null, [expect.any(YobtaError)]])
    })
  }
})

describe('filled', () => {
  const validate = createValidator(required(customMessage))
  for (const value of req) {
    it(`accepts ${value}`, () => {
      expect(validate(value)).toBe(value)
    })
  }
})

describe('async filled', () => {
  const validate = createAsyncValidator(required())
  for (const value of req) {
    it(`accepts ${value}`, async () => {
      const result = await validate(value)
      expect(result).toEqual([value, null])
    })
  }
})

describe('shape optional', () => {
  const validate = createValidator(shape({ name: required() }))
  for (const value of opt) {
    it(`rejects ${value}`, () => {
      expect(() => validate({ name: value })).toThrow(requiredMessage)
    })
  }
})

describe('shape filled', () => {
  const validate = createValidator(shape({ name: required() }))
  for (const value of req) {
    it(`accepts ${value}`, () => {
      expect(validate({ name: value })).toEqual({ name: value })
    })
  }
})

describe('nested shape optional', () => {
  const validate = createValidator(
    shape({ name: shape({ value: required() }) }),
  )
  for (const value of opt) {
    it(`rejects ${value}`, () => {
      expect(() => validate({ name: { value } })).toThrow(requiredMessage)
    })
  }
})

describe('nested shape filled', () => {
  const validate = createValidator(
    shape({ name: shape({ value: required() }) }),
  )
  for (const value of req) {
    it(`accepts ${value}`, () => {
      expect(validate({ name: { value } })).toEqual({ name: { value } })
    })
  }
})

describe('async shape optional', () => {
  const validate = createAsyncValidator(asyncShape({ name: required() }))
  for (const value of opt) {
    it(`rejects ${value}`, async () => {
      const result = await validate({ name: value })
      expect(result).toEqual([
        null,
        [expect.any(YobtaError), expect.any(YobtaError)],
      ])
    })
  }
})

describe('async shape filled', () => {
  const validate = createAsyncValidator(asyncShape({ name: required() }))
  for (const value of req) {
    it(`accepts ${value}`, async () => {
      const result = await validate({ name: value })
      expect(result).toEqual([{ name: value }, null])
    })
  }
})

describe('async nested shape optional', () => {
  const validate = createAsyncValidator(
    asyncShape({ name: asyncShape({ value: required() }) }),
  )
  for (const value of opt) {
    it(`rejects ${value}`, async () => {
      const result = await validate({ name: { value } })
      expect(result).toEqual([
        null,
        [
          expect.any(YobtaError),
          expect.any(YobtaError),
          expect.any(YobtaError),
        ],
      ])
    })
  }
})

describe('async nested shape filled', () => {
  const validate = createAsyncValidator(
    asyncShape({ name: asyncShape({ value: required() }) }),
  )
  for (const value of req) {
    it(`accepts ${value}`, async () => {
      const result = await validate({ name: { value } })
      expect(result).toEqual([{ name: { value } }, null])
    })
  }
})

describe('order', () => {
  test('accepts after string', () => {
    const validate = createValidator(string(), required())
    const result = validate('yobta')
    expect(result).toEqual('yobta')
  })
  test('rejects after string', () => {
    const validate = createValidator(string(), required())
    expect(() => validate('')).toThrow(requiredMessage)
  })
})
