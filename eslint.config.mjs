// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname
    }
  },
  ignores: ['dist/**/*', 'node_modules/*', '**/*.js'],
  files: ['**/*.ts', '**/*.js'],
  extends: [
    eslint.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic
  ],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    quotes: ['error', 'single']
  }
});
