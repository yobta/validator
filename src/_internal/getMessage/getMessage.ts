export const getMessage = (
  input: string | Function,
  ...args: any[]
): string => {
  return typeof input === 'function' ? input(...args) : input
}
