import globals from 'globals'
import vitest from '@vitest/eslint-plugin'
import { defineConfig } from 'eslint/config'

export default defineConfig(
  {
    files: [
      '**/*.test.ts',
      '**/*.test.tsx',
      'tests/**/*.test.ts',
      'tests/**/*.test.tsx'
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...vitest.environments.env.globals
      }
    },
    plugins: { vitest },
    rules: {
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
      'vitest/valid-expect': 'error',

      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'react/function-component-definition': 'off',
      'react/no-multi-comp': 'off',
      'react-hooks/exhaustive-deps': 'off'
    }
  }
)
