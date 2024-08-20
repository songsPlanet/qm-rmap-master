const fs = require('fs');
const path = require('path');
const env = require('../env.json');
const { DefinePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const terserPlugin = require('terser-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const CaseSensitivePlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

if (fs.existsSync('../env.production.json')) Object.assign(env, require('../env.production.json'));
const { PUBLIC_PATH } = env;

module.exports = {
  bail: true,
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: path.resolve('src/index.tsx'),
  output: {
    clean: true,
    publicPath: PUBLIC_PATH,
    path: path.resolve('build'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.jsx', '.js' ],
    modules: [ path.resolve('node_modules') ],
    alias: {
      '@': path.resolve('src'),
    }
  },
  optimization: {
    minimizer: [
      new terserPlugin(),
      new CssMinimizerPlugin(),
    ],
    // 开启 Tree Shaking
    usedExports: true,
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      minRemainingSize: 25 * 1024,
      maxSize: 250 * 1024,
      minSize: 25 * 1024,
    },
  },
  cache: {
    type: 'filesystem',
    store: 'pack',
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
      // 默认情况下 webpack 与 loader 是构建依赖。
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(tsx?|jsx?)$/,
            loader: 'babel-loader',
            include: path.resolve('src'),
            options: {
              babelrc: false,
              compact: true,
              configFile: true,
              cacheDirectory: true,
              cacheCompression: true,
            }
          },
          {
            test: /\.(png|jpe?g|gif|bmp|webp|svg)$/,
            include: path.resolve('src'),
            type: 'asset',
            generator: {
              emit: true,
              publicPath: PUBLIC_PATH,
              filename: 'static/images/[name].[hash:8][ext]',
            },
            parser: {
              dataUrlCondition: { maxSize: 10 * 1024 }
            },
          },
          {
            test: /\.(woff2|woff|ttf|eot)$/,
            include: path.resolve('src'),
            type: 'asset',
            generator: {
              emit: true,
              publicPath: PUBLIC_PATH,
              filename: 'static/font/[name].[hash:8][ext]',
            },
            parser: {
              dataUrlCondition: { maxSize: 10 * 1024 }
            }
          },
          {
            test: /\.(mp4|mp3|webm|ogg|wav|flac|aac)$/,
            include: path.resolve('src'),
            type: 'asset',
            generator: {
              emit: true,
              publicPath: PUBLIC_PATH,
              filename: 'static/media/[name].[hash:8][ext]',
            },
            parser: {
              dataUrlCondition: { maxSize: 10 * 1024 }
            },
          },
          {
            test: /\.module\.css$/,
            include: path.resolve('src'),
            use: [
              CssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  url: true,
                  import: true,
                  importLoaders: 1,
                  modules: {
                    auto: true,
                    mode: 'local',
                    localIdentName: '[path][name]-[local]-[hash:base64:5]',
                  }
                }
              },
              require.resolve('postcss-loader'),
            ]
          },
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: [
              CssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  url: true,
                  import: true,
                  modules: false,
                  importLoaders: 1,
                }
              },
              require.resolve('postcss-loader'),
            ]
          },
          {
            test: /\.module\.less$/,
            include: path.resolve('src'),
            use: [
              CssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  url: true,
                  import: true,
                  importLoaders: 2,
                  modules: {
                    auto: true,
                    mode: 'local',
                    localIdentName: '[path][name]-[local]-[hash:base64:5]',
                  }
                }
              },
              require.resolve('postcss-loader'),
              {
                loader: require.resolve('less-loader'),
                options: {
                  lessOptions: {
                    modifyVars: {},
                    globalVars: {},
                    javascriptEnable: true,
                  },
                  additionalData: '',
                }
              }
            ]
          },

          {
            test: /\.less$/,
            exclude: /\.module\.less$/,
            use: [
              CssExtractPlugin.loader,
              {
                loader: require.resolve('css-loader'),
                options: {
                  url: true,
                  import: true,
                  modules: false,
                  importLoaders: 2,
                }
              },
              require.resolve('postcss-loader'),
              {
                loader: require.resolve('less-loader'),
                options: {
                  lessOptions: {
                    modifyVars: {},
                    globalVars: {},
                    javascriptEnable: true,
                  },
                  additionalData: '',
                }
              }
            ]
          },
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      inject: true,
      filename: 'index.html',
      scriptLoading: 'blocking',
      template: path.resolve('public/index.html'),
      meta: {
        viewport: {
          name: 'width=device-width',
          content: 'initial-scale=1.0, user-scalable: no, maximum-scale=1.0, minimum-scale=no'
        }
      }
    }),
    new DefinePlugin({
      'process.env': Object.keys(env).reduce((memo, key) => {
        memo[key] = JSON.stringify(env[key]);
        return memo;
      }, {}),
    }),
    new InterpolateHtmlPlugin(HtmlPlugin, env),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/*',
          to: '[name][ext]',
          filter: (filepath) => {
            if (filepath.endsWith('html')) return false;
            return true;
          }
        }
      ]
    }),
    new CssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new CaseSensitivePathsPlugin(),
    new ProgressBarPlugin(),
    // 资源模块分析
    process.env.ANALYSE ? new BundleAnalyzerPlugin() : null,
  ].filter(Boolean),
}
