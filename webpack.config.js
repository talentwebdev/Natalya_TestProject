const path = require('path');
module.exports = {
   // define entry file
   entry: './src/index.js',
   output: {
        path: path.resolve('dist'),
        filename: 'main.js'
    },
   // define babel loader
   module: {
       rules: [
           { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
       ]
   },
   // define port
   devServer: {    
    port: 3000
  }
};