import React, { useRef } from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import {
  Input,
  Button,
  useInput,
  useToasts,
  useModal,
  Modal,
  Fieldset,
  Divider,
  Description,
  Spacer,
} from '@geist-ui/react'
import { useWeb3 } from '@/utils/web3'
import { useBalance } from '@/utils/polkadot/hooks'
import { useCallback, useEffect, useState } from 'react'
import { usePolkadotApi } from '@/utils/polkadot'
import Demical from 'decimal.js'
import { useI18n } from '@/i18n'
import { decodeAddress } from '@polkadot/util-crypto'
import { useMeta } from '@/utils/meta'
import RcInputNumber from 'rc-input-number'
import AlertIcon from '@/components/AlertIcon'
import StakeSuccessModal from '@/components/StakeSuccessModal'
import useCheckEndBlock from '@/hooks/useCheckEndBlock'
import Calculator from './Calculator'
import InvitorInfoModal from '@/components/InvitorInfoModal'
import Referrer from './Referrer'
import ModalTitle from '@/components/ModalTitle'
import NormalButton from '@/components/NormalButton'
import ModalActions from '@/components/ModalActions'
import getReferralAddressFromURL from '@/utils/getReferralAddressFromURL'
import { useIntl } from 'gatsby-plugin-intl'

const createReferrerRemark = ({ paraId, api, referrer }) => {
  const refAcc = api.createType('AccountId', referrer)
  const remark = api.createType('PhalaCrowdloanReferrerRemark', {
    magic: 'CR',
    paraId,
    referrer: refAcc,
    referrerHash: refAcc.hash.toHex(),
  })
  return api.createType('Bytes', remark.toHex())
}

const createReferrerRemarkTx = ({ paraId, api, referrer }) => {
  return api.tx.system.remarkWithEvent(
    createReferrerRemark({ paraId, api, referrer })
  )
}

const style__StakeActionSection = css`
  background: linear-gradient(
      106.53deg,
      rgba(3, 255, 255, 0.2) 0%,
      rgba(100, 238, 172, 0.2) 100%
    ),
    #222222;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StakeActionInputWrapper = styled.div`
  margin-top: 8px;
  margin-bottom: 24px;

  & .wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  & .text {
    color: rgba(255, 255, 255, 0.9);
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
  }

  & .balance {
    color: rgba(255, 255, 255, 0.5);
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 22px;
  }

  & .InputWrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
    height: 72px;
    left: 16px;
    right: 16px;
    top: 58px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    word-break: keep-all;
    &:focus-within {
      box-shadow: inset 0px 0px 0px 1px rgba(3, 255, 255, 0.5);
    }
  }

  // override
  & .input-wrapper {
    border: none !important;
  }
  & input {
    font-size: 36px !important;
    line-height: 50px !important;
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 600;
    background: transparent;
    border: none;
    caret-color: #03ffff;
    display: block;
    width: 100%;
  }

  & .Label {
    width: 40px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    right: 72px;
    top: 8.5px;
    background: rgba(255, 255, 255, 0.2);
    color: #03ffff;
    border-radius: 4px;
    margin: 0px 8px;
    font-size: 12px;
    cursor: pointer;
  }

  & .Unit {
    font-weight: 600;
    font-size: 28px;
    line-height: 39px;
    color: rgba(255, 255, 255, 0.9);
  }

  & .InputPostfix {
    display: flex;
    align-items: center;
  }
