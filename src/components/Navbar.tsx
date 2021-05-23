import { localeNames } from '@/i18n'
import { useI18n } from '@/i18n'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link, Button } from '@geist-ui/react'
import { useWeb3 } from '@/utils/web3'
import { User } from '@geist-ui/react-icons'
import { changeLocale, IntlContext } from 'gatsby-plugin-intl'
import { AccountModal } from '@/utils/web3/common'

const Logo = styled.img`
  height: 40px;
  display: block;
  margin-left: 16px;
`

const NavbarWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  position: fixed;
  z-index: 100;
  height: 60px;
  width: 100%;
  left: 0;
  top: 0;
  background: ${(props) => props.theme.bl01};
  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.1);
  color: ${(props) => props.theme.wh01};
  backdrop-filter: blur(8px);
  overflow-x: auto;
`
const Menu = styled.ul<{ color: string }>`
  display: flex;
  margin: 0 0 0 42px;
  padding-right: 16px;
  align-items: center;
  flex-flow: row nowrap;

  & li {
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    margin-left: 24px;
    word-break: keep-all;

    &:before {
      content: '';
    }
  }

  & .Connect.btn {
    font-size: 14px;
    height: 30px;
    line-height: 32px;
    background: ${(props) => props.color};
    border-radius: 4px;
    padding: 0 15px;
    border: none;
    color: rgba(0, 0, 0, 0.9);

    &:hover,
    &:focus,
    &:active {
      color: rgba(0, 0, 0, 0.7);
      background: ${(props) => props.color};
    }
  }

  & .Dropdown {
    & button {
      font-size: 14px;
      line-height: 20px;
      min-width: auto;
      background-color: transparent;
      padding: 0;
      padding-right: 2px;
      color: rgba(255, 255, 255, 0.9);

      &:hover {
        background-color: transparent;
      }
    }
    &.btn-dropdown {
      border: none;

      & details {
        background-color: transparent;

        & summary {
          border-left: none;
          background-color: transparent;
        }
      }
    }
  }
`

export type NavbarProps = {
  color?: string
  logo?: string
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { t } = useI18n()
  const { locale } = useContext(IntlContext)
  const { modalBindings } = useWeb3()
  const { color = '#d1ff52', logo = '/logo.svg' } = props

  return (
    <>
      <AccountModal {...modalBindings} />
      <NavbarWrapper>
        <Logo src={logo} />
        <Menu color={color}>
          <li>
            <Link target="_blank" href={t('aboutKhalaLink')}>
              {t('aboutKhala')}
            </Link>
          </li>
          <li>
            <Link target="_blank" href={t('learnSlotAuctionLink')}>
              {t('learnSlotAuction')}
            </Link>
          </li>
          <li>
            <Link style={{ color }}>{t('affiliationProgram')}</Link>
          </li>
          {Object.keys(localeNames).map((loc) =>
            locale === loc ? null : (
              <li key={loc} onClick={() => changeLocale(loc)}>
                <Link href={null}>{localeNames[loc]}</Link>
              </li>
            )
          )}
          <li>
            <ConnectWallet />
          </li>
        </Menu>
      </NavbarWrapper>
    </>
  )
}

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

export default Navbar
