const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './index.js',
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '../../public/UI'),
        publicPath: '/UI/'
    },
    watch: true,
    mode: 'development',

    module: {
        rules: [
            {
                test: /\.js|\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg|gif|swf)$/,
                loader: 'file-loader?limit=100000',
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin({ verbose: true }),
        new HtmlWebpackPlugin({
            title: 'Problem 2',
            template: './index.html',
        })
    ]
}