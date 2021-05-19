import styled from 'styled-components'

const AlertIcon = styled.div<{ size?: number }>`
  width: ${(props) => props.size || 14}px;
  height: ${(props) => props.size || 14}px;
  background-image: url('/alert.svg');
  background-size: 100% 100%;
`

export default AlertIcon
