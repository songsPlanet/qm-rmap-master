const isDevelopment = process.env.NODE_ENV === 'development';
module.exports = {
  plugins: [
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    isDevelopment ? 'react-refresh/babel' : null,
  ].filter(Boolean),
  presets: [
    ['@babel/preset-env', { modules: false, debug: isDevelopment, useBuiltIns: 'usage', corejs: '3.30' }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ]
}
