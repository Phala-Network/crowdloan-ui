import { useI18n } from '@/i18n'
import { useWeb3 } from '@/utils/web3'
import { Button } from '@geist-ui/react'
import { User } from '@geist-ui/react-icons'
import React from 'react'

export const ConnectWallet: React.FC = () => {
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
        {currentAccount.meta.name ||
          `${currentAccount.address.slice(
            0,
            5
          )}...${currentAccount.address.slice(-5)}`}
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
      {t('connectWallet')}
    </Button>
  )
}
