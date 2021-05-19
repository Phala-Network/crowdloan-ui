import styled from 'styled-components'

const PositionIcon = styled.div<{ top: number }>`
  width: 19px;
  height: 14px;
  background-image: url('/position.svg');
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  top: ${(props) => props.top ?? 0}px;
  margin-left: 10px;
`

export default PositionIcon
