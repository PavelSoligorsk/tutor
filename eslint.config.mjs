// @ts-check
import { resolve } from 'node:path';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import boundaries from 'eslint-plugin-boundaries';

const rootDir = resolve(import.meta.dirname);

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'next-env.d.ts',
      '*.config.js',
      '*.config.mjs',
    ],
  },

  // Base ESLint recommended
  eslint.configs.recommended,

  // TypeScript ESLint - strict type-checked + stylistic
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // Main configuration for TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: rootDir,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      boundaries,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
      // FSD boundaries configuration
      'boundaries/root-path': rootDir,
      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'src/app/**',
          mode: 'folder',
        },
        {
          type: 'pages',
          pattern: 'src/pages/**',
          mode: 'folder',
        },
        {
          type: 'widgets',
          pattern: 'src/widgets/**',
          mode: 'folder',
        },
        {
          type: 'features',
          pattern: 'src/features/**',
          mode: 'folder',
        },
        {
          type: 'entities',
          pattern: 'src/entities/**',
          mode: 'folder',
        },
        {
          type: 'shared',
          pattern: 'src/shared/**',
          mode: 'folder',
        },
      ],
    },
    rules: {
      // ===== TypeScript strict rules =====
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-deprecated': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
        },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      // Relax some strict rules for React patterns
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],

      // ===== General best practices =====
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-nested-ternary': 'error',
      'no-unneeded-ternary': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': 'error',
      'prefer-destructuring': [
        'error',
        {
          array: false,
          object: true,
        },
      ],

      // ===== React rules =====
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-no-useless-fragment': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-array-index-key': 'warn',
      'react/hook-use-state': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ===== Next.js rules =====
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-img-element': 'error',

      // ===== Import rules (clean code) =====
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: 'next/**',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/app/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/pages/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/widgets/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/features/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/entities/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/shared/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-duplicates': 'error',
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',

      // ===== FSD Boundaries rules =====
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: 'Import from "${file.type}" to "${dependency.type}" is not allowed according to FSD rules',
          rules: [
            // app can import from any layer
            {
              from: 'app',
              allow: ['pages', 'widgets', 'features', 'entities', 'shared'],
            },
            // pages can import widgets, features, entities, shared
            {
              from: 'pages',
              allow: ['widgets', 'features', 'entities', 'shared'],
            },
            // widgets can import features, entities, shared
            {
              from: 'widgets',
              allow: ['features', 'entities', 'shared'],
            },
            // features can import entities, shared
            {
              from: 'features',
              allow: ['entities', 'shared'],
            },
            // entities can import shared only
            {
              from: 'entities',
              allow: ['shared'],
            },
            // shared can import only from shared
            {
              from: 'shared',
              allow: ['shared'],
            },
          ],
        },
      ],
      'boundaries/no-unknown': 'warn',
      'boundaries/no-unknown-files': 'off',
    },
  },

  // Configuration for JS config files
  {
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  }
);
