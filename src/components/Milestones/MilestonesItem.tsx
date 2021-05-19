import React from 'react'
import styled from 'styled-components'

const Item = styled.li`
  font-size: 12px;
  list-style: none;
  margin: 0;
  padding-bottom: 20px;
  position: relative;
  height: 100px;

  &:before {
    display: none;
  }
`

const Label = styled.div`
  position: absolute;
  text-align: right;
  top: -6.001px;
  width: calc(50% - 10px);
  word-break: break-word;
`

const Content = styled.div`
  position: absolute;
  left: 50%;
  margin-left: 8px;
  top: -6.001px;
  word-break: break-word;
`

const Tail = styled.div<{ active: boolean }>`
  border-left: 2px solid
    ${(props) => (props.active ? props.theme.yg01 : props.theme.wh03)};
  height: calc(100% - 8px);
  left: 50%;
  box-sizing: border-box;
  position: absolute;
  top: 8px;
`

const Head = styled.div<{ isLast: boolean }>`
  background-color: ${(props) => props.theme.bl04};
  border: 2px solid
    ${(props) => (props.isLast ? props.theme.re01 : props.theme.yg01)};
  border-radius: 100px;
  height: 8px;
  position: absolute;
  width: 8px;
  margin-left: -3px;
  left: 50%;
`

type Props = {
  label?: string
  content?: string
  noTail?: boolean
  isLast?: boolean
  active?: boolean
}

const MilestonesItem: React.FC<Props> = (props) => {
  const {
    noTail = false,
    label,
    content,
    isLast = false,
    active = false,
  } = props
  return (
    <Item>
      {label && <Label>{label}</Label>}
      {!noTail && <Tail active={active}></Tail>}
      <Head isLast={isLast}></Head>
      {content && <Content>{content}</Content>}
    </Item>
  )
}

export default MilestonesItem
