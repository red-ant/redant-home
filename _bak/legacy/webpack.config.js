const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    script: './scripts/index.js',
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        use: ['json-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(ttf.*|eot.*|woff.*|ogg|mp3)$/,
        use: ['file-loader'],
      },
      {
        test: /.(png|jpe?g|gif|svg.*)$/,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'img-loader',
            options: {
              optimizationLevel: 7,
              progressive: true,
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          // Reference: https://github.com/webpack/style-loader
          // Use style-loader in development.
          fallback: 'style-loader',
          use: [
            // Reference: https://github.com/webpack/css-loader
            // Allow loading css through js
            {
              loader: 'css-loader',
              query: { sourceMap: false },
            },

            // Reference: https://github.com/postcss/postcss-loader
            // Postprocess your css with PostCSS plugins
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer],
              },
            },

            // Reference: https://github.com/webpack-contrib/sass-loader
            // Convert scss to css
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),

    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      minify: { minifyJS: true },
    }),

    new webpack.DefinePlugin({
      Environment: JSON.stringify(require('config')),
    }),

    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      jQuery: 'jquery',
      $: 'jquery',
    }),
  ],

  resolve: {
    //   root: path.join(__dirname, 'scripts'),
    //   extensions: ['', '.js', '.json'],
    // alias: {
    //   node_modules: path.join(__dirname, 'node_modules'),
    // },
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
};
