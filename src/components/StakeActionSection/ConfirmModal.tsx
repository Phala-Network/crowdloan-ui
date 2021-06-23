import React, { useCallback, SetStateAction, Dispatch } from 'react'
import ModalTitle from '@/components/ModalTitle'
import NormalButton from '@/components/NormalButton'
import ModalActions from '@/components/ModalActions'
import styled from 'styled-components'
import * as Sentry from '@sentry/browser'
import { useI18n } from '@/i18n'
import { useIntl } from 'gatsby-plugin-intl'
import { useWeb3 } from '@/utils/web3'
import { useMeta } from '@/utils/meta'
import {
  Modal,
  Fieldset,
  Divider,
  Description,
  Spacer,
  useToasts,
  useInput,
  useModal,
} from '@geist-ui/react'
import gtag from '../../utils/gtag'
import queryString from 'query-string'
import dayjs from 'dayjs'

type Props = {
  txWaiting: boolean
  txValue: string
  txPaymentInfo: any
  tx: any
  referrerInput: ReturnType<typeof useInput>
  confirmModal: ReturnType<typeof useModal>
  stakeSuccessModal: ReturnType<typeof useModal>
  setTxWaiting: Dispatch<SetStateAction<boolean>>
}

const ModalLine = styled.p`
  word-break: initial;
  word-wrap: break-word;
  text-align: left;
  font-size: 0.9rem;
`

const ConfirmModal: React.FC<Props> = (props) => {
  const {
    txWaiting,
    txValue,
    txPaymentInfo,
    tx,
    referrerInput,
    confirmModal,
    setTxWaiting,
    stakeSuccessModal,
  } = props
  const { t } = useI18n()
  const { locale } = useIntl()
  const { currentAccount, currentInjector } = useWeb3()
  const { refetch } = useMeta()
  const [, setToast] = useToasts()

  const trySubmitTx = useCallback(() => {
    gtag('click', {
      position: 'staking confirm modal',
      type: 'Submit',
    })

    setTxWaiting(true)
    tx.signAndSend(
      currentAccount.address,
      { signer: currentInjector.signer },
      ({ status }) => {
        if (status.isInBlock) {
          setTimeout(() => {
            setTxWaiting(false)
            confirmModal.setVisible(false)
            stakeSuccessModal.setVisible(true)
            refetch()

            const qs = queryString.parse(location.search)

            gtag('stake success', {
              txValue,
              address: currentAccount?.address,
              datetime: dayjs(new Date()).toISOString(),
              ...qs,
            })

            Sentry.captureMessage(
              'stake success ' +
                JSON.stringify({
                  address: currentAccount?.address,
                  txValue,
                  datetime: dayjs(new Date()).toISOString(),
                  ...qs,
                })
            )
          }, 6000)
        } else {
          console.warn(`Current status: ${status.type}`)
        }
      }
    ).catch((error: any) => {
      console.warn(error)
      Sentry.captureException(error)

      const text = error.message.includes('1010')
        ? t('insufficientFee')
        : error.message.includes('Cancelled')
        ? t('you canceled the contribution')
        : 'Invalid referrer.'
      setTxWaiting(false)
      setToast({
        text,
        type: 'error',
        delay: 6000,
      })
    })
  }, [tx, txWaiting, currentAccount])

  return (
    <Modal {...confirmModal.bindings} disableBackdropClick={txWaiting}>
      <ModalTitle {...confirmModal.bindings}>{t('PleaseConfirm')}</ModalTitle>
      <Modal.Subtitle></Modal.Subtitle>
      <Fieldset>
        <Fieldset.Content style={{ width: '100%', paddingBottom: 0 }}>
          {locale === 'zh' && (
            <ModalLine>
              您将在 Kusama 插槽拍卖中支持 Khala {txValue} ，如果竞拍成功，您的
              KSM 将在租期结束后解锁，如果失败，拍卖结束后立即解锁；
              {referrerInput.state.trim()
                ? `您的邀请人是 ${referrerInput.state.trim()}；`
                : null}
              您的 PHA 奖励将在 Khala 赢得一个插槽并成功运行为平行链时释放 34％
              到您的的地址。剩余的66％将在11个月内线性释放。
            </ModalLine>
          )}
          {locale === 'en' && (
            <ModalLine>
              You will contribute {txValue} for Khala in the Kusama Slot
              Auction, If Khala wins, your KSM will be unlocked at the end of
              the lease period, if it does not win, it will be unbonded
              immediately after the auction ends;{' '}
              {referrerInput.state.trim()
                ? `Your referrer is ${referrerInput.state.trim()}; `
                : null}
              When Khala wins a slot and runs as parachain, 34% of the PHA
              rewards vest to your addresses immediately, with the remaining 66%
              vesting monthly over 11 months. Market prices are volatile and
              shift quickly.
            </ModalLine>
          )}
        </Fieldset.Content>
        <Divider />
        <Fieldset.Content
          style={{ width: '100%', paddingTop: 0, textAlign: 'left' }}
        >
          <Description title="Contribution Value" content={txValue || '...'} />
          <Divider volume={0} />
          <Description
            title="Estimated Fee"
            content={txPaymentInfo ? txPaymentInfo.partialFee.toHuman() : '...'}
          />
        </Fieldset.Content>
      </Fieldset>
      <ModalActions>
        <NormalButton
          auto
          disabled={txWaiting}
          onClick={txWaiting ? undefined : () => confirmModal.setVisible(false)}
        >
          {t('cancel')}
        </NormalButton>
        <Spacer x={0.5}></Spacer>
        <NormalButton
          auto
          primary
          loading={txWaiting}
          disabled={txWaiting}
          onClick={txWaiting ? undefined : trySubmitTx}
        >
          {t('ok')}
        </NormalButton>
      </ModalActions>
    </Modal>
  )
}

export default ConfirmModal
