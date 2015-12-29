/**
 * Created by ziki on 2015/12/29.
 */
var webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        path: './dist',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue'}
        ]
    }
};
