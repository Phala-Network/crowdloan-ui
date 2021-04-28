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
    <RequestProvider>
      <Web3Provider>
        <I18nProvider table={pageProps.table}>
          <GlobalStyle />
          <WithTheme>
            <Component {...pageProps} />
          </WithTheme>
        </I18nProvider>
      </Web3Provider>
    </RequestProvider>
  )
}

export default MyApp
