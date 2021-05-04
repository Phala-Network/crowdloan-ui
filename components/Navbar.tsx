import { AppLocale, localeNames } from '@/i18n'
import { useI18n } from 'next-rosetta'
import React from 'react'
import styled from 'styled-components'
import { Link, Button } from '@geist-ui/react'
import { useWeb3 } from '@/utils/web3'
import { User } from '@geist-ui/react-icons'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px 16px;
  position: fixed;
  z-index: 100;
  height: 60px;
  width: 100%;
  left: 0;
  top: 0;
  background: ${(props) => props.theme.bl01};
  box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.1);
  color: ${(props) => props.theme.wh01};
  background-image: url('/logo.svg');
  background-repeat: no-repeat;
  background-size: auto 40px;
  background-position-y: center;
  background-position-x: 24px;
  backdrop-filter: blur(8px);
`
const Menu = styled.ul`
  display: flex;
  margin: 0;
  align-items: center;

  & li {
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    margin-left: 24px;

    &:before {
      content: '';
    }
  }

  & .Connect.btn {
    width: 80px;
    height: 30px;
    background: #d1ff52;
    border-radius: 4px;
    padding: 0;
    border: none;
    color: rgba(0, 0, 0, 0.9);

    &:hover,
    &:focus,
    &:active {
      color: rgba(0, 0, 0, 0.7);
      background: #d1ff52;
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
const Navbar: React.FC = () => {
  const { t } = useI18n<AppLocale>()
  const { locale, locales, asPath } = useRouter()

  return (
    <NavbarWrapper>
      <Menu>
        <li>
          <Link>{t('aboutKhala')}</Link>
        </li>
        <li>
          <Link>{t('learnSlotAuction')}</Link>
        </li>
        <li>
          <Link style={{ color: '#D1FF52' }}>{t('affiliationProgram')}</Link>
        </li>
        {locales?.map((loc) =>
          locale === loc ? null : (
            <li key={loc}>
              <NextLink href={asPath} locale={loc}>
                <Link>{localeNames[loc]}</Link>
              </NextLink>
            </li>
          )
        )}
        <li>
          <ConnectWallet />
        </li>
      </Menu>
    </NavbarWrapper>
  )
}

const ConnectWallet = () => {
  const { openModal, currentAccount } = useWeb3()
  if (currentAccount) {
    return (
      <Button
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
    <Button size="mini" onClick={() => openModal()} className="Connect">
      连接钱包
    </Button>
  )
}

export default Navbar
