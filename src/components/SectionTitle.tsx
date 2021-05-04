import React from 'react'
import styled from 'styled-components'

const SectionTitleWrapper = styled.div`
  font-weight: normal;
  display: flex;
  align-items: center;
  place-content: space-between;
  margin: 8px 0 12px;
  & > .text {
    padding: 0;
    font-size: 16px;
    line-height: 22px;
    color: ${(props) => props.theme.wh01};
    &.desc {
      color: ${(props) => props.theme.wh02};
      font-size: 12px;
      text-align: right;
      &.title {
        font-size: 16px;
        color: ${(props) => props.theme.wh01};
        font-weight: 600;
      }
    }
  }
`

type SectionTitleOptions = {
  title: React.ReactNode | string
  desc?: React.ReactNode | string
  descClassName?: string
}

const SectionTitle: React.FC<SectionTitleOptions> = ({
  title,
  children,
  desc,
  descClassName = 'text desc',
}) => {
  return (
    <SectionTitleWrapper>
      <div className="text">{title}</div>
      {desc ? <div className={descClassName}>{desc}</div> : null}
      {children || null}
    </SectionTitleWrapper>
  )
}

export default SectionTitle
