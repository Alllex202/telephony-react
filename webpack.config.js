const dotenv = require('dotenv')
const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

if (isDev) {
    dotenv.config()
}

module.exports = {
    mode: isProd ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        filename: isDev ? '[name].[fullhash].js' : '[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js',
            '.css',
            '.scss'
        ],
        modules: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
        ],
        preferRelative: true
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        hot: true,
        historyApiFallback: true
    },
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ],
        minimize: isProd,
        splitChunks: {
            chunks: 'all'
        }
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: 'ts-loader'
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]'
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.s?css$/,
                include: /\.module\.s?css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: isDev ? '[local]__[hash:base64:5]' : '[hash:base64:5]'
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                exclude: /node_modules/,
                test: /\.svg$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './public/index.html',
            minify: isProd
        }),
        new MiniCSSExtractPlugin({
            filename: isDev ? '[name].[fullhash].css' : '[fullhash].css'
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    ]
}
