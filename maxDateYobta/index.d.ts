import { SyncRule } from '../createRule/index.js'

type MessageFunc = (limit: Date) => string

export const maxDateMessage: MessageFunc

export function maxDateYobta<I extends Date>(
  limit: Date,
  message?: MessageFunc
): SyncRule<I, I>
