
import React from 'react'
import { AppProps /*, AppContext */ } from 'next/app'
import { WithTheme } from '@/utils/theme'
import 'inter-ui/inter.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element|null => {
  return <>
    <WithTheme>
      <Component {...pageProps} />
    </WithTheme>
  </>
}

export default MyApp
