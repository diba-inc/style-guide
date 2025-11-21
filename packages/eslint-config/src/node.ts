import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import pluginN from 'eslint-plugin-n'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // Common ignores
  {
    ignores: [
      '.next/',
      'build/',
      'coverage/',
      'dist/',
      'generated/',
      'node_modules/',
      'out/',
      'worker-func/',
      '**/*.d.ts'
    ]
  },

  // JS / TS recommended
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Node-specific rules
  {
    plugins: { n: pluginN },
    rules: {
      // Turn off due to false positives in monorepos and TS type imports
      'n/no-missing-import': 'off',
      'n/prefer-global/process': 'off',
      'n/no-unsupported-features/node-builtins': 'off'
    }
  },

  // Rules common to TS / JS
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    plugins: {
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort
    },
    rules: {
      // Disable import rules and delegate to simple-import-sort
      'import/order': 'off',
      'sort-imports': 'off',

      // Disable unused variable checks in eslint and ts-eslint, unify under unused-imports
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      // Sorting rules
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports
            ['^\\u0000'],
            // Node / external modules
            ['^node:', '^@?\\w'],
            // Aliases
            ['^@/', '^~/'],
            // Parent directories
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Same directory
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // CSS
            ['^.+\\.?(css)$']
          ]
        }
      ],

      // Unused imports / variables
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ]
    }
  },

  // Disable rules that may conflict with Prettier
  prettier
)
