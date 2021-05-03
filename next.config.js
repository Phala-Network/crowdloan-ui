const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const envConfig = require('./env.config')
const devEnvConfig = require('./env.development.config')

const baseConfig = {
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  },
  devIndicators: {
    autoPrerender: false,
  },
  target: 'serverless',
}

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...baseConfig,
      env: {
        ...envConfig,
        ...devEnvConfig,
      },
    }
  }

  return {
    ...baseConfig,
    env: envConfig,
  }
}
