import React, { useState } from 'react'
import { Modal, Radio, useModal } from '@geist-ui/react'
import { useI18n } from '@/i18n'
import ModalTitle from '@/components/ModalTitle'
import NormalButton from '@/components/NormalButton'
import ModalActions from '@/components/ModalActions'
import rpc from '../../constant/rpc'

type Props = {
  modal: ReturnType<typeof useModal>
  blockId?: string
}

const RpcSwitchModal: React.FC<Props> = (props) => {
  const { modal } = props
  const { t } = useI18n()
  const [value, setValue] = useState<string>(
    localStorage.getItem('rpc') || process.env.GATSBY_POLKADOT_ENDPOINT
  )

  const ok = () => {
    localStorage.setItem('rpc', value)

    window.location.reload()
  }

  return (
    <Modal {...modal.bindings}>
      <ModalTitle {...modal.bindings}>Switch</ModalTitle>
      <Modal.Content>
        <Radio.Group
          value={value}
          onChange={(value: string) => setValue(value)}
        >
          {rpc.map((item) => {
            return (
              <Radio key={item.name} value={item.value}>
                {item.name}
              </Radio>
            )
          })}
        </Radio.Group>
      </Modal.Content>
      <ModalActions>
        <NormalButton primary auto onClick={ok}>
          {t('ok')}
        </NormalButton>
      </ModalActions>
    </Modal>
  )
}

export default RpcSwitchModal
