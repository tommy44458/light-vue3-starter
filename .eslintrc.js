/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        'vue/setup-compiler-macros': true,
    },
    globals: {
        expect: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-typescript/recommended',
        'airbnb-base',
        'prettier',
    ],
    plugins: ['prettier', 'vue'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    rules: {
        semi: 'off',
        quotes: ['warn', 'single'],
        'no-unused-vars': 'warn',
        'no-console': 'off',
        'no-tabs': 'off',
        'no-restricted-syntax': 'off',
        'func-names': 'off',
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.ts', '.js', '.jsx', 'vue', '.json', '.vue'],
            },
        },
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'], // Your TypeScript files extension
            // As mentioned in the comments, you should extend TypeScript plugins here,
            // instead of extending them outside the `overrides`.
            // If you don't want to extend any rules, you don't need an `extends` attribute.
            extends: ['airbnb-typescript/base'],

            parserOptions: {
                project: ['./tsconfig.json'], // Specify it only for TypeScript files
            },
            rules: {
                semi: 'off',
                '@typescript-eslint/semi': ['error', 'never'],
                '@typescript-eslint/indent': ['warn', 4],
                '@typescript-eslint/no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-vars': 'warn',
                'no-unused-vars': 'warn',
                'no-console': 'off',
                'no-tabs': 'off',
                'no-restricted-syntax': 'off',
                'func-names': 'off',
            },
        },
    ],
}
