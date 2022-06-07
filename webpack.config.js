const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
    mode = "production"
}

console.log(mode + " mode");

module.exports = {
    mode: mode,
    output: {
        filename: "scripts/[name].js",
        clean : true,
    },
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    plugins: [
        new miniCssExtractPlugin(
            {
                filename: "style.[contenthash].css"
            },
        ),
        new htmlWebpackPlugin(
            {
                template: "./src/index.html",
            },
        ),
    ],
    module: {
        rules: [
            {
                test: /\.(s)css$/,
                use: [
                    (mode === "development") ? "style-loader" : miniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions :{
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.jpg$/,
                type: "asset/resource",
                generator: {
                    filename: "img/[name][ext]",
                },
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.ttf$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env"
                        ],
                    },
                },
            },
        ],
    },
}