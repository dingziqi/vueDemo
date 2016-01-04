/**
 * Created by ziki on 2015/12/29.
 */
var path = require('path');
module.exports = {
    entry: './app/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        //publicPath: '/assets/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.vue$/, loader: 'vue'}
        ]
    }
};
