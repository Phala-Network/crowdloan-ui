import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`

const ModalActions: React.FC<React.ComponentProps<typeof Wrap>> = (props) => {
  const { children, ...others } = props
  return <Wrap {...others}>{children}</Wrap>
}

export default ModalActions
