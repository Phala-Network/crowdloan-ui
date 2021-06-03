import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react'
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
  refetch: () => void
  refetchCount: number
}

export const MetaContext = createContext<AppMeta>(null)
export const useMeta = (): AppMeta => useContext(MetaContext)

const _MetaProvider: React.FC = ({ children }) => {
  const { current: campaignId } = React.useRef(
    parseFloat(process.env.REACT_APP_CAMPAIGN_ID)
  )
  const { currentAccount } = useWeb3()

  const [refetchCount, setRefetchCount] = useState(0)
  const refetch = useCallback(() => {
    setRefetchCount(refetchCount + 1)
  }, [refetchCount])

  const ksmQuery = useQuery<GetPriceResponse>(
    ['getPrice', { currency: 'KSM', refetchCount }],
    {
      refetchInterval: 60 * 1000,
    }
  )
  const phaQuery = useQuery<GetPriceResponse>(
    ['getPrice', { currency: 'PHA', refetchCount }],
    {
      refetchInterval: 60 * 1000,
    }
  )
  const campaignQuery = useQuery<GetCampaignResponse>(
    ['getCampaign', { campaignId, refetchCount }],
    {
      refetchInterval: 60 * 1000,
    }
  )
  const currentContributorQuery = useQuery<GetContributorResponse>(
    [
      'getContributor',
      { campaignId, contributorId: currentAccount?.address, refetchCount },
    ],
    {
      refetchInterval: 60 * 1000,
    }
  )

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
      refetch,
      refetchCount,
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
