import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useI18n } from '@/i18n'
import { useMeta } from '@/utils/meta'
import TextTooltip from '@/components/TextTooltip'
import InputNumber from '@/components/InputNumber'
import { Smile } from '@geist-ui/react-icons'

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
  const contributionChart = campaignQuery?.data?.meta?.contributionChart

  const auctionAmount = useMemo(() => {
    return contributionChart
      ? contributionChart[contributionChart.length - 1][1]
      : 0
  }, [contributionChart])

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

export default Calculator