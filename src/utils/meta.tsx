import React, { createContext, useContext, useMemo, useRef } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { GetCampaignResponse, GetPriceResponse } from './request'

export type AppMeta = {
  price: {
    ksmQuery: UseQueryResult<GetPriceResponse>
    phaQuery: UseQueryResult<GetPriceResponse>
  }
  campaign: UseQueryResult<GetCampaignResponse>
}

export const MetaContext = createContext<AppMeta>(null)
export const useMeta = (): AppMeta => useContext(MetaContext)

const _MetaProvider: React.FC = ({ children }) => {
  const { current: campaignId } = React.useRef(1)

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
  const campaign = useQuery<GetCampaignResponse>(
    ['getCampaign', { campaign: campaignId }],
    {
      refetchInterval: 60 * 1000,
    }
  )

  const contextValue = useMemo<AppMeta>(
    (): AppMeta => ({
      price: {
        ksmQuery,
        phaQuery,
      },
      campaign,
    }),
    [ksmQuery, phaQuery, campaign]
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
