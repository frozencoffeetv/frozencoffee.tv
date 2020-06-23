const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const fs = require('fs');

const CERT_PATH = 'Z:/Projects/local-certs/';

const isProd = (env) => {
  return env === 'production';
}

module.exports = (env, options) => {
  return {
    mode: env || 'development',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js'
    },
    optimization: {
      minimize: isProd(env) ? true : false,
      minimizer: [new TerserPlugin({
        terserOptions: {
          mangle: true,
          keep_fnames: false,
          keep_classnames: false
        },
        extractComments: true
      })]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: true,
        cache: true
      })
    ],
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 8080,
      https: true,
      key: fs.readFileSync(`${CERT_PATH}/localhost-key.pem`),
      cert: fs.readFileSync(`${CERT_PATH}/localhost.pem`),
      compress: true,
      allowedHosts: [
        '.twitch.tv'
      ]
    }
  }
}