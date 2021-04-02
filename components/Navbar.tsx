// import { AppLocale } from '@/i18n'
// import { useI18n } from 'next-rosetta'
import React from 'react'
import styled from 'styled-components'
import { ButtonDropdown, Link, Button } from '@geist-ui/react'

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

    &:hover {
      color: rgba(0, 0, 0, 0.5);
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
  // const i18n = useI18n<AppLocale>()
  // const { t } = i18n
  return (
    <NavbarWrapper>
      <Menu>
        <li>
          <Link>关于Phala</Link>
        </li>
        <li>
          <Link>了解卡槽拍卖</Link>
        </li>
        <li>
          <Link style={{ color: '#D1FF52' }}>邀请奖励</Link>
        </li>
        <li>
          <ButtonDropdown size="mini" className="Dropdown">
            <ButtonDropdown.Item>中文</ButtonDropdown.Item>
            <ButtonDropdown.Item main>English</ButtonDropdown.Item>
          </ButtonDropdown>
        </li>
        <li>
          <Button size="mini" className="Connect">
            连接钱包
          </Button>
        </li>
      </Menu>
    </NavbarWrapper>
  )
}

export default Navbar
