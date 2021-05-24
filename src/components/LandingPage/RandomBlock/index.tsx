import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

const RootDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

type Props = {
  row?: number
  column?: number
}

const RandomBlock: React.FC<Props> = (props) => {
  const { row = 8, column = 4 } = props
  const [size, setSize] = useState(20)
  const [data, setData] = useState(new Array(row * column).fill(0))
  const isSM = useMediaQuery({ maxWidth: 768 })
  const isMD = useMediaQuery({ minWidth: 768, maxWidth: 992 })
  const isLG = useMediaQuery({ minWidth: 1280 })

  useEffect(() => {
    if (isSM) {
      setSize(10)
    } else if (isMD) {
      setSize(15)
    } else {
      setSize(20)
    }
  }, [isSM, isMD, isLG])

  useEffect(() => {
    setData(
      data.map(() => {
        return Math.random()
      })
    )
  }, [])

  return (
    <RootDiv
      style={{
        width: size * column,
        height: size * row,
      }}
    >
      {data.map((item, index) => {
        return (
          <div
            style={{
              width: size,
              height: size,
              backgroundColor: item > 0.8 ? '#03ffff' : '',
            }}
            key={index}
          ></div>
        )
      })}
    </RootDiv>
  )
}

export default RandomBlock
