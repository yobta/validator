import { createRule, SyncRule } from '../createRule'
import { getIn } from '../getIn'
import { Path } from '../syncYobta'

export const identicalMessage = (path: Path): string =>
  `Should be identical to "${path.join('.')}"`

export function identicalYobta<I>(
  path: Path,
  message = identicalMessage
): SyncRule<any, I> {
  return createRule((input, { data }) => {
    if (input === getIn(data, path)) return input
    throw new Error(message(path))
  })
}
