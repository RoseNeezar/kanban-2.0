const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const deps = require("./package.json").dependencies;
const { SourceMapDevToolPlugin } = require("webpack");

const LiveReloadPlugin = require("webpack-livereload-plugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

const devConfig = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    publicPath: "/",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new LiveReloadPlugin(),
    new ModuleFederationPlugin({
      name: "root-app",
      remotes: {
        kanban: "kanban@[kanbanUrl]/remoteEntry.js",
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
    new ExternalTemplateRemotesPlugin(),
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
