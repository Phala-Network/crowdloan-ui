import { useI18n } from '@/i18n'
import {
  Modal,
  useModal,
  Note,
  ButtonGroup,
  Button,
  Description,
  Loading,
} from '@geist-ui/react'
import { User } from '@geist-ui/react-icons'
import type {
  InjectedExtension,
  InjectedAccountWithMeta,
} from '@polkadot/extension-inject/types'
import React, { createContext } from 'react'
import styled from 'styled-components'
import { usePolkadotApi } from '../polkadot'

export type ExtensionContextValue = {
  enable(): unknown
  error: Error | string | undefined
  isEnabled: boolean
  extensions: InjectedExtension[]
  accounts: InjectedAccountWithMeta[]
  currentAccount?: InjectedAccountWithMeta
  currentInjector?: InjectedExtension
  openModal?: (callbackRef?: React.MutableRefObject<any>) => any
  accountModal?
  modalBindings?
}

export const _defaultContextValue: ExtensionContextValue = {
  enable: () => undefined,
  error: undefined,
  isEnabled: false,
  extensions: [],
  accounts: [],
}

export const ExtentionContext =
  createContext<ExtensionContextValue | null>(_defaultContextValue)

export const ERR_POLKADOT_WEB3_NOT_INJECTED = 'ERR_POLKADOT_WEB3_NOT_INJECTED'

export const POLKADOT_WEB3_APP_NAME =
  process.env.POLKADOT_WEB3_APP_NAME || 'Phala Network'

const ItemButton = styled(Button)`
  width: 100% !important;
  height: auto !important;
  line-height: initial !important;
  padding: 0.4rem 1.5625rem 0.8rem !important;
  font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
    Bitstream Vera Sans Mono, Courier New, monospace !important;
  white-space: initial !important;
  & .text {
    text-align: left !important;
    word-break: break-all !important;
  }
`

function web3IsInjected() {
  return Object.keys(window?.['injectedWeb3']).length !== 0
}

export const AccountModal: React.FC<{
  modal: ReturnType<typeof useModal>
  accounts?: InjectedAccountWithMeta[]
  setCurrentAccount?: React.Dispatch<
    React.SetStateAction<InjectedAccountWithMeta>
  >
  isEnabled: boolean
  callbackRef
  setCallbackRef: React.Dispatch<any>
}> = ({
  isEnabled,
  modal,
  accounts = [],
  setCurrentAccount,
  callbackRef,
  setCallbackRef,
}) => {
  const { initialized } = usePolkadotApi()
  const { t } = useI18n()

  if (!web3IsInjected()) {
    return (
      <Modal {...modal.bindings}>
        <Modal.Title>{t('alert')}</Modal.Title>
        <Modal.Content>
          <div style={{ textAlign: 'center' }}>{t('pleaseInstallText')}</div>
        </Modal.Content>
        <Modal.Action
          onClick={() => {
            window.open('https://polkadot.js.org/extension/')
            modal.setVisible(false)
          }}
        >
          {t('install')}
        </Modal.Action>
      </Modal>
    )
  }

  if (!initialized) {
    return (
      <Modal {...modal.bindings}>
        <Modal.Title>{t('accounts')}</Modal.Title>
        <Modal.Content>
          <Loading />
        </Modal.Content>
      </Modal>
    )
  }

  return (
    <Modal
      {...modal.bindings}
      onClose={() => {
        modal.bindings.onClose()
        setCallbackRef(null)
      }}
    >
      <Modal.Title>{t('accounts')}</Modal.Title>
      <Modal.Subtitle>
        {accounts.length ? t('selectAnAccount') : ''}
      </Modal.Subtitle>{' '}
      {isEnabled ? (
        accounts.length ? (
          <ButtonGroup size="large" vertical>
            {accounts.map((account) => (
              <ItemButton
                effect={false}
                key={account.address}
                onClick={() => {
                  setCurrentAccount(account)
                  modal.setVisible(false)
                  setTimeout(() => {
                    if (callbackRef) {
                      if (typeof callbackRef.current === 'function') {
                        callbackRef.current()
                      }
                      setCallbackRef(null)
                    }
                  }, 100)
                }}
                icon={<User />}
              >
                <Description
                  title={account.meta.name || account.address}
                  content={account.address}
                />
              </ItemButton>
            ))}
          </ButtonGroup>
        ) : (
          <Note label={false}>{t('accountNoticeAddAccount')}</Note>
        )
      ) : (
        <Note label={false}>{t('accountNoticeAllowAccess')}</Note>
      )}
      <Modal.Action
        passive
        onClick={() => {
          modal.setVisible(false)
          setCallbackRef(null)
        }}
      >
        {t('cancel')}
      </Modal.Action>
    </Modal>
  )
}
