import React from 'react'
import { WithTheme } from '@/utils/theme'
import 'inter-ui/inter.css'
import GlobalStyle from '@/utils/GlobalStyle'
import { I18nProvider } from 'next-rosetta'

import { RequestProvider } from '@/utils/request'
import PolkadotApiProvider from '@/utils/polkadot'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import Web3Provider from '@/utils/web3'
type _App = React.FC<AppProps>

const MyApp: _App = ({ Component, pageProps }) => {
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
