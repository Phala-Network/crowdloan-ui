const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    // resolve: {
    //   fallback: {
    //     // crypto: false,
    //   },
    // },
    plugins: [new NodePolyfillPlugin()],
  })
}
