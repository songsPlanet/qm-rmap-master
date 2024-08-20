import path from 'path';
const extensions = [ '.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs' ];

export default function divisionAntDesignIcons() {
  return {
    name: 'rollup-plugin-division-ant-design-icons',
    transform: {
      sequential: true,
      handler(code, id) {
        const extname = path.extname(id);

        if (!code || !extensions.includes(extname)) return;

        if (/import {(.+)} from (['"])@ant-design\/icons\2/.test(code)) {
          const values = RegExp.$1;
          const reg = /\b(\w+)\b/g;
          const result = [];
          while (reg.test(values)) {
            result.push(RegExp.$1);
          }

          let context = '';
          result.forEach(item => context += `import ${item} from '@ant-design/icons/${item}';\n`);

          return { code: code.replace(/import .* from (['"])@ant-design\/icons\1;\n/, context) };
        }
      }
    },
  };
}
