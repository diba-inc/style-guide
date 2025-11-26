import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import nextPlugin from '@next/eslint-plugin-next'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import reactPlugin from 'eslint-plugin-react'
import testingLibrary from 'eslint-plugin-testing-library'
import unusedImports from 'eslint-plugin-unused-imports'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['.next/**', 'node_modules/**']
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptEslintParser
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      next: nextPlugin,
      react: reactPlugin,
      'simple-import-sort': simpleImportSort,
      'testing-library': testingLibrary,
      'unused-imports': unusedImports
    },
    rules: {
      // Naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        {
          // Variables, functions, properties, and other "variable-like" identifiers
          selector: 'variableLike',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow'
        },
        {
          // Standard functions starting with lowercase
          selector: 'function',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          filter: {
            regex: '^[A-Z]',
            match: false
          }
        },
        {
          // Component-like functions starting with uppercase
          selector: 'function',
          format: ['PascalCase'],
          filter: {
            regex: '^[A-Z]',
            match: true
          }
        },
        {
          // Types, interfaces, enums, etc.
          selector: 'typeLike',
          format: ['PascalCase']
        }
      ],

      // Formatting rules delegated to Prettier. Removed redundant ESLint formatting rules to avoid conflicts.
      indent: 'off', // Delegate to Prettier

      // React-related rules
      'react/display-name': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'function-expression'
        }
      ],
      'react/jsx-uses-react': 'off',
      'react/no-multi-comp': 'off',
      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
      'react/react-in-jsx-scope': 'off',

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

      // Testing Library
      'testing-library/consistent-data-testid': [
        'error',
        {
          testIdPattern: '^[a-z][a-z0-9-]+$' // kebab-case
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
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // Disable rules that may conflict with Prettier
  prettier
)
