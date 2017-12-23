import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default [{
  input: './src/index.ts',
  output: [{
    file: 'examples/vue-shapeshift.js',
    format: 'iife'
  }],
  name: 'VueShapeshift',
  external: ['vue', 'vue-property-decorator'],
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
          target: 'es5',
          lib: ['es2015', 'es2017', 'dom']
        }
      }
    })
  ]
}];