const React = require('react')
const App = require('./src/utils/wrapApp').default

exports.wrapRootElement = ({ element }) => {
  if (typeof window !== 'undefined') {
    location.replace('https://app.phala.network/')
    return null
  }

  return <App>{element}</App>
}
