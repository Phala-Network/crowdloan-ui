import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'

const CardContentStyle = styled.div`
  background-color: #f0efee;
  background-repeat: no-repeat;
  padding: 60px 30px;
  font-family: Lato;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #070707;
  flex: 1;
  z-index: 1000;
  position: relative;

  @media (max-width: 768px) {
    line-height: 1.5;
    font-size: 12px;
    padding: 30px 15px;
    background-image: none !important;
  }

  &.firstLetter {
    &::first-letter {
      font-family: Minecraft, mplus_hzk_12;
      font-size: 60px;
      line-height: 0.6;

      @media (max-width: 768px) {
        font-size: 30px;
      }
    }
  }
`

export type CardContentProps = {
  bgIndex?: number
  className?: string
  firstLetter?: boolean
}

const CardContent: React.FC<CardContentProps> = (props) => {
  const { className, firstLetter = false } = props

  return (
    <CardContentStyle
      className={classnames([
        {
          firstLetter,
        },
        className,
      ])}
    >
      {props.children}
    </CardContentStyle>
  )
}

export default CardContent
