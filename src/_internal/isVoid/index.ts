import type { YobtaVoid } from '../../_types/YobtaVoid'

const voidValues = new Set<unknown>(['', undefined, null, NaN])

export function isVoid(input: unknown): input is YobtaVoid {
  return voidValues.has(typeof input === 'string' ? input.trim() : input)
}
