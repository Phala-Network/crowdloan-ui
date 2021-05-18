import React from 'react'
import styled from 'styled-components'
import RcInputNumber, { InputNumberProps } from 'rc-input-number'

type Props = InputNumberProps & {
  inputSize?: 'default' | 'big'
  textAlign?: 'left' | 'right'
  before?: React.ReactNode
  after?: React.ReactNode
  width?: number
}

const Wrapper = styled.div<{ height: number; fontSize: number }>`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  padding: 0 6px;
  line-height: ${(props) => props.height}px;
  height: ${(props) => props.height}px;
  font-size: ${(props) => props.fontSize}px;
`

const InputWrapper = styled.div<{
  height: number
  width: number
  textAlign: 'left' | 'right'
}>`
  width: ${(props) => props.width}px;

  & input {
    font-weight: 600;
    line-height: ${(props) => props.height}px;
    height: ${(props) => props.height}px;
    background: transparent;
    border: none;
    text-align: ${(props) => props.textAlign};
    margin: 0;
    width: ${(props) => props.width}px;
  }
`

const Before = styled.span`
  margin-right: 2px;
`
const After = styled.span`
  margin-left: 2px;
`

const InputNumber: React.FC<Props> = (props) => {
  const { inputSize, width = 60, textAlign, ...others } = props
  const height = React.useMemo(() => inputSize, [inputSize]) === 'big' ? 40 : 24
  const fontSize =
    React.useMemo(() => inputSize, [inputSize]) === 'big' ? 25 : 14

  return (
    <Wrapper height={height} fontSize={fontSize}>
      {props.before && <Before>{props.before}</Before>}
      <InputWrapper height={height} width={width} textAlign={textAlign}>
        <RcInputNumber
          min={0}
          upHandler={null}
          downHandler={null}
          {...others}
        />
      </InputWrapper>
      {props.after && <After>{props.after}</After>}
    </Wrapper>
  )
}

export default InputNumber
