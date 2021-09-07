import { createRule, SyncRule } from '../createRule'
import { getIn } from '../getIn'
import { Path } from '../YobtaContext'

export const differentMessage = (path: Path): string =>
  `It should be different from "${path.join('.')}"`

export function differentYobta<I>(
  path: Path,
  message = differentMessage
): SyncRule<any, I> {
  return createRule((input, { data }) => {
    if (input === getIn(data, path)) throw new Error(message(path))
    return input
  })
}
