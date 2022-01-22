const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const deps = require("./package.json").dependencies;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { SourceMapDevToolPlugin } = require("webpack");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");

const devConfig = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    publicPath: "/",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new MFLiveReloadPlugin({
      port: 3000, // the port your app runs on
      container: "root-app", // the name of your app, must be unique
      standalone: false, // false uses chrome extention
    }),
    new ModuleFederationPlugin({
      name: "root-app",
      remotes: {
        kanban: "kanban@http://localhost:3001/remoteEntry.js",
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
    // new ReactRefreshWebpackPlugin({
    //   exclude: [/node_modules/, /bootstrap\.tsx$/],
    // }),
  ],
};

module.exports = merge(commonConfig, devConfig);
