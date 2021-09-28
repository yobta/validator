import { ruleYobta, SyncRule } from '../ruleYobta'
import { getIn } from '../_internal/getIn'
import { Path } from '../_internal/YobtaContext'

export const identicalMessage = (path: Path): string =>
  `It should be identical to "${path.join('.')}"`

export function identicalYobta<I>(
  path: Path,
  message = identicalMessage
): SyncRule<any, I> {
  return ruleYobta((input, { data }) => {
    if (input === getIn(data, path)) return input
    throw new Error(message(path))
  })
}
