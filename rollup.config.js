import css from 'rollup-plugin-css-porter';

export default {
    input: 'minimalui.js',
    output: {
        file: 'dist/minimalui.js',
        format: 'cjs'
    },
    plugins: [ css({
        raw: false,
        minified: 'dist/minimalui.min.css',
    }) ]
};