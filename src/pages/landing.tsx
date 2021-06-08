import _LandingPage from '@/components/LandingPage'
import React from 'react'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  dsn: 'https://b32f244e1b1849728fc0d19954a209cb@o812739.ingest.sentry.io/5805680',
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
})

const LandingPage: React.FC = () => {
  const hasWindow = typeof window !== 'undefined'

  return hasWindow ? <_LandingPage /> : null
}

export default LandingPage
