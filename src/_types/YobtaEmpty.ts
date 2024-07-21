type EmptyObject = {
  [K in any]: never
}

export type YobtaEmpty =
  | ''
  | []
  | EmptyObject
  | Iterable<never>
  | null
  | typeof NaN
  | undefined
