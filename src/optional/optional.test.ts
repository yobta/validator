/* eslint-disable import/extensions */
import { createAsyncValidator } from '../createAsyncValidator/createAsyncValidator'
import { createValidator } from '../createValidator/createValidator'
import { asyncShape, shape } from '../shape'
import { optional } from './optional'

const opt = [undefined, null, '']
const req = [
  'str',
  NaN,
  0,
  new Date(),
  new Set(),
  new URLSearchParams(''),
  {},
  [],
]

describe('optional', () => {
  const validate = createValidator(optional())
  for (const value of opt) {
    it(`accepts ${value}`, () => {
      expect(validate(value)).toBeUndefined()
    })
  }
})

describe('async optional', () => {
  const validate = createAsyncValidator(optional())
  for (const value of opt) {
    it(`accepts ${value}`, async () => {
      expect(await validate(value)).toEqual([undefined, null])
    })
  }
})

describe('filled', () => {
  const validate = createValidator(optional())
  for (const value of req) {
    it(`accepts ${value}`, () => {
      expect(validate(value)).toBe(value)
    })
  }
})

describe('async filled', () => {
  const validate = createAsyncValidator(optional())
  for (const value of req) {
    it(`accepts ${value}`, async () => {
      expect(await validate(value)).toEqual([value, null])
    })
  }
})

describe('shapes optional', () => {
  const validate = createValidator(shape({ name: optional() }))
  for (const value of opt) {
    it(`accepts ${value}`, () => {
      expect(validate({ name: value })).toEqual({ name: undefined })
    })
  }
})

describe('shapes filled', () => {
  const validate = createValidator(shape({ name: optional() }))
  for (const value of req) {
    it(`accepts ${value}`, () => {
      expect(validate({ name: value })).toEqual({ name: value })
    })
  }
})

describe('nested shapes optional', () => {
  const validate = createValidator(
    shape({ name: shape({ value: optional() }) }),
  )
  for (const value of opt) {
    it(`accepts ${value}`, () => {
      expect(validate({ name: { value } })).toEqual({
        name: { value: undefined },
      })
    })
  }
})

describe('nested shapes filled', () => {
  const validate = createValidator(
    shape({ name: shape({ value: optional() }) }),
  )
  for (const value of req) {
    it(`accepts ${value}`, () => {
      expect(validate({ name: { value } })).toEqual({ name: { value } })
    })
  }
})

describe('async shapes optional', () => {
  const validate = createAsyncValidator(asyncShape({ name: optional() }))
  for (const value of opt) {
    it(`accepts ${value}`, async () => {
      expect(await validate({ name: value })).toEqual([
        { name: undefined },
        null,
      ])
    })
  }
})

describe('async shapes filled', () => {
  const validate = createAsyncValidator(asyncShape({ name: optional() }))
  for (const value of req) {
    it(`accepts ${value}`, async () => {
      expect(await validate({ name: value })).toEqual([{ name: value }, null])
    })
  }
})

describe('async nested shapes optional', () => {
  const validate = createAsyncValidator(
    asyncShape({ name: asyncShape({ value: optional() }) }),
  )
  for (const value of opt) {
    it(`accepts ${value}`, async () => {
      expect(await validate({ name: { value } })).toEqual([
        { name: { value: undefined } },
        null,
      ])
    })
  }
})

describe('async nested shapes filled', () => {
  const validate = createAsyncValidator(
    asyncShape({ name: asyncShape({ value: optional() }) }),
  )
  for (const value of req) {
    it(`accepts ${value}`, async () => {
      expect(await validate({ name: { value } })).toEqual([
        { name: { value } },
        null,
      ])
    })
  }
})
