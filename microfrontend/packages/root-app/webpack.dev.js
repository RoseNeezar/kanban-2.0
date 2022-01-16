const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const deps = require("./package.json").dependencies;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const devConfig = {
  entry: "./src/index.ts",
  mode: "development",
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    // new ModuleFederationPlugin({
    //   name: 'root-app',
    //   remotes: {
    //     todo: 'todo@http://localhost:3001/remoteEntry.js'
    //   },
    //   shared: {
    //     ...deps,
    //     react: { singleton: true, eager: true, requiredVersion: deps.react },
    //     'react-dom': {
    //       singleton: true,
    //       eager: true,
    //       requiredVersion: deps['react-dom']
    //     }
    //   }
    // }),

    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/, /bootstrap\.tsx$/],
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
