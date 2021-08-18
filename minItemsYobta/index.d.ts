import { SyncRule } from '../createRule/index.js'

type MessageFunc = (limit: number) => string

export const minItemsMessage: MessageFunc

export function minItemsYobta<I extends any[]>(
  limit: number,
  message?: MessageFunc
): SyncRule<I, I>
