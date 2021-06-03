import React from 'react'
import styled from 'styled-components'

type Props = {
  onClose: () => void
}

const ModalTitleWrap = styled.div`
  font-size: 16px;
  padding-left: 16pt;
  padding-right: 16pt;
  padding-bottom: 16pt;
  margin-left: -16pt;
  margin-right: -16pt;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.1);
`

const CloseIcon = styled.div`
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`

const ModalTitle: React.FC<Props> = (props) => {
  const { children, onClose } = props

  return (
    <ModalTitleWrap>
      <div>{children}</div>
      <CloseIcon onClick={() => onClose?.()}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.99999 5.58599L11.95 0.635986L13.364 2.04999L8.41399 6.99999L13.364 11.95L11.95 13.364L6.99999 8.41399L2.04999 13.364L0.635986 11.95L5.58599 6.99999L0.635986 2.04999L2.04999 0.635986L6.99999 5.58599Z"
            fill="white"
            fillOpacity="0.9"
          />
        </svg>
      </CloseIcon>
    </ModalTitleWrap>
  )
}

export default ModalTitle
