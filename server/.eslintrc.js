module.exports = {
    env: {
        'browser': true,
        'es2021': true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        'ecmaVersion': 'latest'
    },
    rules: {
        'quotes': ['error', 'single'],
        'indent': 'off',
        'max-len': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'semi': ['error', 'always'],
        'new-cap': 'off',
        'no-throw-literal': 'off',
    }
};
