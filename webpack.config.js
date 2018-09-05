const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "app.js",
        publicPath: "dist/"
    },
    devServer: {
        port: 3000
    }
    ,
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ]


};

module.exports = config;