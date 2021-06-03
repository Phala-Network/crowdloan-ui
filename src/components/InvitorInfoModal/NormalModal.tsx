import { Modal, useModal } from '@geist-ui/react'
import React from 'react'
import ModalTitle from '@/components/ModalTitle'
import { useI18n } from '@/i18n'

type Props = {
  modal: ReturnType<typeof useModal>
}

const NormalModal: React.FC<Props> = (props) => {
  const { modal, children } = props
  const { t } = useI18n()

  return (
    <Modal {...modal.bindings}>
      <ModalTitle {...modal.bindings}>{t('affiliationReward')}</ModalTitle>
      {children}
    </Modal>
  )
}

export default NormalModal
