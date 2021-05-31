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
        <div>{t('affiliationRewardText')}</div>

        {currentAccount && (
          <div>
            <Spacer y={1}></Spacer>
            <div style={{ marginBottom: 6 }}>{t('yourIntroducer')}</div>
            {referrer && <div>{referrer}</div>}
            {!referrer && (
              <Container>
                <Input
                  onChange={(e) => setInvitor(e.target.value)}
                  value={invitor}
                  width="100%"
                  placeholder={t('Fill_in_the_introducer_to_get_extra_rewards')}
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