`

const StakeActionForm = styled.div`
  margin-top: 17px;

  & .InviterWrap {
    display: flex;
    word-break: keep-all;
    align-content: center;
    justify-content: space-between;
    align-items: center;
  }

  & .with-label {
    flex: 1;
    margin-left: 12px;
  }

  // override
  & .InviterInput .input-wrapper {
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
    border: none !important;
    line-height: 40px !important;
  }

  & .InviterInput {
    height: 40px !important;
    width: 100% !important;

    span {
      background: rgba(0, 0, 0, 0.2);
      color: rgba(255, 255, 255, 0.9) !important;
      border: none;
      padding: 0 6px;
    }

    & input {
      font-size: 14px !important;
      line-height: 40px !important;
      color: rgba(255, 255, 255, 0.9) !important;
      font-weight: 600;
      text-align: right;
    }
  }

  & .ActionBtn.btn {
    height: 56px;
    background: #03ffff;
    border-radius: 8px;
    font-size: 20px;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.9);
    border: none;
    width: 100%;
    margin-top: 20px;
    &:focus {
      background: #03ffff;
    }
    &:hover {
      background: rgba(3, 255, 255, 0.8);
    }
    &:disabled,
    &[disabled] {
      opacity: 0.3;
      color: rgba(0, 0, 0, 0.4);
    }
  }
`

const ModalLine = styled.p`
  word-break: initial;
  word-wrap: break-word;
  text-align: left;
  font-size: 0.9rem;
