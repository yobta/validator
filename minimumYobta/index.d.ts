import { SyncRule } from '../createRule/index.js'

type MessageFunc = (limit: number) => string

export const minimumYobtaMessage: MessageFunc

export function minimumYobta<I extends number>(
  limit: number,
  message?: MessageFunc
): SyncRule<I, I>
