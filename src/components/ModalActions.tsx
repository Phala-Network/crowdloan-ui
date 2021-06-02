import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  margin-top: 20px;
  text-align: right;
`

const ModalActions: React.FC = (props) => {
  const { children, ...others } = props
  return <Wrap {...others}>{children}</Wrap>
}

export default ModalActions
