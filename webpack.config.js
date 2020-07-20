const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
   entry: './src/main.js',
   output: {
      path: path.join(__dirname, '/public'),
      filename: 'bundle.js'
   },
   devServer: {
      inline: true,
      port: 3000
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['@babel/preset-env', '@babel/preset-react']
            }
         },
         {
            test: /\.(png|jpg|svg)$/,
            use: [
               'file-loader'
            ]
         },
         {
            test: /\.(scss|css)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
         },
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            },
         },
         {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader']
         }
      ]
   },
   devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, '/public')
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html'
      }),
      new SourceMapDevToolPlugin({
         filename: "[file].map"
      })
   ]
}