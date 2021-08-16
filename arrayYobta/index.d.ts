import { SyncRule } from '../createRule/index.js'

export const arrayMessage: string

export function arrayYobta<I>(message?: string): SyncRule<I, any[] | undefined>
