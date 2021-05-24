import React from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 60px;
  max-width: 530px;

  @media (max-width: 768px) {
    margin-top: 30px;
    width: 320px;
  }

  & > * {
    margin-right: 20px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
`

const PageHeaderButtons: React.FC = (props) => {
  const { children, ...others } = props

  return <Wrap {...others}>{children}</Wrap>
}

export default PageHeaderButtons
