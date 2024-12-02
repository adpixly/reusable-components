import react from 'eslint-plugin-react'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import config from 'eslint-config-love'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default [
  ...[].concat(config),
  ...compat.extends('plugin:react/recommended', 'next/core-web-vitals', 'plugin:react/jsx-runtime'),
  {
    plugins: {
      react,
      typescriptEslint
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json'
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    rules: {
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ],

      'react/prop-types': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
      'import/no-absolute-path': 'off',
      'multiline-ternary': 'off'
    }
  },
  {
    ignores: ['postcss.config.mjs', 'eslint.config.mjs', 'rollup.config.js', 'next-env.d.ts', '.next']
  }
]
