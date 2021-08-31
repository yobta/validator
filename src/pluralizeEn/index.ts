export const pluralizeEn = (
  value: number,
  word: string,
  suffix = 's'
): string => {
  return value === 1 ? `${value} ${word}` : `${value} ${word}${suffix}`
}
