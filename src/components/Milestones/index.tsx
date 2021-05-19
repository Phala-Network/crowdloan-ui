import React from 'react'
import styled from 'styled-components'
import MilestonesItem from './MilestonesItem'
import PositionIcon from './PositionIcon'
import { useMediaQuery } from 'react-responsive'

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
  const data = ['3.8', '3.10', '3.20']
  const top = 80

  const isSM = useMediaQuery({ maxWidth: 960 })
  const isMD = useMediaQuery({ minWidth: 960, maxWidth: 1280 })
  const isLG = useMediaQuery({ minWidth: 1280 })

  if (isSM) return null

  return (
    <MilestonesWrap width={isMD ? 70 : 100} left={isMD ? -20 : 20}>
      {data.map((item, index) => {
        return (
          <MilestonesItem
            active={index < 1}
            noTail={index === data.length - 1}
            isLast={index === data.length - 1}
            label={!isMD && item}
            content={!isLG && item}
            key={item}
          />
        )
      })}

      <PositionIcon top={top} />
    </MilestonesWrap>
  )
}

export default Milestones
