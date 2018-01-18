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
// Load prod mode plugins.
} else {
    plugins.push(new webpack.optimize.AggressiveMergingPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            properties: true,
            sequences: true,
            dead_code: true,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            unused: true,
            loops: true,
            hoist_funs: true,
            cascade: true,
            if_return: true,
            join_vars: true,
            drop_debugger: true,
            unsafe: true,
            hoist_vars: true,
            negate_iife: true
        },
        mangle: {
            toplevel: true,
            sort: true,
            eval: true,
            properties: true
        },
        output: {
            space_colon: false,
            comments: function(node, comment) {
                return null;
            }
        }
    }));
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
            path.resolve('./src')
        ],
        alias: {
            'split-listUsers': require.resolve('../src/_impl/pages/UserList/index.jsx'),
            'split-createUser': require.resolve('../src/_impl/pages/CreateUser/index.jsx'),
            'LazyLoaderComponent': require.resolve('../src/_impl/components/LazyLoaderComponent.jsx'),
            'split-standard-demo': require.resolve('../src/_impl/pages/StandardDemo/index.jsx')
        }
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
