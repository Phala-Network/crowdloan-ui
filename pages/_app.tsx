import React, { useMemo } from 'react'
import { WithTheme } from '@/utils/theme'
import 'inter-ui/inter.css'
import GlobalStyle from '@/utils/GlobalStyle'
import { I18nProvider } from 'next-rosetta'

import { RequestProvider } from '@/utils/request'
import PolkadotApiProvider from '@/utils/polkadot'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { loadGetInitialProps } from 'next/dist/next-server/lib/utils'
import dynamic from 'next/dynamic'

type _App = React.FC<AppProps> & {
  getInitialProps
}

const MyApp: _App = ({ isError, Component, pageProps }) => {
  const Web3Provider = useMemo(() => {
    if (!isError) {
      return dynamic(() => import('@/utils/web3'))
    }
  }, [isError])

  if (isError) {
    return (
      <WithTheme>
        <I18nProvider table={pageProps.table}>
          <GlobalStyle />
          <Component {...pageProps} />
        </I18nProvider>
      </WithTheme>
    )
  }

  return (
    <WithTheme>
      <I18nProvider table={pageProps.table}>
        <RequestProvider>
          <PolkadotApiProvider>
            <Web3Provider>
              <GlobalStyle />
              <Component {...pageProps} />
            </Web3Provider>
          </PolkadotApiProvider>
        </RequestProvider>
      </I18nProvider>
    </WithTheme>
  )
}

export default MyApp
