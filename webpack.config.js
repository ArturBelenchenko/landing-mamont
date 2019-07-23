const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CleanWebpackPlugin = require('clean-webpack-plugin');


var isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    performance: {
        hints: false
    },
    context: path.resolve(__dirname, 'src'),

    entry: {
        app: [
            './js/app.js',
            './scss/style.scss',
        ],
    },

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/'
    },

    devServer: {
        overlay: true,
        contentBase: './app',
    },

    devtool: (isProduction) ? '' : 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'postcss-loader',
                            options: { sourceMap: true }
                        },
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        },
                    ],
                    fallback: 'style-loader',
                })
            },

            {
                test: /\.(png|gif|jpe?g)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    },
                    'img-loader',
                ]
            },


            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: '[path][name].[ext]',
                }
            },

            {
                test: /\.svg$/,
                loader: 'svg-url-loader'
            },

            {
                test: /\.(mov|mp4)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            },

        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery'

        }),
        new ExtractTextPlugin(
            './css/[name].css',
        ),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin(
            [
                { from: './img', to: 'img' },
                { from: './fonts', to: 'fonts' }
            ],
            {
                ignore: [
                    { glob: 'svg/*' },
                ]
            }
        ),
    ]
}

if (isProduction) {
    module.exports.plugins.push(
        new UglifyJSPlugin({
            sourceMap: true
        }),
    );
    module.exports.plugins.push(
        new ImageminPlugin({
            test: /\.(png|jpe?g|gif|svg)$/i
        })
    );
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    );
}