import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import IconArrow from '../../IconArrow'

const ButtonStyle = styled.button`
  align-items: center;
  background-color: transparent;
  color: #0a0a0a;
  cursor: pointer;
  display: flex;
  font-size: 24px;
  height: 50px;
  justify-content: space-between;
  outline: none;
  padding: 10px 14px;
  border-radius: 0;

  @media (max-width: 768px) {
    font-size: 12px;
    height: 25px;
    padding: 5px 10px;
    border-width: 1px !important;
  }

  @media (min-width: 768px) {
    &.middle {
      font-size: 18px;
      height: 38px;
      line-height: 38px;
      padding: 5px 10px;
      border-width: 1.5px !important;

      .iconArrow {
        width: 22px;
        height: 22px;
      }
    }
  }

  &.uppercase {
    text-transform: uppercase;
  }

  &.black {
    border: 2px solid #0a0a0a;

    &:active {
      border-color: #03ffff;
    }

    &:hover {
      background-color: #03ffff;
    }
  }

  &.gray {
    border: 2px solid #d9d9d9;
    color: #03ffff;
    background-color: #191919;

    .iconArrow {
      stroke: #d9d9d9;
    }

    &:active,
    &:hover {
      background-color: #d9d9d9;
      color: #0a0a0a;

      .iconArrow {
        stroke: #0a0a0a;
      }
    }
  }

  &.primary {
    background-color: #03ffff;
    border: 2px solid #03ffff;

    &:hover {
      border-color: #0a0a0a;
      background-color: #0a0a0a;
      color: #03ffff;
    }

    &:active {
      border-color: #03ffff;
      background-color: #03ffff;
      color: #0a0a0a;
    }
  }

  &.sp1 {
    background-color: #03ffff;
    border: 2px solid #0a0a0a;
    color: #0a0a0a;

    &:hover {
      border-color: #0a0a0a;
      background-color: #0a0a0a;
      color: #03ffff;
    }

    &:active {
      border-color: #03ffff;
      background-color: #03ffff;
      color: #0a0a0a;
    }
  }

  &:hover {
    .iconArrow {
      transform: translate3d(2px, 0, 0);
    }
  }

  .iconArrow {
    @media (max-width: 768px) {
      width: 15px;
      height: 15px;
    }

    margin-left: 14px;
    transition: transform 0.1s ease;
  }
`

type Props = {
  color?: 'white' | 'black' | 'gray' | 'primary' | 'sp1'
  hasArrowIcon?: boolean
  style?: React.CSSProperties
  onClick?: MouseEventHandler<HTMLButtonElement>
  uppercase?: boolean
  className?: string
  size?: 'default' | 'middle'
  disabled?: boolean
}

const index: React.FC<Props> = (props) => {
  const {
    size,
    className,
    uppercase = false,
    hasArrowIcon = false,
    color = 'black',
    children,
    style,
    onClick,
    disabled,
    ...others
  } = props

  return (
    <ButtonStyle
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={classnames([className, 'button', color, size, { uppercase }])}
      {...others}
    >
      <div>{children}</div>
      {hasArrowIcon && <IconArrow className={'iconArrow'} />}
    </ButtonStyle>
  )
}

export default index
