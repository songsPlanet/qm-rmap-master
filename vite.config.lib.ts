import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import libcss from 'vite-plugin-libcss';
import path from 'path';
import { fileURLToPath } from 'url';
import presetEnv from 'postcss-preset-env';

const __dirname = fileURLToPath(new URL('./', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libcss(),
  ],
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
      entry: './src/gis/index.ts', // 入口文件路径
      name: "qm-rmap",
      fileName: 'qm-rmap',
    },
    rollupOptions:
    {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom'],
      output: [
        {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            'react': 'react',
            'react-dom': 'react-dom',
          },
        },
      ]
    },
  },
});
