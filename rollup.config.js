import css from 'rollup-plugin-css-porter';

export default {
    input: 'minimalui.js',
    output: {
        file: 'dist/minimalui.js',
        format: 'cjs'
    },
    plugins: [ css({
        raw: 'dist/minimalui.css',
        minified: false,
    }) ]
};