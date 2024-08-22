import path from 'path';
const extensions = [ '.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs' ];

export default function replaceLessToCss() {
  return {
    name: 'rollup-plugin-less2css',
    transform: {
      sequential: true,
      handler(code, id) {
        const extname = path.extname(id);

        if (!code || !extensions.includes(extname)) return;

        return { code: code.replace(/\.less/g, '.css') };
      }
    },
  };
}
