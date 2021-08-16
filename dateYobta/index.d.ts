import { SyncRule } from '../createRule/index.js'

export const dateMessage: string

export function dateYobta<I>(message?: string): SyncRule<I, Date | undefined>
