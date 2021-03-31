import React from 'react'
import { AppProps } from 'next/app'
import { WithTheme } from '@/utils/theme'
import 'inter-ui/inter.css'
import GlobalStyle from '@/utils/GlobalStyle'
import { I18nProvider } from 'next-rosetta'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element | null => {
  return (
    <I18nProvider table={pageProps.table}>
      <GlobalStyle />
      <WithTheme>
        <Component {...pageProps} />
      </WithTheme>
    </I18nProvider>
  )
}

export default MyApp
