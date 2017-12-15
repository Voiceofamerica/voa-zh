const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const package = require('./package.json')

const ENV_PROD = 'production'
const ENV_DEV = 'development'
const ENV_HOST = 'host'
const env = (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()) || ENV_DEV

const __DEV__ = env !== ENV_PROD
const __HOST__ = env === ENV_HOST

const srcDir = path.join(__dirname, 'src')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.tsx'
  ],
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'www'),
    publicPath: __HOST__ ? '/' : undefined
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  devtool: 'source-map',  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.d.ts'],
    alias: {
      containers: path.join(srcDir, 'containers'),
      helpers: path.join(srcDir, 'helpers'),
      'redux-store': path.join(srcDir, 'redux-store'),
      routes: path.join(srcDir, 'routes'),
      res: path.join(__dirname, 'res'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        loaders: [{
          loader: 'graphql-tag/loader'
        }],
      },
      {
        test: /\.tsx?$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: path.join(__dirname, 'tsconfig.json')
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ],
        include: /globalStyle\.scss|node_modules\/mdi/
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader?sourceMap&modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:5]',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ],
        exclude: /globalStyle\.scss|node_modules\/mdi/
      },
      {
        test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
        loaders: [{
          loader: 'url-loader',
          options: {
            limit: 16384,
            fallback: 'file-loader'
          }
        }]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
      '__DEV__': JSON.stringify(__DEV__),
      '__HOST__': JSON.stringify(__HOST__),
    }),
    new HtmlWebpackPlugin({
      title: package.displayName,
      template: path.join(__dirname, 'src/index.ejs')
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'static/ADBMobileConfig.json')
      }
    ]),
  ]
}
