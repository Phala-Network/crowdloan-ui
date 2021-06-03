import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import { Spacer, useBodyScroll } from '@geist-ui/react'
import { useWeb3 } from '@/utils/web3'
import CurrentAccountName from '@/components/CurrentAccountName'
import { useI18n } from '@/i18n'

// icons
const MenuIcon = styled.div`
  background-image: url('/navbar/mobile-menu.svg');
  background-size: contain;
  width: 18px;
  height: 16px;
  margin: 0 20px;
  cursor: pointer;
`

const CloseIcon = styled.div`
  background-image: url('/navbar/menu-close.svg');
  background-size: contain;
  width: 14px;
  height: 14px;
  cursor: pointer;
  margin: 8px;
  margin-left: auto;
`

const ArrowIcon = styled.div`
  background-image: url('/navbar/menu-arrow.svg');
  background-size: contain;
  width: 6px;
  height: 10px;
`

// menu
const MenuBody = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 11000;
`

const MenuContent = styled.div`
  background-color: #222222;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 327px;
  padding: 16px;
`

const MenuItem = styled.div`
  height: 60px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
`

const ConnectButton = styled.div<{ color: string }>`
  height: 48px;
  line-height: 48px;
  text-align: center;
  width: 100%;
  background: ${(props) => props.color};
  border-radius: 4px;
  color: ${(props) => props.theme.bl01};
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
`

type Props = {
  color?: string
  show?: boolean
  items?: JSX.Element[]
}

const MobileMenu: React.FC<Props> = (props) => {
  const { show: menuIsShow, items = [], color } = props
  const [hidden, setHidden] = useBodyScroll()
  const [isOpened, setIsOpened] = useState(false)
  const { openModal, currentAccount } = useWeb3()
  const { t } = useI18n()

  useEffect(() => {
    if (!menuIsShow) {
      close()
    }
  }, [menuIsShow])

  function open() {
    setIsOpened(true)
    setHidden(true)
  }

  function close() {
    setIsOpened(false)
    setHidden(false)
  }

  return (
    <>
      {menuIsShow && <MenuIcon onClick={open}></MenuIcon>}

      {isOpened &&
        hidden &&
        ReactDOM.createPortal(
          <MenuBody onClick={close}>
            <MenuContent onClick={(e) => e.stopPropagation()}>
              <CloseIcon onClick={close} />
              {items.map((item, index) => {
                return item ? (
                  <MenuItem key={index}>
                    {React.cloneElement(item, { setIsOpened })}
                    <ArrowIcon></ArrowIcon>
                  </MenuItem>
                ) : null
              })}
              <Spacer y={1} />
              <MenuItem>
                <ConnectButton
                  color={color}
                  onClick={() => {
                    close()
                    openModal()
                  }}
                >
                  {currentAccount ? <CurrentAccountName /> : t('connectWallet')}
                </ConnectButton>
              </MenuItem>
            </MenuContent>
          </MenuBody>,
          document.body
        )}
    </>
  )
}

export default MobileMenu
