module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  rules: {
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',    // 'none' or 'semi' or 'comma'
        requireLast: true,
    },
      singleline: {
        delimiter: 'semi',    // 'semi' or 'comma'
        requireLast: false,
      },
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/interface-name-prefix': ['warn',
      { 'prefixWithI': 'always' }
    ],
    '@typescript-eslint/no-unused-vars': ['error', {
      ignoreRestSiblings: true,
      argsIgnorePattern: '^_',
    }],
    '@typescript-eslint/interface-name-prefix':  'off',
    '@typescript-eslint/class-name-casing': ['error', {
      allowUnderscorePrefix: true
    }],
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
          "delimiter": "none"
      },
      "singleline": {
          "delimiter": "comma",
          "requireLast": false
      }
    }],
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    'react/prop-types': 'off',
  }
};
