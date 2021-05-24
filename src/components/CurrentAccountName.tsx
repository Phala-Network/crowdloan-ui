import React from 'react'
import { useWeb3 } from '@/utils/web3'

const CurrentAccountName: React.FC = () => {
  const { currentAccount } = useWeb3()

  if (!currentAccount) return null

  return (
    <div>
      {currentAccount.meta.name ||
        `${currentAccount.address.slice(0, 5)}...${currentAccount.address.slice(
          -5
        )}`}
    </div>
  )
}

export default CurrentAccountName
