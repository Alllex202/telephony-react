import dotenv from 'dotenv'
import path from 'path'
import webpack from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin'
import TerserWebpackPlugin from 'terser-webpack-plugin'
import 'webpack-dev-server'

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

if (isDev) {
    dotenv.config()
}

const config: webpack.Configuration = {
    mode: isProd ? 'production' : 'development',
    entry: './src/index.tsx',
    output: {
        filename: '[name].[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true
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
                include: path.resolve(__dirname, 'src'),
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
                include: path.resolve(__dirname, 'src'),
                test: /\.svg$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
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

export default config
