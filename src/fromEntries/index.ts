export type PlainObject = { [k: PropertyKey]: any }

interface FromEntries {
  (input: Iterable<readonly [PropertyKey, any]>): PlainObject
}

export const fromEntries: FromEntries = input =>
  Array.from(input).reduce((acc, [key, value]) => {
    let next = key in acc ? Array.from(acc[key]).concat(value) : value
    return { ...acc, [key]: next }
  }, {} as PlainObject)
