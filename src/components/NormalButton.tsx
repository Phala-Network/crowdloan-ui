import { Button } from '@geist-ui/react'
import React from 'react'
import styled from 'styled-components'

const ButtonWrap = styled(Button)`
  &.btn[type='button'] {
    font-size: 14px;
    height: 36px;
    line-height: 32px;
    background: ${(props) => props.color};
    border-radius: 4px;
    padding: 0 26px;
    border: none;
    color: rgba(0, 0, 0, 0.9);

    &:hover,
    &:focus,
    &:active {
      color: rgba(0, 0, 0, 0.7);
      opacity: 0.8;
      background: ${(props) => props.color};
    }
  }
`

type Props = React.ComponentProps<typeof Button> & {
  primary?: boolean
}

const NormalButton: React.FC<Props> = (props) => {
  const { children, primary, ...others } = props

  return (
    <ButtonWrap
      color={primary ? 'rgb(209, 255, 82)' : '#222222'}
      effect={false}
      {...others}
    >
      {children}
    </ButtonWrap>
  )
}

export default NormalButton
