import { ruleYobta, SyncRule } from '../ruleYobta/index.js'
import { getIn } from '../_internal/getIn/index.js'
import { Path } from '../_internal/createContext/index.js'

export const differentMessage = (path: Path): string =>
  `It should be different from "${path.join('.')}"`

export function differentYobta<I>(
  path: Path,
  message = differentMessage,
): SyncRule<any, I> {
  return ruleYobta((input, { data }) => {
    if (input === getIn(data, path)) throw new Error(message(path))
    return input
  })
}
