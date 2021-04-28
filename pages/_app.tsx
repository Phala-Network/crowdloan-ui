import React from 'react'
import { AppProps } from 'next/app'
import { WithTheme } from '@/utils/theme'
import 'inter-ui/inter.css'
import GlobalStyle from '@/utils/GlobalStyle'
import { I18nProvider } from 'next-rosetta'
import Web3Provider from '@/utils/web3'
import { RequestProvider } from '@/utils/request'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element | null => {
  return (
    <WithTheme>
      <I18nProvider table={pageProps.table}>
        <RequestProvider>
          <Web3Provider>
            <GlobalStyle />
            <Component {...pageProps} />
          </Web3Provider>
        </RequestProvider>
      </I18nProvider>
    </WithTheme>
  )
}

export default MyApp
