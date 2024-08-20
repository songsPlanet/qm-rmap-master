import path from 'path';
import chalk from 'chalk';
import { rollup } from 'rollup';
import { fileURLToPath } from 'url';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import image from '@rollup/plugin-image';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import replaceLessToCss from './rollup-plugin-less2css.js';
// import divisionAntDesignIcons from './rollup-plugin-division-ant-design-icons.js';

const context = fileURLToPath(new URL('../', import.meta.url));
const extensions = [ '.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs' ];

const inputOptions = {
  input: path.resolve(context, 'src/lib/index.ts'),
  external: [ /[\\/]node_modules[\\/]/, /\.less/, /\.css/ ],
  makeAbsoluteExternalsRelative: false,
  plugins: [
    nodeResolve(),
    commonjs(),
    alias({ entries: { '@': path.resolve(context, 'src') } }),
    typescript(),
    babel({
      extensions,
      babelHelpers: 'runtime',
      exclude:/[\\/]node_modules[\\/]/,
    }),
    // encode image to base64
    image(),
    replaceLessToCss(),
    // divisionAntDesignIcons(),
  ]
};

const outputOptions = {
  format: 'es',
  preserveModules: true,
  preserveModulesRoot: 'src/lib',
  dir: path.resolve(context, 'es'),
};

export default async function build () {
  let bundle = null;
  try {
    bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
  } catch (error) {
    const msg = error.stack.replace(/^\b/mg, '   ');
    process.stdout.write('\n');
    process.stdout.write(chalk.red(msg));
    process.stdout.write('\n');
    throw error;
  }

  await bundle.close();
  process.stdout.write(chalk.green('rollup 打包成功\n'));
}
