export type PrettyTypeYobta<T> = {
  [K in keyof T]: T[K]
}
