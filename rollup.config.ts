import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
const packageJson = require('./package.json');

const babelOptions = {
  presets: ["@babel/preset-env"],
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.less'],
  exclude: "**/node_modules/**"
}

export default [
  {
    input: 'src/gis/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: 'qm-rmap',
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],

    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.lib.json' }),
      postcss(),
      json(),
      terser(),
      babel(babelOptions)
    ],
  },
  {
    input: 'lib/esm/gis/index.d.ts',
    output: [
      {
        file: 'lib/index.d.ts',
        format: 'esm',
      },
    ],
    external: [/.css$/],
    plugins: [dts()],
  },
];
