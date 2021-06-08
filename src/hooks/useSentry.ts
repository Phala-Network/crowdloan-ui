import { useMount } from 'react-use'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

export default function useSentry(): void {
  useMount(() => {
    Sentry.init({
      dsn: 'https://b32f244e1b1849728fc0d19954a209cb@o812739.ingest.sentry.io/5805680',
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    })
  })
}
