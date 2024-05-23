export type PlainObject = { [k: PropertyKey]: any }

interface FromEntries {
  (input: Iterable<readonly [PropertyKey, any]>): PlainObject
}

const arrayFrom = (value: any): any[] =>
  Array.isArray(value) ? value : [value]

export const fromEntries: FromEntries = input =>
  Array.from(input).reduce((acc, [key, value]) => {
    const next = key in acc ? arrayFrom(acc[key]).concat(value) : value
    return { ...acc, [key]: next }
  }, {} as PlainObject)
