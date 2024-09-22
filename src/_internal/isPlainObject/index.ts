/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(value: unknown): value is {} {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isPlainObject(value: unknown): value is {} {
  if (!isObject(value)) {
    return false
  }

  const ctor = value.constructor as Function | undefined

  if (!ctor) {
    return true
  }

  const prot = ctor.prototype
  if (!isObject(prot)) {
    return false
  }

  if (!Object.prototype.hasOwnProperty.call(prot, 'isPrototypeOf')) {
    return false
  }

  return true
}
