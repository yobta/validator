import { SyncRule } from '../createRule/index.js'

export const stringMessage: string

export function stringYobta<I>(
  message?: string
): SyncRule<I, string | undefined>
