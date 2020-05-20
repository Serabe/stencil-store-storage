import pkg from './package.json';
import bundleSize from 'rollup-plugin-bundle-size';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'build/index.js',

  output: [
    {
      format: 'cjs',
      file: pkg.main,
    },
    {
      format: 'esm',
      file: pkg.module,
    },
  ],

  external: ['@stencil/core', '@stencil/store'],
  plugins: [terser(), bundleSize()],
};
