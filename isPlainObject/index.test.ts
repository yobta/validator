import { isPlainObject } from './index.js'

it('should return `true` if the object is created by the `Object` constructor.', () => {
  expect(isPlainObject(Object.create({}))).toBe(true)
  expect(isPlainObject(Object.create(Object.prototype))).toBe(true)
  expect(isPlainObject({ foo: 'bar' })).toBe(true)
  expect(isPlainObject({})).toBe(true)
  expect(isPlainObject(Object.create(null))).toBe(true)
})

function Foo(this: any): any {
  this.abc = {}
}

it('should return `false` if the object is not created by the `Object` constructor.', () => {
  expect(isPlainObject(/yobta/)).toBe(false)
  expect(isPlainObject(() => {})).toBe(false)
  expect(isPlainObject(1)).toBe(false)
  expect(isPlainObject(['foo', 'bar'])).toBe(false)
  expect(isPlainObject([])).toBe(false)
  // @ts-ignore
  expect(isPlainObject(new Foo())).toBe(false)
  expect(isPlainObject(null)).toBe(false)
  expect(isPlainObject({ constructor: { prototype: [] } })).toBe(false)
})
