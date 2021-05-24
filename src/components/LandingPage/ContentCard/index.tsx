import CardContent, { CardContentProps } from './CardContent'
import CardHeader, { CardHeaderProps } from './CardHeader'
import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'

const ContentCardStyle = styled.div`
  margin-top: 60px;
  z-index: 2000;
  position: relative;

  &.small {
    margin-left: 220px;
    font-size: 36px;

    @media (max-width: 992px) {
      margin-top: 30px;
      display: block;
      margin-left: 0;
    }
  }

  &.wideNormal {
    display: flex;
    margin-left: 114px;

    @media (max-width: 992px) {
      margin-top: 30px;
      display: block;
      margin-left: 0;
    }

    .cardHeader {
      @media (max-width: 992px) {
        width: 100%;
        min-height: 120px;
      }
    }
  }

  &.normal {
    display: flex;
    margin-left: 220px;

    @media (max-width: 992px) {
      margin-top: 30px;
      display: block;
      margin-left: 0;
    }

    .cardHeader {
      @media (max-width: 992px) {
        width: 100%;
        min-height: 120px;
      }
    }
  }

  &.vertical {
    @media (max-width: 992px) {
      margin-left: 0;
      margin-top: 30px;
    }

    .cardHeader {
      width: 560px;
      min-height: 240px;

      @media (max-width: 992px) {
        width: 100%;
        min-height: 120px;
      }
    }

    .cardContent {
      margin-left: 330px;
      margin-top: -70px;

      @media (max-width: 992px) {
        width: 100%;
        margin-top: 0;
        margin-left: 0;
      }
    }
  }
`

export type CardProps = CardHeaderProps &
  CardContentProps & {
    cardContentClassName?: string
    cardHeaderClassName?: string
    type?: 'normal' | 'small' | 'vertical' | 'wideNormal'
  }

const Card: React.FC<CardProps> = (props) => {
  const {
    name,
    index,
    children,
    cardContentClassName,
    cardHeaderClassName,
    type,
    firstLetter,
  } = props

  return (
    <ContentCardStyle className={classnames([type])} id={name.join('_')}>
      <CardHeader
        type={type}
        className={classnames(['cardHeader', cardHeaderClassName])}
        name={name}
        index={index}
      ></CardHeader>
      <CardContent
        firstLetter={firstLetter}
        className={classnames(['cardContent', cardContentClassName])}
      >
        {children}
      </CardContent>
    </ContentCardStyle>
  )
}

export default Card
