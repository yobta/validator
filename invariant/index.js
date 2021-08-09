export function invariant(precondition, message) {
  if (!precondition) throw new Error(message)
}
