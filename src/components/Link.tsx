import styled from 'styled-components'

const Link = styled.a`
  color: ${(props) => props.theme.yg01};
  text-decoration-line: underline;

  &:hover {
    opacity: 0.8;
  }
`

export default Link
