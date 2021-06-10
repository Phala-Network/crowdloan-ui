import React from 'react'
import styled from 'styled-components'
import MilestonesItem from './MilestonesItem'
import PositionIcon from './PositionIcon'
import { useMediaQuery } from 'react-responsive'
import { useMeta } from '@/utils/meta'
import { useQuery } from 'react-query'
import { GetCampaignResponse } from '@/utils/request/types'
import dayjs from 'dayjs'
import useCheckEndBlock from '@/hooks/useCheckEndBlock'

const MilestonesWrap = styled.ul<{ width: number; left: number }>`
  box-sizing: border-box;
  font-feature-settings: 'tnum';
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  margin: 0;
  padding: 0;
  width: ${(props) => props.width}px;
  position: absolute;
  left: ${(props) => props.left}px;
  top: 8px;
`

const Milestones: React.FC = () => {
  const { campaignId } = useMeta()
  const [disable] = useCheckEndBlock()
  const { data, isLoading, isError } = useQuery<GetCampaignResponse>([
    'getCampaign',
    { campaignId },
  ])

  const isSM = useMediaQuery({ maxWidth: 960 })
  const isMD = useMediaQuery({ minWidth: 960, maxWidth: 1280 })
  const isLG = useMediaQuery({ minWidth: 1280 })

  if (disable) return null

  const today = dayjs(new Date())

  if (isSM || isError || isLoading) {
    return null
  }

  const milestones = data?.meta?.milestones?.concat()?.reverse?.()

  if (!milestones) {
    return null
  }

  const firstDate = dayjs(milestones?.[0]?.estimatesAt)
  const middleDate = dayjs(milestones?.[1]?.estimatesAt)
  const lastDate = dayjs(milestones?.[2]?.estimatesAt)
  let iconTop = 0

  if (lastDate.isBefore(today)) {
    return null
  }

  if (today.isAfter(middleDate)) {
    iconTop += 200
    iconTop += (middleDate.diff(today) / middleDate.diff(lastDate)) * 100
  } else if (today.isAfter(firstDate)) {
    iconTop += (firstDate.diff(today) / firstDate.diff(middleDate)) * 200
  }

  return (
    <MilestonesWrap width={isMD ? 70 : 100} left={isMD ? -20 : 20}>
      {milestones?.map((item, index) => {
        const estimatesAt = item.estimatesAt
        const date = dayjs(estimatesAt)
        const content = date.format('M.D')

        return (
          <MilestonesItem
            height={index === 0 ? 200 : 100}
            active={index < 1}
            noTail={index === milestones.length - 1}
            isLast={index === milestones.length - 1}
            label={!isMD && content}
            content={!isLG && content}
            key={content}
          />
        )
      })}

      {today.isAfter(firstDate) && today.isBefore(lastDate) && (
        <PositionIcon top={iconTop} />
      )}
    </MilestonesWrap>
  )
}

export default Milestones
