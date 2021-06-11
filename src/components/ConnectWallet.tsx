import { useI18n } from '@/i18n'
import { useWeb3 } from '@/utils/web3'
import { Button } from '@geist-ui/react'
import { User } from '@geist-ui/react-icons'
import React from 'react'
import CurrentAccountName from '@/components/CurrentAccountName'

export const ConnectWallet: React.FC = (props) => {
  const { openModal, currentAccount } = useWeb3()
  const { t } = useI18n()

  if (currentAccount) {
    return (
      <Button
        effect={false}
        size="small"
        onClick={() => openModal()}
        auto
        type="default"
        icon={<User />}
      >
        <CurrentAccountName />
      </Button>
    )
  }
  return (
    <Button
      effect={false}
      size="mini"
      onClick={() => openModal()}
      className="Connect"
    >
      {props.children || t('connectWallet')}
    </Button>
  )
}
