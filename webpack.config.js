const PATH = {
  src: './source/',
  build: '/public/'
}

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

module.exports = {
  mode: 'development',
  entry: PATH.src + 'index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, PATH.build)
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, PATH.build),
    watchContentBase: true,
    //host: '192.168.31.8', // ip workstation
    // disableHostCheck: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
        template: PATH.src + 'index.html',
        filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: PATH.src + 'img', to:'img'}
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    hmr: isDev,
                    reloadAll: true
                }
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers:['ie >= 8', 'last 4 version']
                  })
                ],
                sourceMap: true
              }
            }
        ]
      },
      {
        test: /\.less$/,
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                  hmr: isDev,
                  reloadAll: true
              }
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers:['ie >= 8', 'last 4 version']
                  })
                ],
                sourceMap: true
              }
            },
            'less-loader'
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: ['url-loader']
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
              loader: 'url-loader',
              options: {
                  attrs: ['img:src'],
                  name: './img/[name].[ext]',
                  esModule: false,
              }
          },
        ]
      },
    ]
  }
}
