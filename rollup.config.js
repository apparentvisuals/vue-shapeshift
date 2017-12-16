import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: './src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    external: ['vue'],
    plugins: [
      vue({
        css: 'dist/vue-shapeshift.css'
      }),
      typescript()
    ]
  },
  {
    input: './src/index.ts',
    output: [{ file: 'examples/vue-shapeshift.js', format: 'iife' }],
    name: 'VueShapeshift',
    external: ['vue'],
    globals: {
      vue: 'Vue'
    },
    plugins: [
      vue(),
      typescript({
        declaration: false
      })
    ]
  }
];
