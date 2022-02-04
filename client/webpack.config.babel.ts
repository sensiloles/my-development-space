import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const sourcePath = path.join(__dirname, '/');
const outPath = path.join(__dirname, 'dist');

const config: Configuration = {
  mode: 'development',
  target: 'web',
  context: sourcePath,
  entry: sourcePath,
  output: {
    publicPath: outPath,
    filename: 'main.bundle.js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: outPath,
      watch: true
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(sourcePath, 'index.html')
    }),
    new CleanWebpackPlugin()
  ]
};

export default config;
