const voidValues = new Set(['', undefined, null, NaN])

export function isVoid(input: any): boolean {
  let value = typeof input === 'string' ? input.trim() : input
  return input?.length === 0 || voidValues.has(value)
}
