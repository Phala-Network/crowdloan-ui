const React = require('react')
const App = require('./src/utils/wrapApp').default

exports.wrapRootElement = ({ element }) => {
  return <App>{element}</App>
}
