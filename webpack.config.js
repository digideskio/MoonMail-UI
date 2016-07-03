import webpack from 'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

export default function(options) {
  const webpackConfig = {
    entry: [
      'babel-polyfill',
      './src/index.js'
    ],
    output: {
      path: './public',
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [],
    module: {
      loaders: [{
        exclude: /node_modules/,
        loader: 'babel'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.html$/,
        loader: 'html'
      }]
    },
    resolve: {
      modules: ['./src', 'node_modules'],
      extensions: ['', '.js', '.jsx', '.json']
    },
    externals: {
      jquery: 'jQuery'
    },
    postcss() {
      return [precss, autoprefixer];
    }
  };

  if (options.dev) {
    webpackConfig.devtool = 'source-map';
    webpackConfig.devServer = {
      historyApiFallback: true,
      inline: true,
      contentBase: 'public'
    };
  }

  if (options.prod) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': 'production'
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      })
    );
  }

  return webpackConfig;
}
