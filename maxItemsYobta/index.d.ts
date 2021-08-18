import { SyncRule } from '../createRule/index.js'

type MessageFunc = (limit: number) => string

export const maxItemsMessage: MessageFunc

export function maxItemsYobta<I extends any[]>(
  limit: number,
  message?: MessageFunc
): SyncRule<I, I>
