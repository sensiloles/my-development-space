import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import constants from './constants';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const { host, port, src, entry, build, html, stats } = constants;

const config: Configuration = {
  mode: 'development',
  target: 'web',
  context: src,
  entry,
  output: {
    path: build,
    publicPath: build,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    // TODO: move to prod config
    // filename: '[name].[chunkhash].js',
    // chunkFilename: '[name].[chunkhash].chunk.js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  devtool: 'eval-source-map',
  devServer: {
    host,
    port,
    compress: true,
    historyApiFallback: true,
    static: {
      directory: build,
      watch: true
    },
    devMiddleware: {
      writeToDisk: true
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [src, 'node_modules']
  },
  // TODO: move to prod config
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'all',
  //     maxInitialRequests: Infinity,
  //     minSize: 100000,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/](?!@r1)\w*([\\/]|$)/,
  //         name: 'vendor',
  //         priority: 10
  //       }
  //     }
  //   }
  // },
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
      template: html
    }),
    new CleanWebpackPlugin()
  ],
  stats
};

export default config;
