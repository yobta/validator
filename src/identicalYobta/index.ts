import { ruleYobta, SyncRule } from '../ruleYobta/index.js'
import { getIn } from '../_internal/getIn/index.js'
import { Path } from '../_internal/createContext/index.js'
import { getMessage } from '../_internal/getMessage/getMessage.js'

export const identicalMessage = (path: Path): string =>
  `It should be identical to "${path.join('.')}"`

export function identicalYobta<I>(
  path: Path,
  message: typeof identicalMessage | string = identicalMessage,
): SyncRule<any, I> {
  return ruleYobta((input, { data }) => {
    if (input === getIn(data, path)) return input
    throw new Error(getMessage(message, path))
  })
}
