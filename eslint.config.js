import loguxTsConfig from '@logux/eslint-config/ts'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  ...loguxTsConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-const': 'error',
      'prefer-let/prefer-let': 'off',
    },
  },
]
