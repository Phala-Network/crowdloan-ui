import React, { useRef } from 'react'
import { AppProps } from 'next/app'
import { WithTheme } from '@/utils/theme'
import 'inter-ui/inter.css'
import GlobalStyle from '@/utils/GlobalStyle'
import { I18nProvider } from 'next-rosetta'
import Web3Provider from '@/utils/Web3Provider'
import { QueryClient, QueryClientProvider } from 'react-query'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element | null => {
  const queryClient = useRef<QueryClient>()

  if (queryClient.current === undefined) {
    queryClient.current = new QueryClient()
  }

  return (
    <QueryClientProvider client={queryClient.current}>
      <Web3Provider>
        <I18nProvider table={pageProps.table}>
          <GlobalStyle />
          <WithTheme>
            <Component {...pageProps} />
          </WithTheme>
        </I18nProvider>
      </Web3Provider>
    </QueryClientProvider>
  )
}

export default MyApp
