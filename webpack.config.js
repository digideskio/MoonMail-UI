import webpack from 'webpack';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

const env = process.env.NODE_ENV || 'development';

const webpackConfig = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: './public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss() {
    return [precss, autoprefixer];
  }
};

if (env === 'development') {
  webpackConfig.devtool = 'source-map';
  webpackConfig.devServer = {
    historyApiFallback: true,
    inline: true,
    contentBase: 'public'
  };
}

if (env === 'production') {
  webpackConfig.plugins.push(
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

export default webpackConfig;
