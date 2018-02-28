const path = require('path');
const webpack =  require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const DEV_SERVER_HOST = 'localhost';
const DEV_SERVER_PORT = 8080;

const SRC_DIR = 'src';
const DIST_DIR = 'dist';
const DEV_DIR = 'debug';


const extractLess = new ExtractTextPlugin({
    filename: "[name].css"
});

// *****************************************************************************
// Base webpack config
// *****************************************************************************
let config = {
    context: path.join(__dirname, SRC_DIR),

    entry: {
        index: './index.js',
        vendor:[
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'redux-thunk'
        ]
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, DIST_DIR)
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['syntax-dynamic-import']
                }
            }]
        }, {
            test: /\.(less|css)$/,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'], // Specify the common bundle's name.
        }),
        extractLess
    ],

    resolve: {
        extensions: [".js", ".json", ".jsx"],
        modules: [
            path.resolve(__dirname, SRC_DIR),
            'node_modules'
        ]
    }

};

// *****************************************************************************
// Webpack config for development
// *****************************************************************************
const configDev = {
    devtool: 'cheap-module-eval-source-map',
    // devtool: 'sourcemap',

    output: {
        path: path.join(__dirname, DEV_DIR),
        publicPath: `//${DEV_SERVER_HOST}:${DEV_SERVER_PORT}/`
    },

    devServer: {
        port: DEV_SERVER_PORT,
        host: DEV_SERVER_HOST,
        contentBase: path.join(__dirname, DEV_DIR)
    }
};

// *****************************************************************************
// Webpack config for production
// *****************************************************************************
const configProd = {
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]
};

// *****************************************************************************
// Merging configs
// *****************************************************************************
if (process.env.NODE_ENV === 'development') {
    config = merge(config, configDev);
} else if (process.env.NODE_ENV === 'production') {
    config = merge(config, configProd);
}

module.exports = config;
