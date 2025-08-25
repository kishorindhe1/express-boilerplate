module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base', // Airbnb rules for TS
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Prettier plugin
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/test.ts', '**/*.spec.ts'] },
    ],
    'class-methods-use-this': 'off', // Common in services/controllers
    'no-console': 'warn', // Allow console but warn
  },
  settings: {
    'import/resolver': {
      typescript: {}, // Let ESLint resolve TS paths
    },
  },
};
