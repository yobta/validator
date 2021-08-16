export const pluralizeEn = (value, word, suffix = 's') => {
  return value === 1 ? `${value} ${word}` : `${value} ${word}${suffix}`
}
