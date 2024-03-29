const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require('copy-webpack-plugin');
var config = {
    mode: "development",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyPlugin([
            {from:'src/assets', to:'assets'} 
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {},
                  },
                ],
              },
              {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: ["src", "node_modules"]
    }
};

var client = Object.assign({}, config, {
    name: "client",
    target: "web",
    entry: path.resolve(__dirname, "src/client/index.tsx"),
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    }
});

var server = Object.assign({}, config, {
    name: "server",
    
    target: "node",
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, "src/server/index.tsx"),
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "build")
    }
});

module.exports = [client, server];
