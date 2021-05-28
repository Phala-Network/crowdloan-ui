import { useMeta } from '@/utils/meta'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export default function useReleasingData(totalAmount = 0): [string, number][] {
  const {
    campaignQuery: { data: campaign, isLoading },
  } = useMeta()
  const [data, setData] = useState([])

  useEffect(() => {
    if (totalAmount === 0 || isLoading) return
    if (!campaign?.meta?.estimateFirstReleasingIn) return

    const _data = []
    const {
      firstReleasingPercentage,
      estimateEndReleasingIn,
      estimateFirstReleasingIn,
      estimateReleasingPercentagePerInterval,
      estimateReleasingDaysInterval,
    } = campaign.meta

    let releasingAmount = (firstReleasingPercentage / 100) * totalAmount
    let releasingDate = dayjs(estimateFirstReleasingIn)

    // first day
    _data.push([releasingDate.format('YYYY-MM-DD'), releasingAmount])

    let times =
      dayjs(estimateEndReleasingIn).diff(estimateFirstReleasingIn, 'day') /
      estimateReleasingDaysInterval

    do {
      // add releasing amount
      releasingAmount +=
        (estimateReleasingPercentagePerInterval / 100) * totalAmount

      // add date
      releasingDate = releasingDate.add(estimateReleasingDaysInterval, 'day')

      // push push push
      _data.push([
        releasingDate.format('YYYY-MM-DD'),
        parseFloat(releasingAmount.toFixed(4)),
      ])
    } while (times-- > 2)

    // last day
    _data.push([
      dayjs(estimateEndReleasingIn).format('YYYY-MM-DD'),
      totalAmount,
    ])

    setData(_data)
  }, [totalAmount, isLoading, campaign])

  return data
}
