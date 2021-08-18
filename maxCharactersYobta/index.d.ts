import { SyncRule } from '../createRule/index.js'

type MessageFunc = (limit: number) => string

export const maxCharactersMessage: MessageFunc

export function maxCharactersYobta<I extends string>(
  limit: number,
  message?: MessageFunc
): SyncRule<I, I>
