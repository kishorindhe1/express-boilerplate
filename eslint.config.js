import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended, // Base JS rules
  ...tseslint.configs.recommended, // TS rules

  {
    plugins: {
      prettier,
    },

    rules: {
      'prettier/prettier': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },

  eslintConfigPrettier, // Disable conflicting Prettier rules
];
