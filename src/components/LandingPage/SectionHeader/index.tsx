import React from 'react'
import classnames from 'classnames'
import styled from 'styled-components'

const SectionHeaderWrap = styled.div`
  &.black {
    color: #0a0a0a;
  }

  &.gray {
    color: #d9d9d9;
  }

  .title {
    font-family: Lato-Black;
    font-size: 60px;
    line-height: 60px;

    @media (max-width: 768px) {
      font-size: 30px;
      line-height: 1;
    }
  }

  .description > div:last-child {
    margin-top: 20px;
  }

  .description {
    margin-top: 30px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;

    @media (max-width: 768px) {
      font-size: 12px;
      line-height: 1.17;
    }
  }
`

export type SectionHeaderProps = {
  title: React.ReactNode
  description?: string
  color?: 'black' | 'gray'
  className?: string
  descriptionClassName?: string
  titleClassName?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  const {
    descriptionClassName,
    titleClassName,
    title,
    description,
    color = 'black',
    className,
  } = props

  return (
    <SectionHeaderWrap
      className={classnames(['sectionHeader', color, className])}
    >
      <div className={classnames(['title', titleClassName])}>{title}</div>
      {description && (
        <div className={classnames(['description', descriptionClassName])}>
          {description}
        </div>
      )}
    </SectionHeaderWrap>
  )
}

export default SectionHeader
