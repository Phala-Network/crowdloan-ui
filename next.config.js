const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const envConfig = require('./env.config')
const devEnvConfig = require('./env.development.config')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        ...envConfig,
        ...devEnvConfig,
      },
    }
  }

  return {
    env: envConfig,
  }
}
