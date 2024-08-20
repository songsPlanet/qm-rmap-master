import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import process from 'process';
import libcss from 'vite-plugin-libcss';
import path from 'path';
import { fileURLToPath } from 'url';
import presetEnv from 'postcss-preset-env';

const __dirname = fileURLToPath(new URL('./', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  // 打包入口文件夹
  const define = Object.keys(env).reduce((memo, key) => {
    memo[key] = JSON.stringify(env[key]);
    return memo;
  }, {});

  return {
    plugins: [react(), libcss(),],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      postcss: {
        plugins: [presetEnv],
      },
      preprocessorOptions: {
        less: {
          modifyVars: {
            themeColor: '#6C69FF',
          },
          globalVars: {},
          additionalData: '',
          javascriptEnable: true,
        },
      },
      devSourcemap: false,
    },
    build: {
      outDir: 'lib',// 自定义构建的输出目录
      cssMinify: true,
      minify: 'terser',
      emptyOutDir: true,
      cssCodeSplit: true,
      copyPublicDir: true,
      sourcemap: 'hidden',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      lib: {
        entry: 'src/gis/index.ts', // 入口文件路径
        formats: ['es', 'cjs', 'umd'], // 输出的格式  
      },
      rollupOptions:
        // {
        //   // 确保外部化处理那些你不想打包进库的依赖
        //   external: ['react', 'react-dom'],
        //   output: {
        //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        //     globals: {
        //       'react': 'react',
        //       'react-dom': 'react-dom',
        //     },
        //   },
        // },
      {
        output: {
          entryFileNames: 'static/js/[name][hash].js',
          chunkFileNames: 'static/js/[name][hash].chunk.js',
          assetFileNames(chunkInfo: any) {
            const { name } = chunkInfo;
            if (/\.(jpg|jpeg|png|webp|bmp|gif|svg)$/.test(name)) {
              return 'static/image/[name].[hash][extname]';
            } else if (/\.(woff2|woff|ttf|eot)$/.test(name)) {
              return 'static/font/[name].[hash][extname]';
            } else if (/\.css$/.test(name)) {
              return 'static/css/[name].[hash].css';
            } else {
              return 'static/[ext]/[name].[hash][extname]';
            }
          },
          manualChunks: {
            'vender-react': ['react', 'react-dom'],
          }
        }
      }
    },
  };
});
