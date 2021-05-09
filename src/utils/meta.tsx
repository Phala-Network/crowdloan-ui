import React, { createContext, useContext, useMemo, useRef } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import {
  GetCampaignResponse,
  GetContributorResponse,
  GetPriceResponse,
} from './request'
import { useWeb3 } from './web3'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/en'
import 'dayjs/locale/zh'

dayjs.extend(localizedFormat)

export type AppMeta = {
  dayjs: typeof dayjs
  campaignId: number
  price: {
    ksmQuery: UseQueryResult<GetPriceResponse>
    phaQuery: UseQueryResult<GetPriceResponse>
  }
  campaignQuery: UseQueryResult<GetCampaignResponse>
  currentContributorQuery: UseQueryResult<GetContributorResponse>
}

export const MetaContext = createContext<AppMeta>(null)
export const useMeta = (): AppMeta => useContext(MetaContext)

const _MetaProvider: React.FC = ({ children }) => {
  const { current: campaignId } = React.useRef(1)
  const { currentAccount } = useWeb3()

  const ksmQuery = useQuery<GetPriceResponse>(
    ['getPrice', { currency: 'KSM' }],
    {
      refetchInterval: 60 * 1000,
    }
  )
  const phaQuery = useQuery<GetPriceResponse>(
    ['getPrice', { currency: 'PHA' }],
    {
      refetchInterval: 60 * 1000,
    }
  )
  const campaignQuery = useQuery<GetCampaignResponse>(
    ['getCampaign', { campaignId }],
    {
      refetchInterval: 60 * 1000,
    }
  )
  const currentContributorQuery = useQuery<GetContributorResponse>([
    'getContributor',
    { campaignId, contributorId: currentAccount?.address },
  ])

  const contextValue = useMemo<AppMeta>(
    (): AppMeta => ({
      dayjs,
      campaignId,
      price: {
        ksmQuery,
        phaQuery,
      },
      campaignQuery,
      currentContributorQuery,
    }),
    [campaignId, ksmQuery, phaQuery, campaignQuery]
  )
  return (
    <MetaContext.Provider value={contextValue}>{children}</MetaContext.Provider>
  )
}

const MetaProvider: React.FC = ({ children }) => {
  const { current: hasWindow } = useRef(typeof window !== 'undefined')
  return hasWindow ? <_MetaProvider>{children}</_MetaProvider> : <>{children}</>
}

export default MetaProvider
