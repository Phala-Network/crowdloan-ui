import React from 'react'
import styled from 'styled-components'

const InvitedNumberRoot = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  height: 25px;
  color: #d9d9d9;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const InvitedNumber: React.FC = () => {
  return <InvitedNumberRoot>1000 invited</InvitedNumberRoot>
}

export default InvitedNumber
