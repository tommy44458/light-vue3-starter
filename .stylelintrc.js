module.exports = {
    extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-recommended-vue',
        'stylelint-plugin-stylus/recommended',
    ],
    ignoreFiles: ['dist/**/*', 'node_modules/**/*'],
    plugins: ['stylelint-order'],
    overrides: [
        {
            files: ['**/*.(scss|css|html|vue)'],
            customSyntax: 'postcss-scss',
        },
        {
            files: ['**/*.(html|vue)'],
            customSyntax: 'postcss-html',
        },
    ],
    rules: {
        // recommended rules
        indentation: 4,
        'at-rule-no-unknown': null,
        'scss/at-rule-no-unknown': true,

        // any other rules you'd want to change e.g.
        'scss/dollar-variable-pattern': '^foo',
        'scss/selector-no-redundant-nesting-selector': true,

        'max-nesting-depth': null,
        'max-line-length': null,
        'selector-max-compound-selectors': null,
        'selector-pseudo-class-no-unknown': null,
        'selector-no-qualifying-type': null,
        'selector-class-pattern': null,
        'function-parentheses-newline-inside': null,
        'at-rule-no-unknown': null,
        'color-function-notation': 'legacy',
        'alpha-value-notation': 'number',
        'scss/no-global-function-names': null,
        'scss/comment-no-empty': null,
        'scss/dollar-variable-pattern': null,
    },
}
