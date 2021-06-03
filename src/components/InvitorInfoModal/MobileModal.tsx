import { useBodyScroll, useModal } from '@geist-ui/react'
import React, { useEffect } from 'react'
import { useI18n } from '@/i18n'
import styled from 'styled-components'

type Props = {
  modal: ReturnType<typeof useModal>
}

const Modal = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background: #222222;
  z-index: 10000;
`

const ModalHeader = styled.div`
  background: ${(props) => props.theme.bl01};
  font-size: 16px;
  color: ${(props) => props.theme.wh01};
  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.1);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`

const ModalContent = styled.div`
  padding: 16px;
`

const MobileModal: React.FC<Props> = (props) => {
  const { modal, children } = props
  const { t } = useI18n()
  const [, setHidden] = useBodyScroll()
  const modalIsOpen = modal?.bindings?.open

  useEffect(() => {
    setHidden(modalIsOpen)
  }, [modalIsOpen])

  if (!modalIsOpen) return null

  return (
    <Modal>
      <ModalHeader>
        <div onClick={() => modal.setVisible(false)}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.828 7.00005H16V9.00005H3.828L9.192 14.364L7.778 15.778L0 8.00005L7.778 0.222046L9.192 1.63605L3.828 7.00005Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
        </div>

        {t('affiliationReward')}
        <div></div>
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
    </Modal>
  )
}

export default MobileModal
