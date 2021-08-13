import { SyncRule } from '../createRule/index.js'

export const stringTypeMessage: string

export function stringType<I>(message?: string): SyncRule<I, string | undefined>
