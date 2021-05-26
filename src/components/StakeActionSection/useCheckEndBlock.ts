import { useQuery } from 'react-query'
import { GetCampaignResponse } from '@/utils/request/types'
import { VoidFn } from '@polkadot/api/types'
import { useMeta } from '@/utils/meta'
import { useEffect, useState } from 'react'
import { usePolkadotApi } from '@/utils/polkadot'

export default function useCheckEndBlock(): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] {
  const [disabled, setDisabled] = useState(false)
  const { api, initialized } = usePolkadotApi()
  const { campaignId } = useMeta()
  const { data: campaignData, isLoading: getCampaignIsLoading } =
    useQuery<GetCampaignResponse>(['getCampaign', { campaignId }])

  useEffect(() => {
    if (!initialized || getCampaignIsLoading) return
    if (!campaignData?.campaign?.endBlock) return

    let unsubscribe: VoidFn

    api.rpc.chain
      .subscribeNewHeads((header) => {
        if (header.number.toNumber() > campaignData.campaign.endBlock) {
          // disable stake button
          setDisabled(true)
        }
      })
      .then((_unsubscribe) => (unsubscribe = _unsubscribe))

    return () => {
      unsubscribe?.()
    }
  }, [initialized, api, campaignData, getCampaignIsLoading])

  return [disabled, setDisabled]
}
