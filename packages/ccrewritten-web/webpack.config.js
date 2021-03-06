const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
//const ArchivePlugin = require("webpack-archive-plugin")
//const { name } = require("./package.json")
let plugins = [
	new HTMLPlugin({
		template: "./src/index.html",
		filename: "index.html",
	}),
]
/*if (process.env.NODE_ENV === "production")
	plugins.push(new ArchivePlugin({ format: "tar", output: `./dist/${name}` }))*/
module.exports = {
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ["ts-loader"],
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|mp3)$/,
				loader: "file-loader",
			},
			{
				test: /\.(j|t)sx?$/,
				enforce: "pre",
				use: ["source-map-loader"],
			},
		],
	},
	mode: process.env.NODE_ENV,
	resolve: { extensions: [".tsx", ".ts", ".jsx", ".js", ".json"] },
	plugins,
	watchOptions: {
		ignored: ["node_modules"],
		aggregateTimeout: 200,
		poll: 500,
	},
}
