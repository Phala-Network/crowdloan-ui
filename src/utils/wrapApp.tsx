import React from 'react'
import { WithTheme } from '@/utils/theme'
import 'inter-ui/inter.css'
import GlobalStyle from '@/utils/GlobalStyle'
import { RequestProvider } from '@/utils/request'
import PolkadotApiProvider from '@/utils/polkadot'
import Web3Provider from '@/utils/web3'
// import MetaProvider from '@/utils/meta'

const MyApp: React.FC = ({ children }) => {
  return (
    <WithTheme>
      <RequestProvider>
        <PolkadotApiProvider>
          <Web3Provider>
            <GlobalStyle />
            {children}
          </Web3Provider>
        </PolkadotApiProvider>
      </RequestProvider>
    </WithTheme>
  )
}

export default MyApp
