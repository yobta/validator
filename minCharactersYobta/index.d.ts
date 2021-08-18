import { SyncRule } from '../createRule/index.js'

type MessageFunc = (limit: number) => string

export const minCharactersMessage: MessageFunc

export function minCharactersYobta<I extends string>(
  limit: number,
  message?: MessageFunc
): SyncRule<I, I>
