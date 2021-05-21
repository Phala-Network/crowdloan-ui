import React, { useMemo, useRef } from 'react'
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
} from '@geist-ui/react'
import { useWeb3 } from '@/utils/web3'
import { useBalance } from '@/utils/polkadot/hooks'
import { useCallback, useEffect, useState } from 'react'
import { usePolkadotApi } from '@/utils/polkadot'
import Demical from 'decimal.js'
import { useI18n } from '@/i18n'
import { decodeAddress } from '@polkadot/util-crypto'
import { useMeta } from '@/utils/meta'
import { Smile } from '@geist-ui/react-icons'
import InputNumber from '@/components/InputNumber'
import RcInputNumber from 'rc-input-number'
import TextTooltip from '@/components/TextTooltip'
import AlertIcon from '@/components/AlertIcon'
import StakeSuccessModal from '@/components/StakeSuccessModal'
import queryString from 'query-string'
import { useQuery } from 'react-query'
import { GetCampaignResponse } from '@/utils/request/types'
import { VoidFn } from '@polkadot/api/types'

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
      rgba(209, 255, 82, 0.2) 0%,
      rgba(100, 238, 172, 0.2) 100%
    ),
    #222222;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StakeActionInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;

  & > .Calculator {
    background-image: url('/action_bg.svg');
    justify-content: space-between;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    align-items: center;
    padding: 21px 16px;
    & > .center {
      content: 'VS';
      height: 38px;
      display: block;
      width: 38px;
      height: 38px;
      background: ${(props) => props.theme.yg01};
      box-shadow: 0 0 0 3px ${(props) => props.theme.wh03};
      font-weight: 600;
      font-size: 16px;
      line-height: 38px;
      text-align: center;
      border-radius: 19px;
      color: ${(props) => props.theme.bl02};
      flex: none;
    }
    & > .left,
    & > .right {
      width: auto;
      flex: 1;
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      place-content: flex-start;
    }
    & > .right {
      text-align: right;
      align-items: flex-end;
    }

    & .right {
      display: flex;
      flex-direction: column;
      text-align: right;
    }
  }

  & .Title {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 12px;
    line-height: 16px;
    .tooltip {
      margin-left: 5px;
      vertical-align: middle;
    }
  }

  & .Rate {
    font-size: 12px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
  }

  & .RateNum {
    font-size: 25px;
    line-height: 39px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
  }

  & .Price {
    font-size: 12px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 12px;
    i {
      vertical-align: sub;
    }
  }

  & .Amount {
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.9);
  }

  & .Extra {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    & > .ExtraTitle {
      font-size: 16px;
      line-height: 22px;
      color: rgba(255, 255, 255, 0.9);
    }

    & > .ExtraAmount {
      font-weight: 600;
      font-size: 16px;
      line-height: 22px;
      text-align: right;
      color: rgba(255, 255, 255, 0.9);
    }
  }
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
    line-height: 17px;
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
      box-shadow: inset 0px 0px 0px 1px rgba(209, 255, 82, 0.5);
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
    caret-color: #d1ff52;
  }

  & .Label {
    width: 40px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    right: 72px;
    top: 8.5px;
    background: rgba(255, 255, 255, 0.2);
    color: #d1ff52;
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
    background: #d1ff52;
    border-radius: 8px;
    font-size: 20px;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.9);
    border: none;
    width: 100%;
    margin-top: 20px;
    &:focus {
      background: #d1ff52;
    }
    &:hover {
      background: rgba(209, 255, 82, 0.8);
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

const NoMoreReward = styled.div`
  & p {
    text-align: center;
  }
`

const Calculator: React.FC<{
  ksmAmountInput: string
  hasReferrer: boolean
}> = ({ ksmAmountInput, hasReferrer }) => {
  const { t } = useI18n()

  const { price, campaignQuery, dayjs } = useMeta()

  const auctionAmount = useMemo(() => {
    return campaignQuery.data?.meta?.contributionChart
      ? campaignQuery.data.meta.contributionChart[
          campaignQuery.data.meta.contributionChart.length - 1
        ][1]
      : 0
  }, [campaignQuery.data?.meta?.contributionChart])

  const shouldShowCalculator = useMemo(() => {
    return campaignQuery.data?.campaign?.cap > auctionAmount
  }, [campaignQuery.data?.campaign?.cap, auctionAmount])

  const timeDelta = useMemo(() => {
    const endDate = campaignQuery?.data?.meta?.estimateEndReleasingIn
    if (!endDate) {
      return 0
    }
    return dayjs(endDate).diff(dayjs(), 'day')
  }, [campaignQuery?.data?.meta?.estimateEndReleasingIn])

  const [phaPriceInput, setPhaPriceInput] = useState(null)
  const [ksmPriceInput, setKsmPriceInput] = useState(null)
  const [ksmApyInput, setKsmApyInput] = useState(null)

  const currentPhaPrice = price?.phaQuery?.data?.price
  const currentKsmPrice = price?.ksmQuery?.data?.price
  const currentKsmApy = price?.ksmQuery?.data?.stakeApr

  useEffect(() => {
    if (!phaPriceInput && currentPhaPrice) {
      setPhaPriceInput(parseFloat(currentPhaPrice.toFixed(2)))
    }
  }, [currentPhaPrice])
  useEffect(() => {
    if (!ksmPriceInput && currentKsmPrice) {
      setKsmPriceInput(parseFloat(currentKsmPrice.toFixed(2)))
    }
  }, [currentKsmPrice])
  useEffect(() => {
    if (!ksmApyInput && currentKsmApy) {
      setKsmApyInput(currentKsmApy)
    }
  }, [currentKsmApy])

  const ksmAmount = useMemo(() => {
    const ret = parseFloat(ksmAmountInput)
    return ret < 0 ? 0 : ret
  }, [ksmAmountInput])
  const phaPrice = useMemo(() => {
    return phaPriceInput < 0 ? 0 : phaPriceInput
  }, [phaPriceInput])
  const ksmPrice = useMemo(() => {
    return ksmPriceInput < 0 ? 0 : ksmPriceInput
  }, [ksmPriceInput])
  const ksmApy = useMemo(() => {
    return ksmApyInput < 0 ? 0 : ksmApyInput / 100
  }, [ksmApyInput])

  const contributingReward = useMemo(() => {
    if (!ksmAmount) {
      return
    }
    return parseFloat((ksmAmount * (hasReferrer ? 100.5 : 100)).toFixed(9))
  }, [ksmAmount, hasReferrer])
  const contributingIncome = useMemo(() => {
    if (!(typeof contributingReward === 'number' && phaPrice)) {
      return
    }
    return parseFloat((contributingReward * phaPrice).toFixed(9))
  }, [contributingReward, phaPrice])

  const stakingReward = useMemo(() => {
    if (!(ksmAmount && ksmApy && timeDelta)) {
      return
    }
    return parseFloat(((ksmAmount * ksmApy * timeDelta) / 365).toFixed(9))
  }, [ksmAmount, ksmApy, timeDelta])
  const stakingIncome = useMemo(() => {
    if (!(stakingReward && ksmPrice)) {
      return
    }
    return parseFloat((stakingReward * ksmPrice).toFixed(9))
  }, [stakingReward, ksmPrice])

  const currentPhaApy = useMemo(() => {
    if (!(phaPrice && ksmPrice && timeDelta)) {
      return
    }
    return parseFloat(
      (
        ((phaPrice * 365 * (hasReferrer ? 100.5 : 100)) /
          (ksmPrice * timeDelta)) *
        100
      ).toFixed(2)
    )
  }, [phaPrice, ksmPrice, timeDelta])

  const moreIncome = useMemo(
    () => contributingIncome - stakingIncome,
    [contributingIncome, stakingIncome]
  )

  return shouldShowCalculator ? (
    <StakeActionInfoWrapper>
      <div className="Title">
        {t('calculate')}
        <TextTooltip
          text={[
            t('calculatePopInfo1'),
            t('calculatePopInfo2'),
            t('calculatePopInfo3'),
            t('calculatePopInfo4'),
            t('calculatePopInfo5'),
            t('calculatePopInfo6'),
          ]}
        />
      </div>
      <div className="Calculator">
        <div className="left">
          <div className="Rate">{t('phalaStakeAPY')}</div>
          <div className="RateNum">{currentPhaApy || '-'} %</div>
          <div className="Price">{t('phaPrice')}</div>
          <InputNumber
            before={'$'}
            min={0.000001}
            max={99999}
            value={phaPriceInput}
            onChange={setPhaPriceInput}
          />
          <div className="Price">{t('contributingReward')}</div>
          <div className="Amount">{contributingReward || '-'} PHA</div>
          <div className="Price">{t('contributingIncome')}</div>
          <div className="Amount">$ {contributingIncome || '-'}</div>
        </div>
        <div className="center">VS</div>
        <div className="right">
          <div className="Rate">{t('KSMAPY')}</div>
          <InputNumber
            width={90}
            min={0.000001}
            max={99999}
            inputSize="big"
            after={'%'}
            textAlign="right"
            value={ksmApyInput}
            onChange={setKsmApyInput}
          />
          <div className="Price">{t('KSMPrice')}</div>
          <InputNumber
            before={'$'}
            min={0.000001}
            max={99999}
            value={ksmPriceInput}
            onChange={setKsmPriceInput}
          />
          <div className="Price">{t('stakingReward')}</div>
          <div className="Amount">{stakingReward || '-'} KSM</div>
          <div className="Price">{t('stakingIncome')}</div>
          <div className="Amount">$ {stakingIncome || '-'}</div>
        </div>
      </div>

      <div className="Extra">
        <span className="ExtraTitle">{t('moreIncome')}</span>
        <span className="ExtraAmount">$ {moreIncome || '-'}</span>
      </div>
    </StakeActionInfoWrapper>
  ) : (
    <NoMoreReward>
      <p>
        <Smile size={48} />
      </p>
      <p>{t('noMoreReward')}</p>
    </NoMoreReward>
  )
}

const StakeActionSection: React.FC = () => {
  const { t } = useI18n()
  const {
    currentAccount,
    currentInjector,
    openModal: openWeb3Modal,
  } = useWeb3()
  const { campaignId } = useMeta()
  const { api, initialized, chainInfo } = usePolkadotApi()
  const balance = useBalance(currentAccount?.address)
  const { data: campaignData, isLoading: getCampaignIsLoading } =
    useQuery<GetCampaignResponse>(['getCampaign', { campaignId }])

  const {
    refetch,
    currentContributorQuery,
    campaignQuery: { data: campaign },
  } = useMeta()

  const [, setToast] = useToasts()
  const confirmModal = useModal()
  const stakeSuccessModal = useModal()
  const [stakeInput, setStakeInput] = useState(10)

  const referrerInput = useInput('')

  const accountCallbackRef = useRef(null)

  useEffect(() => {
    if (currentContributorQuery?.data?.contributor?.amount) {
      referrerInput.reset()
    } else {
      const { invitor } = queryString.parse(location.search)

      if (invitor) {
        referrerInput.setState(invitor as string)
      }
    }
  }, [currentContributorQuery?.data?.contributor?.amount])

  const [tx, setTx] = useState(null)
  const [txPaymenInfo, setTxPaymentInfo] = useState(null)
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

  useEffect(() => {
    setStakeActionButtonDisabled(!stakeInput)
  }, [stakeInput])

  useEffect(() => {
    if (!initialized || getCampaignIsLoading) return
    if (!campaignData?.campaign?.endBlock) return

    let unsubscribe: VoidFn

    api.rpc.chain
      .subscribeNewHeads((header) => {
        if (header.number.toNumber() > campaignData.campaign.endBlock) {
          // disable stake button
          setStakeActionButtonDisabled(true)
        }
      })
      .then((_unsubscribe) => (unsubscribe = _unsubscribe))

    return () => {
      unsubscribe?.()
    }
  }, [initialized, api, campaignData, getCampaignIsLoading])

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
    if (referrerInput.state.trim()) {
      try {
        const referrerInputValue = decodeAddress(referrerInput.state.trim())
        txs.push(
          createReferrerRemarkTx({
            paraId,
            api,
            referrer: referrerInputValue,
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
      setTxWaiting(false)
      setToast({ text: error.toString(), type: 'error', delay: 5000 }) // todo
    })
  }, [tx, txWaiting, currentAccount])

  return (
    <Section
      className="StakeActionSection"
      xs={24}
      md={12}
      lg={8}
      innerStyle={style__StakeActionSection}
    >
      <StakeSuccessModal modalProps={{ ...stakeSuccessModal.bindings }} />

      <Modal {...confirmModal.bindings} disableBackdropClick={txWaiting}>
        <Modal.Title>{t('transactionConfirmationTitle')}</Modal.Title>
        <Modal.Subtitle></Modal.Subtitle>
        <Fieldset>
          <Fieldset.Content style={{ width: '100%', paddingBottom: 0 }}>
            <ModalLine>
              在阁下申请与我们开始交易之前，必须小心地考虑以阁下的情况以及财务处境，使用差价合约是否适合。
            </ModalLine>
            <ModalLine>
              您将在Kusama卡槽拍卖中为Khala质押{txValue}直到
              {campaign.meta.estimateEndReleasingIn}。您的PHA奖励将在
              {campaign.meta.estimateFirstReleasingIn}解锁
              {campaign.meta.firstReleasingPercentage}%，之后每隔
              {campaign.meta.estimateReleasingDaysInterval}天解锁
              {campaign.meta.estimateReleasingPercentagePerInterval}%，
              届时您可以通过您的KSM地址领取奖励，详情请关注本页面或Phala社区。
            </ModalLine>
          </Fieldset.Content>
          <Divider />
          <Fieldset.Content
            style={{ width: '100%', paddingTop: 0, textAlign: 'left' }}
          >
            {referrerInput.state.trim() ? (
              <Description
                title="Referrer"
                content={referrerInput.state.trim()}
              />
            ) : null}
            <Divider volume={0} />
            <Description
              title="Contribution Value"
              content={txValue || '...'}
            />
            <Divider volume={0} />
            <Description
              title="Estimated Fee"
              content={txPaymenInfo ? txPaymenInfo.partialFee.toHuman() : '...'}
            />
          </Fieldset.Content>
        </Fieldset>
        <Modal.Action
          passive
          disabled={txWaiting}
          onClick={txWaiting ? undefined : () => confirmModal.setVisible(false)}
        >
          {t('cancel')}
        </Modal.Action>
        <Modal.Action
          loading={txWaiting}
          disabled={txWaiting}
          onClick={txWaiting ? undefined : trySubmitTx}
        >
          {t('ok')}
        </Modal.Action>
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
            min={0.000001}
            max={999999999}
            style={{ width: 'calc(100% - 120px)' }}
            placeholder="0"
            value={stakeInput}
            onChange={(value) => setStakeInput(value)}
          />
          <div className="InputPostfix">
            {balance && (
              <span
                className="Label"
                // onClick={() => setStakeInput(parseFloat(balance.toHuman()))}
              >
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
      />
      <StakeActionForm>
        <div className="InviterWrap">
          {t('introducer')}
          <AlertIcon style={{ marginLeft: 3 }} size={16} />
          <Input
            {...referrerInput.bindings}
            disabled={!!currentContributorQuery?.data?.contributor?.amount}
            className="InviterInput"
            placeholder={t('fillIntroducer')}
          />
        </div>
        <Button
          disabled={stakeActionButtonDisabled}
          effect={false}
          className="ActionBtn"
          onClick={tryContribute}
        >
          {stakeLeastAlert
            ? t('pleaseSupportAtLeast')
            : balance
            ? t('stake')
            : t('connectWallet')}
        </Button>
      </StakeActionForm>
    </Section>
  )
}

export default StakeActionSection
