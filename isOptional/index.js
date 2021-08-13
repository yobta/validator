export const optionalSet = new Set([undefined, null, ''])

export const isOptional = value => optionalSet.has(value)
