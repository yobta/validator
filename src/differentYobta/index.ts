import { ruleYobta, SyncRule } from '../ruleYobta'
import { getIn } from '../_internal/getIn'
import { Path } from '../_internal/createContext'

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
