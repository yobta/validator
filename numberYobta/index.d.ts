import { SyncRule } from '../createRule/index.js'

export const numberMessage: string

export function numberYobta<I>(
  message?: string
): SyncRule<I, number | undefined>
