import React from 'react'
import styled from 'styled-components'
import SectionHeader, { SectionHeaderProps } from '../SectionHeader'

const Header = styled.div`
  max-width: 900px;

  .title {
    line-height: 1;
    max-width: 680px;

    @media (max-width: 768px) {
      font-size: 30px;
      font-weight: 900;
      line-height: 1;
    }
  }

  .description {
    font-size: 20px;
    line-height: 1;
    max-width: 502px;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 14px;
      line-height: 1.29;
      max-width: 80%;
    }
  }
`

type Props = SectionHeaderProps

const PageHeader: React.FC<Props> = (props) => {
  return (
    <Header className={'header'}>
      <SectionHeader
        {...props}
        color="gray"
        titleClassName={'title'}
        descriptionClassName={'description'}
      ></SectionHeader>
    </Header>
  )
}

export default PageHeader
