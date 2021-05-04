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
  openModal?: () => any
  accountModal?
}

export const _defaultContextValue: ExtensionContextValue = {
  enable: () => undefined,
  error: undefined,
  isEnabled: false,
  extensions: [],
  accounts: [],
}

export const ExtentionContext = createContext<ExtensionContextValue | null>(
  _defaultContextValue
)

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

export const AccountModal: React.FC<{
  modal: ReturnType<typeof useModal>
  accounts?: InjectedAccountWithMeta[]
  setCurrentAccount?: React.Dispatch<
    React.SetStateAction<InjectedAccountWithMeta>
  >
  isEnabled: boolean
}> = ({ isEnabled, modal, accounts = [], setCurrentAccount }) => {
  const { initialized } = usePolkadotApi()

  if (!initialized) {
    return (
      <Modal {...modal.bindings}>
        <Modal.Title>Accounts</Modal.Title>
        <Modal.Content>
          <Loading />
        </Modal.Content>
      </Modal>
    )
  }

  return (
    <Modal {...modal.bindings}>
      <Modal.Title>Accounts</Modal.Title>
      <Modal.Subtitle>
        {accounts.length ? 'Select an account' : ''}
      </Modal.Subtitle>{' '}
      {isEnabled ? (
        accounts.length ? (
          <ButtonGroup size="large" vertical>
            {accounts.map((account) => (
              <ItemButton
                key={account.address}
                onClick={() => {
                  setCurrentAccount(account)
                  modal.setVisible(false)
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
          <Note label={false}>
            {'Please import/create accounts in the Polkadot extension.'}
          </Note>
        )
      ) : (
        <Note label={false}>
          {'Please allow access in the Polkadot extension.'}
        </Note>
      )}
      <Modal.Action passive onClick={() => modal.setVisible(false)}>
        Cancel
      </Modal.Action>
    </Modal>
  )
}
