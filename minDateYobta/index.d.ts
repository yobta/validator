import { SyncRule } from '../createRule/index.js'

type MessageFunc = (limit: Date) => string

export const minDateMessage: MessageFunc

export function minDateYobta<I extends Date>(
  limit: Date,
  message?: MessageFunc
): SyncRule<I, I>
