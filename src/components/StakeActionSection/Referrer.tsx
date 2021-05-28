import React from 'react'
import styled from 'styled-components'

const ReferrerText = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 6px;
`

const Referrer: React.FC<{ value: string }> = ({ value }) => {
  return <ReferrerText>{value}</ReferrerText>
}

export default Referrer
