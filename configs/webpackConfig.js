const path = require('path');
const dreamConfig = require('./dreamConfig.js');
const webpack = require('webpack');

// Load WebPack plugins.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});

const plugins = [HtmlWebpackPluginConfig];

// Load dev mode plugins.
if (dreamConfig.Frontend.DevMode) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
    plugins.push(new webpack.NamedModulesPlugin());
}

module.exports = {
    node: {
        net: 'empty',
        tls: 'empty',
        fs: 'empty'
    },
    entry: [
        'babel-polyfill',
        './src/index.js'
    ],
    output: {
        path: path.resolve('docs'),
        filename: 'dreamCompiled.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve('./'),
            path.resolve('./node_modules'),
            path.resolve('./src'),
            path.resolve('./src/_dream')
        ]
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            // Load locally scoped css.
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[path][local]',
                        importLoaders: 1
                    }
                }]
            },
            // Load module css.
            { test: /\.css$/, include: /node_modules/, loader: 'style-loader!css-loader' },
            { test: /\.(png|woff|woff2|eot|ttf|svg|ico)$/, loader: 'url-loader?limit=30' }
        ]
    },
    plugins
};
