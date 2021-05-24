import React from 'react'
import styled from 'styled-components'

const ArrowDiv = styled.div`
  width: 90px;
  height: 50px;
  position: absolute;
  right: -90px;
  bottom: 5px;
  background-image: url('/landing/black-arrow.svg');
  background-size: 100% 100%;
  z-index: 10;

  &.rightBottom {
    transform-origin: center;
    transform: rotate(90deg);
    bottom: -70px;
    right: -10px;
  }
`

export const Arrow: React.FC<{ position?: string }> = (props) => {
  return <ArrowDiv className={props.position}></ArrowDiv>
}
