import {
  Container,
  Input,
  Loading,
  Modal,
  Spacer,
  useModal,
} from '@geist-ui/react'
import React from 'react'
import { useWeb3 } from '@/utils/web3'
import ReactDOM from 'react-dom'
import { useI18n } from '@/i18n'
import NormalButton from './NormalButton'
import useInvitorAction from '@/hooks/useInvitorAction'

type Props = {
  modal: ReturnType<typeof useModal>
}

const InvitorInfoDialog: React.FC<Props> = ({ modal }) => {
  const { openModal, currentAccount } = useWeb3()
  const { t } = useI18n()
  const {
    txWaiting,
    referrer,
    tryInvite,
    txPaymenInfo,
    isLoading,
    setInvitor,
    invitor,
    referrerCheck,
  } = useInvitorAction()

  if (isLoading) {
    return (
      <Modal {...modal.bindings}>
        <Modal.Title>{t('affiliationReward')}</Modal.Title>
        <Modal.Content>
          <Loading></Loading>
        </Modal.Content>
      </Modal>
    )
  }

  const modalComponent = (
    <Modal {...modal.bindings}>
      <Modal.Title>{t('affiliationReward')}</Modal.Title>
      <Modal.Content>
        <div>
          除质押奖池外，邀请好友来为 Phala 质押
          KSM，双方都将获得一定比例的额外奖励。
          被邀请人在第一次质押后不得再更改邀请人。
        </div>

        {currentAccount && (
          <div>
            <Spacer y={1}></Spacer>
            <div style={{ marginBottom: 6 }}>{t('introducer')}</div>
            {referrer && <div>{referrer}</div>}
            {!referrer && (
              <Container>
                <Input
                  onChange={(e) => setInvitor(e.target.value)}
                  value={invitor}
                  width="100%"
                  placeholder="填写邀请人获得PHA奖励"
                />
                {referrerCheck && (
                  <>
                    <Spacer x={1}></Spacer>
                    <div>
                      <NormalButton loading={txWaiting} onClick={tryInvite}>
                        {t('ok')}
                      </NormalButton>
                      <div>
                        {txPaymenInfo
                          ? `${t('Fee')}: ${txPaymenInfo.partialFee.toHuman()}`
                          : '...'}
                      </div>
                    </div>
                  </>
                )}
              </Container>
            )}
          </div>
        )}
      </Modal.Content>
      {!currentAccount && (
        <Modal.Action
          onClick={() => {
            openModal()
            modal.setVisible(false)
          }}
        >
          {t('connectWallet')}
        </Modal.Action>
      )}
      {currentAccount && (
        <Modal.Action
          onClick={() => {
            modal.setVisible(false)
          }}
        >
          {t('ok')}
        </Modal.Action>
      )}
    </Modal>
  )

  return ReactDOM.createPortal(modalComponent, document.body)
}

export default InvitorInfoDialog
