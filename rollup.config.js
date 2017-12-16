import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
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
    plugins: [resolve(), typescript()]
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
      resolve({
        module: false
      }),
      commonjs(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            target: 'es5'
          }
        }
      })
    ]
  }
];
