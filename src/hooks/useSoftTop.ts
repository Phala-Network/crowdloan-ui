import { useMemo } from 'react'
import { useMeta } from '../utils/meta'

export default function useSoftTop(): boolean {
  const { campaignQuery } = useMeta()
  const contributionChart = campaignQuery?.data?.meta?.contributionChart

  const auctionAmount = useMemo(() => {
    return contributionChart
      ? contributionChart?.[contributionChart.length - 1]?.[1]
      : 0
  }, [contributionChart])

  const isSoftTop = useMemo(() => {
    return campaignQuery.data?.campaign?.cap > auctionAmount
  }, [campaignQuery.data?.campaign?.cap, auctionAmount])

  return isSoftTop
}
