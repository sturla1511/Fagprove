module.exports = {
    root: true,
    env: {
        node: true,
        browser: true
    },
    extends: [
        'plugin:nuxt/recommended',
        'plugin:vue/vue3-strongly-recommended',
        'eslint:recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // Vue
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/max-attributes-per-line': ['error', {
            'singleline': { 'max': 3 },
            'multiline': { 'max': 1 }
        }],
        'vue/multi-word-component-names': 'off',
        'vue/require-default-prop': 'off', // might turn on later
        'no-unused-vars': 'off', // conflicts with standard Vue template

        // General
        'block-spacing': 'error',
        'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
        'keyword-spacing': 'error',
        'space-before-blocks': 'error',
    },
    globals: {
        $fetch: 'readonly',
        defineEventHandler: 'readonly',
        defineNuxtConfig: 'readonly',
        gql: 'readonly',
        readBody: 'readonly',
        useQuery: 'readonly',
        useRuntimeConfig: 'readonly',
        useStorage: 'readonly'
    }
}
