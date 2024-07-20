export function isIterable<T>(value: T): value is Iterable<unknown> & T {
  return typeof value === 'object' && value !== null && Symbol.iterator in value
}
