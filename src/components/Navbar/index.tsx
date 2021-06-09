import { localeNames } from '@/i18n'
import { useI18n } from '@/i18n'
import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link, useModal } from '@geist-ui/react'
import { useWeb3 } from '@/utils/web3'
import { changeLocale, IntlContext } from 'gatsby-plugin-intl'
import { AccountModal } from '@/utils/web3/common'
import { ConnectWallet } from '@/components/ConnectWallet'
import MobileMenu from './MobileMenu'
import { useMediaQuery } from 'react-responsive'
import InvitorInfoModal from '@/components/InvitorInfoModal'

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
  z-index: 10000;
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
  hasAffiliationProgramLink?: boolean
}

const AffiliationProgram = ({
  setIsOpened = (b) => b,
  color,
  invitorInfoDialogModal,
}) => {
  const { t } = useI18n()

  return (
    <div
      style={{ color, cursor: 'pointer' }}
      onClick={() => {
        invitorInfoDialogModal.setVisible(true)
        setIsOpened?.(false)
      }}
    >
      {t('affiliationProgram')}
    </div>
  )
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { t } = useI18n()
  const { locale } = useContext(IntlContext)
  const { modalBindings } = useWeb3()
  const {
    color = '#03FFFF',
    logo = '/logo.svg',
    hasAffiliationProgramLink = true,
  } = props
  const showMobileMenuByMediaQuery = useMediaQuery({
    minWidth: 0,
    maxWidth: 900,
  })
  const invitorInfoDialogModal = useModal()

  const aboutKhalaLink = (
    <Link target="_blank" href={t('aboutKhalaLink')}>
      {t('aboutKhala')}
    </Link>
  )

  const learnSlotAuctionLink = (
    <Link target="_blank" href={t('learnSlotAuctionLink')}>
      {t('learnSlotAuction')}
    </Link>
  )

  const tgLink = (
    <Link target="_blank" href="https://t.me/phalanetwork">
      Telegram
    </Link>
  )

  const affiliationProgram = (
    <AffiliationProgram
      color={color}
      invitorInfoDialogModal={invitorInfoDialogModal}
    ></AffiliationProgram>
  )

  const createLocalLinks = (NodeType: string) =>
    Object.keys(localeNames).map((loc) =>
      locale === loc
        ? null
        : React.createElement(
            NodeType,
            {
              key: loc,
              onClick: () => changeLocale(loc),
            },
            <Link href={null}>{localeNames[loc]}</Link>
          )
    )

  return (
    <>
      <AccountModal {...modalBindings} />
      <InvitorInfoModal modal={invitorInfoDialogModal} />
      <NavbarWrapper>
        <Logo src={logo} />
        {!showMobileMenuByMediaQuery && (
          <Menu color={color}>
            <li>{aboutKhalaLink}</li>
            <li>{learnSlotAuctionLink}</li>
            {locale === 'en' && <li>{tgLink}</li>}
            {hasAffiliationProgramLink && <li>{affiliationProgram}</li>}
            {createLocalLinks('li')}

            <li>
              <ConnectWallet />
            </li>
          </Menu>
        )}

        <MobileMenu
          color={color}
          items={[
            aboutKhalaLink,
            learnSlotAuctionLink,
            locale === 'en' ? tgLink : null,
            hasAffiliationProgramLink ? affiliationProgram : null,
            ...createLocalLinks('div'),
          ]}
          show={showMobileMenuByMediaQuery}
        />
      </NavbarWrapper>
    </>
  )
}

export default Navbar
