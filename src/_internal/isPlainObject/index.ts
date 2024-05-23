/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject(o: any): boolean {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export function isPlainObject(o: any): boolean {
  if (!isObject(o)) return false

  const ctor = o.constructor
  if (ctor === undefined) return true

  const prot = ctor.prototype
  if (!isObject(prot)) return false

  // eslint-disable-next-line no-prototype-builtins
  if (prot.hasOwnProperty('isPrototypeOf') === false) return false

  return true
}
