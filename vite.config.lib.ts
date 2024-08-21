import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import libcss from 'vite-plugin-libcss';
import path from 'path';
import { fileURLToPath } from 'url';
import presetEnv from 'postcss-preset-env';
import dts from "vite-plugin-dts"

const __dirname = fileURLToPath(new URL('./', import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  

  plugins: [react(), libcss(), legacy(),
    dts({
      entryRoot: "./src",
      outDir: ["./es/src", "./lib/src"],
      tsconfigPath:"./tsconfig.lib.json"
    })
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
      // cssMinify: true,
      minify: 'terser',
      // emptyOutDir: true,
      // cssCodeSplit: true,
      // copyPublicDir: true,
      sourcemap: 'hidden',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      lib: {
        entry: 'src/gis/index.ts', // 入口文件路径
        name: "index",
        fileName: 'index',
      },
      rollupOptions:
      {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['react', 'react-dom'],
        output: [
          {
            format: "es",
            // 打包后文件名
            entryFileNames: "[name].mjs",
            // 让打包目录和我们的目录对应
            preserveModules: true,
            exports: "named",
            // 打包根目录
            dir: "../es",
          },
          {

            format: "cjs",
            // 打包后文件名
            entryFileNames: "[name].js",
            // 让打包目录和我们的目录对应
            preserveModules: true,
            exports: "named",
            // 打包根目录
            dir: "../lib",
          },
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
