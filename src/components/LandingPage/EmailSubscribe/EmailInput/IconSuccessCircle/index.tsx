import React from 'react'
import styled from 'styled-components'

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.6);
  margin-right: -10px;
`

const IconSuccessCircle: React.FC = () => {
  return (
    <Icon>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 32C7.17741 32 0 24.8226 0 16C0 7.17741 7.17741 0 16 0C24.8226 0 32 7.17741 32 16C32 24.8226 24.8226 32 16 32ZM16 1.88235C8.21459 1.88235 1.88235 8.21459 1.88235 16C1.88235 23.7835 8.21459 30.1176 16 30.1176C23.7854 30.1176 30.1176 23.7835 30.1176 16C30.1176 8.21459 23.7854 1.88235 16 1.88235ZM14.2024 21.9991C14.4689 21.9984 14.724 21.8906 14.9101 21.6998L23.7139 12.6984C24.0996 12.3038 24.0924 11.6713 23.6979 11.2856C23.3034 10.9 22.6709 10.9071 22.2852 11.3016L14.1892 19.5784L9.70729 15.0984C9.45477 14.8458 9.08671 14.7472 8.74176 14.8396C8.3968 14.9321 8.12736 15.2015 8.03493 15.5465C7.9425 15.8914 8.04112 16.2595 8.29365 16.512L13.4889 21.7073C13.6773 21.8939 13.9316 21.9988 14.1967 21.9991H14.2024Z"
          fill="#D9D9D9"
        />
      </svg>
    </Icon>
  )
}

export default IconSuccessCircle
