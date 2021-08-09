export const optionalList = [undefined, null, '']

export const isOptional = value => optionalList.includes(value)
