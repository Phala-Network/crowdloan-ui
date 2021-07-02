import React, { useRef, useCallback, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import { Input, Button, useInput, useToasts, useModal } from '@geist-ui/react'
import { useWeb3 } from '@/utils/web3'
import { useBalance } from '@/utils/polkadot/hooks'
import { usePolkadotApi } from '@/utils/polkadot'
import Decimal from 'decimal.js'
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
import getReferralAddressFromURL from '@/utils/getReferralAddressFromURL'
import * as Sentry from '@sentry/browser'
import ConfirmModal from './ConfirmModal'
import gtag from '../../utils/gtag'
import sliceAddress from '../../utils/sliceAddress'
import { BalanceOf } from '@polkadot/types/interfaces'
import { SubmittableExtrinsic } from '@polkadot/api/types'
import { ISubmittableResult } from '@polkadot/types/types'

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
    padding: 0px 12px;
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

  & .InputPostfix {
    display: flex;
    align-items: center;

    .Label {
      width: 40px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      background: rgba(255, 255, 255, 0.2);
      color: #03ffff;
      border-radius: 4px;
      margin: 0px 8px;
      font-size: 12px;
      cursor: pointer;
      display: inline-block;
    }

    .Unit {
      margin-right: 2px;
      font-weight: 600;
      font-size: 28px;
      color: rgba(255, 255, 255, 0.9);
      display: inline-block;
    }
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

const StakeActionSection: React.FC = () => {
  const MIN = 0.01
  const { t } = useI18n()
  const { currentAccount, openModal: openWeb3Modal } = useWeb3()
  const { api, initialized, chainInfo } = usePolkadotApi()
  const balance = useBalance(currentAccount?.address)
  const invitorInfoDialogModal = useModal()

  const {
    currentContributorQuery,
    campaignQuery: { data: campaign },
  } = useMeta()

  const referrer = currentContributorQuery?.data?.contributor?.referrer
  const maxStakingNumber = campaign?.campaign?.raisedAmount
    ? 150000 - campaign.campaign.raisedAmount
    : 150000
  const [, setToast] = useToasts()
  const confirmModal = useModal()
  const stakeSuccessModal = useModal()
  const [stakeInput, setStakeInput] = useState(10)
  const referrerInput = useInput('')
  const [referrerRewardAmount, setReferrerRewardAmount] = useState(0)
  const [
    buttonDisabledBecauseOfStakeValue,
    setButtonDisabledBecauseOfStakeValue,
  ] = useState(false)
  const [
    buttonDisabledBecauseOfCantInviteSelf,
    setbuttonDisabledBecauseOfCantInviteSelf,
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

  const [txWaiting, setTxWaiting] = useState(false)
  const [txValue, setTxValue] = useState<BalanceOf>(null)
  const [tx, setTx] =
    useState<SubmittableExtrinsic<'promise', ISubmittableResult>>(null)
  const [stakeLeastAlert, setStakeLeastAlert] = useState(false)
  const [stakeActionButtonDisabled, setStakeActionButtonDisabled] =
    useState(false)
  const [disableStakeButtonByCheckEndBLock] = useCheckEndBlock()

  useEffect(() => {
    setStakeActionButtonDisabled(!stakeInput)
    setButtonDisabledBecauseOfStakeValue(stakeInput > getBalance())

    if (stakeInput > maxStakingNumber) {
      setStakeInput(maxStakingNumber)
    }
  }, [stakeInput, balance])

  useEffect(() => {
    setbuttonDisabledBecauseOfCantInviteSelf(
      currentAccount?.address === referrerInput?.state
    )
  }, [currentAccount?.address, referrerInput?.state])

  const tryContribute = useCallback(async () => {
    if (stakeInput < MIN) {
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

    const contributeValue = new Decimal(contributeInputValue)
    const tokenDecimals = chainInfo.tokenDecimals.toJSON() || 12
    const txValue = api.createType(
      'BalanceOf',
      new Decimal('1' + '0'.repeat(tokenDecimals as number))
        .mul(contributeValue.minus(0.00005))
        .toString()
    )

    setTxValue(txValue)

    const paraId = parseInt(campaign.campaign.parachainId)

    const txs = []
    const referrerInputValue = referrerInput.state.trim()
    if (referrerInputValue && !referrer) {
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
        Sentry.captureException(error)
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

  const setMaxStakeNumber = () => setStakeInput(getBalance())
  const getBalance = () => {
    const tokenDecimals = chainInfo?.tokenDecimals?.toJSON() || 12
    const result = new Decimal(balance?.toString?.() || '0')
      .div(new Decimal('1' + '0'.repeat(tokenDecimals as number)))
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

      <ConfirmModal
        tx={tx}
        txWaiting={txWaiting}
        txValue={txValue}
        referrerInput={referrerInput}
        confirmModal={confirmModal}
        stakeSuccessModal={stakeSuccessModal}
        setTxWaiting={setTxWaiting}
      />

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
            min={MIN}
            max={maxStakingNumber}
            placeholder="0"
            value={stakeInput}
            onChange={(value) => {
              return setStakeInput(parseFloat((value || 0).toFixed(10)))
            }}
            onClick={() => {
              gtag('click', {
                position: 'stake action section',
                type: 'Staking Input',
              })
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
          {referrer && <Referrer value={sliceAddress(referrer)} />}
          {!referrer && (
            <Input
              {...referrerInput.bindings}
              className="InviterInput"
              placeholder={t('fillIntroducer').replace(
                '%d',
                parseFloat(referrerRewardAmount.toFixed(2)).toString()
              )}
              onClick={() => {
                gtag('click', {
                  position: 'stake action section',
                  type: 'Inviter Input',
                })
              }}
            />
          )}
        </div>
        {balance && (
          <Button
            disabled={
              stakeActionButtonDisabled ||
              disableStakeButtonByCheckEndBLock ||
              buttonDisabledBecauseOfStakeValue
            }
            effect={false}
            className="ActionBtn"
            onClick={() => {
              gtag('click', {
                position: 'stake action section',
                type: 'Stake Action Button',
              })
              tryContribute()
            }}
          >
            {buttonDisabledBecauseOfCantInviteSelf
              ? t('notAllowBindYourself')
              : buttonDisabledBecauseOfStakeValue
              ? t('InsufficientBalance')
              : stakeLeastAlert
              ? t('pleaseSupportAtLeast')
              : t('StakeActionSection.ToContribute')}
          </Button>
        )}
        {!balance && (
          <Button
            effect={false}
            className="ActionBtn"
            onClick={() => {
              openWeb3Modal()
              gtag('click', {
                position: 'stake action section',
                type: 'Connect Wallet',
              })
            }}
          >
            {t('connectWallet')}
          </Button>
        )}
      </StakeActionForm>
    </Section>
  )
}

export default StakeActionSection
