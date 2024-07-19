const voidValues = new Set<unknown>(['', undefined, null, NaN])

export function isVoid(input: unknown): boolean {
  return voidValues.has(typeof input === 'string' ? input.trim() : input)
}
