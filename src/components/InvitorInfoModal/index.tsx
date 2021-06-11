import { Input, Loading, Modal, Spacer, useModal } from '@geist-ui/react'
import React from 'react'
import { useWeb3 } from '@/utils/web3'
import ReactDOM from 'react-dom'
import { useI18n } from '@/i18n'
import NormalButton from '@/components/NormalButton'
import useInvitorAction from '@/hooks/useInvitorAction'
import NormalModal from './NormalModal'
import MobileModal from './MobileModal'
import { useMediaQuery } from 'react-responsive'
import Medal from './Medal'
import ContributorInfo from './ContributorInfo'

type Props = {
  modal: ReturnType<typeof useModal>
}

const InvitorInfoModal: React.FC<Props> = ({ modal }) => {
  const { openModal, currentAccount } = useWeb3()
  const { t } = useI18n()
  const {
    txWaiting,
    referrer,
    tryInvite,
    txPaymentInfo,
    isLoading,
    setInvitor,
    invitor,
    referrerCheck,
  } = useInvitorAction()
  const isXS = useMediaQuery({ maxWidth: 760 })
  const isLogin = !!currentAccount

  const content = isLoading ? (
    <Loading></Loading>
  ) : (
    <>
      <Modal.Content style={{ fontSize: 14 }}>
        {isXS && !isLogin && <Medal></Medal>}
        <div>{t('affiliationRewardText')}</div>

        {isLogin && (
          <div>
            <Spacer y={1}></Spacer>
            <div style={{ marginBottom: 6 }}>{t('yourIntroducer')}</div>
            {referrer && <div>{referrer}</div>}
            {!referrer && (
              <>
                <div style={{ display: !isXS ? 'flex' : 'block' }}>
                  <Input
                    onChange={(e) => setInvitor(e.target.value)}
                    value={invitor}
                    width="100%"
                    placeholder={t(
                      'Fill_in_the_introducer_to_get_extra_rewards'
                    )}
                  />
                  {referrerCheck && (
                    <>
                      <Spacer x={0.6}></Spacer>
                      <div>
                        <NormalButton
                          primary
                          loading={txWaiting}
                          onClick={tryInvite}
                        >
                          {t('ok')}
                        </NormalButton>
                        <div>
                          {txPaymentInfo
                            ? `${t(
                                'Fee'
                              )}: ${txPaymentInfo.partialFee.toHuman()}`
                            : '...'}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <Spacer y={1}></Spacer>
                <ContributorInfo />
              </>
            )}
            <Spacer y={0.5}></Spacer>
          </div>
        )}
      </Modal.Content>
      {!isLogin && (
        <div style={{ textAlign: isXS ? 'center' : 'right', marginTop: 20 }}>
          <NormalButton
            auto
            primary
            onClick={() => {
              openModal()
              modal.setVisible(false)
            }}
          >
            {t('connectWallet')}
          </NormalButton>
        </div>
      )}
    </>
  )

  return ReactDOM.createPortal(
    React.createElement(isXS ? MobileModal : NormalModal, { modal }, content),
    document.body
  )
}

export default InvitorInfoModal
