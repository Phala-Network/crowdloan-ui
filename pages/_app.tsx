import React from 'react'
import { AppProps } from 'next/app'
import { WithTheme } from '@/utils/theme'
import 'inter-ui/inter.css'
import GlobalStyle from '@/utils/GlobalStyle'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element | null => {
  return (
    <>
      <GlobalStyle />
      <WithTheme>
        <Component {...pageProps} />
      </WithTheme>
    </>
  )
}

export default MyApp
