import React from 'react'
import { useMeta } from '../utils/meta'

export default function useReachingActivityGoal(): boolean {
  const { campaignQuery } = useMeta()

  return React.useMemo<boolean>(
    () => campaignQuery?.data?.campaign?.raisedAmount > 30000,
    [campaignQuery]
  )
}