`

const StakeActionSection: React.FC = () => {
  const { t } = useI18n()
  const {
    currentAccount,
    currentInjector,
    openModal: openWeb3Modal,
  } = useWeb3()
  const { api, initialized, chainInfo } = usePolkadotApi()
  const balance = useBalance(currentAccount?.address)
  const invitorInfoDialogModal = useModal()

  const {
    refetch,
    currentContributorQuery,
    campaignQuery: { data: campaign },
  } = useMeta()

  const referrer = currentContributorQuery?.data?.contributor?.referrer
  const [, setToast] = useToasts()
  const confirmModal = useModal()
  const stakeSuccessModal = useModal()
  const [stakeInput, setStakeInput] = useState(10)
  const { locale } = useIntl()
  const referrerInput = useInput('')
  const [referrerRewardAmount, setReferrerRewardAmount] = useState(0)
  const [
    buttonDisabledBecauseOfStakeValue,
    setButtonDisabledBecauseOfStakeValue,
  ] = useState(false)

  const accountCallbackRef = useRef(null)

  useEffect(() => {
    if (referrer) {
      referrerInput.setState(referrer)
    } else {
      const value = getReferralAddressFromURL()

      if (value && !referrer) {
        referrerInput.setState(value)
      }
    }
  }, [referrer])

  const [tx, setTx] = useState(null)
  const [txPaymentInfo, setTxPaymentInfo] = useState(null)
  useEffect(() => {
    if (!(api && tx && currentAccount)) {
      setTxPaymentInfo(null)
      return
    }
    ;(async () => {
      setTxPaymentInfo(await tx.paymentInfo(currentAccount.address))
    })()
  }, [currentAccount, tx, api, setTxPaymentInfo])
  const [txWaiting, setTxWaiting] = useState(false)
  const [txValue, setTxValue] = useState(null)
  const [stakeLeastAlert, setStakeLeastAlert] = useState(false)
  const [stakeActionButtonDisabled, setStakeActionButtonDisabled] =
    useState(false)
  const [disableStakeButtonByCheckEndBLock] = useCheckEndBlock()

  useEffect(() => {
    setStakeActionButtonDisabled(!stakeInput)

    setButtonDisabledBecauseOfStakeValue(stakeInput > getBalance())
  }, [stakeInput, balance])

  const tryContribute = useCallback(async () => {
    if (stakeInput < 0.1) {
      setStakeLeastAlert(true)
      return
    } else {
      setStakeLeastAlert(false)
    }

    setTxWaiting(false)
    if (!currentAccount) {
      openWeb3Modal(accountCallbackRef)
      return
    }
    if (!(initialized && chainInfo)) {
      return
    }
    const contributeInputValue = stakeInput || 0

    if (contributeInputValue <= 0) {
      setToast({
        text: 'Invalid value.',
        type: 'error',
      })
      return
    }

    const contributeValue = new Demical(contributeInputValue)
    const tokenDecimals = chainInfo.tokenDecimals.toJSON() || 12
    const txValue = api.createType(
      'BalanceOf',
      new Demical('1' + '0'.repeat(tokenDecimals as number))
        .mul(contributeValue)
        .toString()
    )

    setTxValue(txValue.toHuman())

    const paraId = parseInt(campaign.campaign.parachainId)

    const txs = []
    const referrerInputValue = referrerInput.state.trim()
    if (referrerInputValue) {
      try {
        txs.push(
          createReferrerRemarkTx({
            paraId,
            api,
            referrer: decodeAddress(referrerInputValue),
          })
        )
      } catch (error) {
        console.warn(error)
        setToast({
          text: 'Invalid referrer.',
          type: 'error',
        })
        return
      }
    }

    txs.push(api.tx.crowdloan.contribute(paraId, txValue, null))

    setTx(api.tx.utility.batch(txs))
    confirmModal.setVisible(true)
  }, [
    stakeInput,
    referrerInput.state,
    initialized,
    chainInfo,
    currentAccount,
    campaign.campaign.parachainId,
  ])

  useEffect(() => {
    accountCallbackRef.current = tryContribute
  }, [tryContribute])

  const trySubmitTx = useCallback(() => {
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
          }, 6000)
        } else {
          console.warn(`Current status: ${status.type}`)
        }
      }
    ).catch((error: any) => {
      console.warn(error)
      const text = error.message.includes('1010')
        ? t('insufficientFee')
        : 'Invalid referrer.'
      setTxWaiting(false)
      setToast({
        text,
        type: 'error',
        delay: 6000,
      })
    })
  }, [tx, txWaiting, currentAccount])

  const setMaxStakeNumber = () => setStakeInput(getBalance())

  const getBalance = () => {
    const tokenDecimals = chainInfo?.tokenDecimals?.toJSON() || 12
    const result = new Demical(balance?.toString?.() || '0')
      .div(new Demical('1' + '0'.repeat(tokenDecimals as number)))
      .toNumber()

    return result
  }

  const onCalculatorChange = ({ referrerRewardAmount }) => {
    setReferrerRewardAmount(referrerRewardAmount)
  }

  return (
    <Section
      className="StakeActionSection"
      xs={24}
      md={12}
      lg={8}
      innerStyle={style__StakeActionSection}
    >
      <StakeSuccessModal modalProps={stakeSuccessModal} />
      <InvitorInfoModal modal={invitorInfoDialogModal} />

      <Modal {...confirmModal.bindings} disableBackdropClick={txWaiting}>
        <ModalTitle {...confirmModal.bindings}>{t('PleaseConfirm')}</ModalTitle>
        <Modal.Subtitle></Modal.Subtitle>
        <Fieldset>
          <Fieldset.Content style={{ width: '100%', paddingBottom: 0 }}>
            {locale === 'zh' && (
              <ModalLine>
                您将在 Kusama 插槽拍卖中支持 Khala {txValue}{' '}
                KSM，如果竞拍成功，您的 KSM
                将在租期结束后解锁，如果失败，拍卖结束后立即解锁；
                {referrerInput.state.trim()
                  ? `您的邀请人是 ${referrerInput.state.trim()}；`
                  : null}
                您的 PHA 奖励将在 Khala 赢得一个插槽并成功运行为平行链时释放
                34％
                到您的的地址。剩余的66％将在11个月内线性释放。交易市场动荡不定，您应独自承担本网站上进行的任何交易和非交易活动，本网站信息不代表财务建议。
              </ModalLine>
            )}
            {locale === 'en' && (
              <ModalLine>
                You will contribute {txValue} KSM for Khala in the Kusama Slot
                Auction, If Khala wins, your KSM will be unlocked at the end of
                the lease period, if it fails, it will be unbonded immediately
                after the auction ends;{' '}
                {referrerInput.state.trim()
                  ? `Your referrer is ${referrerInput.state.trim()}; `
                  : null}
                When Khala wins a slot and runs as parachain, 34% of the PHA
                rewards vest to your addresses immediately, with 66% vesting
                monthly over 11 months.Trading markets are volatile and shift
                quickly, you are responsible and liable for any trading and
                non-trading activity on the Site, The information on this
                website does not represent financial advice.
              </ModalLine>
            )}
            {/* <ModalLine>
              您将在Kusama卡槽拍卖中为Khala质押{txValue}直到
              {campaign.meta.estimateEndReleasingIn}。您的PHA奖励将在
              {campaign.meta.estimateFirstReleasingIn}解锁
              {campaign.meta.firstReleasingPercentage}%，之后每隔
              {campaign.meta.estimateReleasingDaysInterval}天解锁
              {campaign.meta.estimateReleasingPercentagePerInterval}%，
            </ModalLine> */}
          </Fieldset.Content>
          <Divider />
          <Fieldset.Content
            style={{ width: '100%', paddingTop: 0, textAlign: 'left' }}
          >
            <Description
              title="Contribution Value"
              content={txValue || '...'}
            />
            <Divider volume={0} />
            <Description
              title="Estimated Fee"
              content={
                txPaymentInfo ? txPaymentInfo.partialFee.toHuman() : '...'
              }
            />
          </Fieldset.Content>
        </Fieldset>
        <ModalActions>
          <NormalButton
            auto
            disabled={txWaiting}
            onClick={
              txWaiting ? undefined : () => confirmModal.setVisible(false)
            }
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

      <StakeActionInputWrapper>
        <div className="wrap">
          <span className="text">{t('enterAnContributeAmount')}</span>
          <span className="balance">
            {t('balance')}: {balance ? balance.toHuman() : '-'}
          </span>
        </div>
        <div className="InputWrap">
          <RcInputNumber
            style={{ width: 'calc(100% - 120px)' }}
            min={0.1}
            max={9999999999}
            placeholder="0"
            value={stakeInput}
            onChange={(value) => {
              return setStakeInput(parseFloat((value || 0).toFixed(8)))
            }}
          />

          <div className="InputPostfix">
            {balance && balance.toString() !== '0' && (
              <span className="Label" onClick={setMaxStakeNumber}>
                {t('max')}
              </span>
            )}

            <span className="Unit">KSM</span>
          </div>
        </div>
      </StakeActionInputWrapper>
      <Calculator
        ksmAmountInput={stakeInput?.toString() || '0'}
        hasReferrer={!!referrerInput.state}
        onChange={onCalculatorChange}
      />
      <StakeActionForm>
        <div className="InviterWrap">
          {t('introducer')}
          <AlertIcon
            onClick={() => invitorInfoDialogModal.setVisible(true)}
            style={{ marginLeft: 3, cursor: 'pointer' }}
            size={16}
          />
          {referrer && <Referrer value={referrer} />}
          {!referrer && (
            <Input
              {...referrerInput.bindings}
              className="InviterInput"
              placeholder={t('fillIntroducer').replace(
                '%d',
                parseFloat(referrerRewardAmount.toFixed(2)).toString()
              )}
            />
          )}
        </div>
        <Button
          disabled={
            stakeActionButtonDisabled ||
            disableStakeButtonByCheckEndBLock ||
            buttonDisabledBecauseOfStakeValue
          }
          effect={false}
          className="ActionBtn"
          onClick={tryContribute}
        >
          {!balance
            ? t('connectWallet')
            : buttonDisabledBecauseOfStakeValue
            ? t('InsufficientBalance')
            : stakeLeastAlert
            ? t('pleaseSupportAtLeast')
            : t('StakeActionSection.ToContribute')}
        </Button>
      </StakeActionForm>
    </Section>
  )
}

export default StakeActionSection
