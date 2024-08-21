module.exports = {
  plugins: [
    ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'lib', style: false }],
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
  presets: [
    ['@babel/preset-env', { modules: 'commonjs', debug: false, useBuiltIns: 'usage', corejs: '3.30' }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ]
}
