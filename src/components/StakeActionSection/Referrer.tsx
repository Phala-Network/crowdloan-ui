import React from 'react'
import styled from 'styled-components'

const ReferrerText = styled.div`
  flex: 1;
  text-align: right;
`

const Referrer: React.FC<{ value: string }> = ({ value }) => {
  if (!value) return null

  return <ReferrerText>{value}</ReferrerText>
}

export default Referrer
