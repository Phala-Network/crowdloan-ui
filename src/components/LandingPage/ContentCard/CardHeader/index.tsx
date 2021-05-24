import RandomBlock from '../../RandomBlock'
import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'

const CardHeaderWithStyle = styled.div`
  width: 400px;
  background-color: #000000;
  color: #03ffff;
  font-style: normal;
  font-weight: normal;
  text-transform: uppercase;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 800;

  &:lang(zh) {
    padding: 20px 18px 20px 30px;
    font-family: mplus_hzk_12;
    font-size: 44px;

    @media (max-width: 768px) {
      font-size: 22px;
      padding: 15px;
    }
  }

  /* &:lang(en) { */
  padding: 30px 18px 20px 30px;
  font-family: Minecraft;
  font-size: 36px;

  @media (max-width: 768px) {
    font-size: 18px;
    padding: 15px;
  }
  /* } */

  &.small {
    display: inline-block;
    flex-direction: row;
    height: 80px;
    width: auto;
    white-space: nowrap;

    .randomBlock {
      display: none;
    }

    .name {
      display: inline-block;
      margin-left: 30px;
    }

    .top {
      margin-bottom: 0;
      display: inline-block;
    }

    @media (max-width: 992px) {
      display: flex;
      flex-direction: column;
      height: 120px;
      width: 100%;

      .name {
        margin-left: 0;
      }

      .randomBlock {
        display: block;
      }
    }
  }

  .randomBlock {
    position: absolute;
    top: 0;
    right: 0;
  }

  .top {
    position: relative;
    margin-bottom: 30px;

    @media (max-width: 768px) {
      margin-bottom: 15px;
    }
  }

  .target {
    position: absolute;
    top: -110px;
    left: 0;
  }
`

export type CardHeaderProps = {
  index?: number
  name?: string[]
  className?: string
  type?: 'normal' | 'small' | 'vertical' | 'wideNormal'
}

const CardHeader: React.FC<CardHeaderProps> = (props) => {
  const { index, name, className, type = 'normal' } = props

  return (
    <CardHeaderWithStyle className={classnames([type, className])}>
      <div
        className={'target'}
        // id for link jump
        id={'title_' + name.join('_')}
      ></div>
      <div className={'top'}>
        {/* 01_ */}
        <div>0{index}_</div>
        <div className={'randomBlock'}>
          <RandomBlock></RandomBlock>
        </div>
      </div>
      <div className={'name'}>
        {name.map((str) => {
          return <div key={str}>{str}</div>
        })}
      </div>
    </CardHeaderWithStyle>
  )
}

export default CardHeader
