const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TypeDocWebpackPlugin = require('typedoc-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: "vendor",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  entry: {
    main: ["webpack-hot-middleware/client?reload=true", './src/index']
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.bundle.js',
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    hot: true
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name]-[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(tsx?)|(js)$/,
        exclude: /(node_modules|bower_components)/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
            plugins: [
              require('@babel/plugin-proposal-object-rest-spread'),
              require('@babel/plugin-proposal-class-properties'),
              require('@babel/plugin-syntax-dynamic-import'),
              require('@babel/plugin-transform-runtime')
            ]
          }
        }
      }
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      title: "Link"
    }),
    new TypeDocWebpackPlugin({
      out: './docs',
      module: 'commonjs',
      target: 'es6',
      exclude: '**/node_modules/**/*.*',
      experimentalDecorators: true,
      excludeExternals: true,
      // theme: 'markdown',
      jsx: 'react',
      includeDeclarations: false,
      ignoreCompilerErrors: true,
    }),
    new BundleAnalyzerPlugin({
      generateStatsFile: true
    })
  ]
};