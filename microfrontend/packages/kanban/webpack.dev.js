const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const deps = require("./package.json").dependencies;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { MFLiveReloadPlugin } = require("@module-federation/fmr");

const devConfig = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new MFLiveReloadPlugin({
      port: 3001, // the port your app runs on
      container: "kanban", // the name of your app, must be unique
      standalone: false, // false uses chrome extention
    }),
    new ModuleFederationPlugin({
      name: "kanban",
      filename: "remoteEntry.js",
      exposes: {
        "./Kanban": "./src/bootstrap",
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
    // new ReactRefreshWebpackPlugin({
    //   exclude: [/node_modules/, /bootstrap\.tsx$/],
    // }),
  ],
};

module.exports = merge(commonConfig, devConfig);
