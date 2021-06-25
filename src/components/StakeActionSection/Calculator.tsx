import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import styled from 'styled-components'
import { useI18n } from '@/i18n'
import { useMeta } from '@/utils/meta'
import TextTooltip from '@/components/TextTooltip'
import InputNumber from '@/components/InputNumber'
import NumberDisplay from '@/components/NumberDisplay'
import useSoftTop from '../../hooks/useSoftTop'
import gtag from '../../utils/gtag'
import toFixed from '../../utils/toFixed'
import useReachingActivityGoal from '../../hooks/useReachingActivityGoal'

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
    display: flex;
    align-items: center;
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
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  line-height: 20px;
`

export const CalculatorContext = createContext(null)

const Calculator: React.FC<{
  ksmAmountInput: string
  hasReferrer: boolean
  onChange: ({ referrerRewardAmount: number }) => void
}> = ({ ksmAmountInput, hasReferrer, onChange }) => {
  const { t } = useI18n()
  const { price, campaignQuery, dayjs } = useMeta()
  const { setContributingReward, setHasReferrer } =
    useContext(CalculatorContext)
  const { isSoftTop } = useSoftTop()
  const ReachingActivityGoal = useReachingActivityGoal()
  const shouldShowCalculator = !isSoftTop

  // just for external display
  const [referrerRewardAmount, setReferrerRewardAmount] = useState(0)

  useEffect(() => {
    onChange({ referrerRewardAmount })
  }, [referrerRewardAmount])

  useEffect(() => {
    setHasReferrer(hasReferrer)
  }, [hasReferrer])

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
    if (!ksmAmount) return

    const normalRewardAmount = ksmAmount * 100
    const referrerRewardAmount = hasReferrer ? ksmAmount * 0.5 : 0

    return parseFloat((normalRewardAmount + referrerRewardAmount).toFixed(9))
  }, [ksmAmount, hasReferrer])

  useEffect(() => {
    if (ksmAmount) setReferrerRewardAmount(ksmAmount * 0.5)
  }, [ksmAmount])

  useEffect(() => {
    if (contributingReward) setContributingReward(contributingReward)
  }, [setContributingReward, contributingReward])

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
    if (!(phaPrice && ksmPrice)) {
      return
    }

    const base = ReachingActivityGoal
      ? hasReferrer
        ? 150.75
        : 150
      : hasReferrer
      ? 120.6
      : 120

    // 365 * ( PHA币价 * 100.5) / KSM价格 / 48 * 7
    const apy = (365 * phaPrice * base) / ksmPrice / (48 * 7)

    // %
    return toFixed(apy * 100, 2)
  }, [phaPrice, ksmPrice])

  const moreIncome = useMemo(
    () => contributingIncome - stakingIncome,
    [contributingIncome, stakingIncome]
  )

  return shouldShowCalculator ? (
    <StakeActionInfoWrapper>
      <div className="Title">
        <div>{t('calculate')}</div>
        <TextTooltip
          onVisibleChange={(visible: boolean) => {
            if (visible) {
              gtag('hover', {
                position: 'calculate',
                type: 'Calculate Icon',
              })
            }
          }}
          style={{ marginLeft: 5 }}
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
          <div className="RateNum">
            <NumberDisplay value={currentPhaApy} /> %
          </div>
          <div className="Price">{t('phaPrice')}</div>
          <InputNumber
            before={'$'}
            min={0.000001}
            max={99999}
            value={phaPriceInput}
            onChange={setPhaPriceInput}
          />
          <div className="Price">{t('contributingReward')}</div>
          <div className="Amount">
            <NumberDisplay value={contributingReward} /> PHA
          </div>
          <div className="Price">{t('contributingIncome')}</div>
          <div className="Amount">
            $ <NumberDisplay value={contributingIncome} />
          </div>
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
          <div className="Amount">
            <NumberDisplay value={stakingReward} /> KSM
          </div>
          <div className="Price">{t('stakingIncome')}</div>
          <div className="Amount">
            $ <NumberDisplay value={stakingIncome} />
          </div>
        </div>
      </div>

      <div className="Extra">
        <span className="ExtraTitle">{t('moreIncome')}</span>
        <span className="ExtraAmount">
          $ <NumberDisplay value={moreIncome} />
        </span>
      </div>
    </StakeActionInfoWrapper>
  ) : (
    <NoMoreReward>
      <img
        draggable={false}
        src="/calculator-placeholder.svg"
        alt="calculator-placeholder"
      />
      <p>{t('noMoreReward')}</p>
    </NoMoreReward>
  )
}

export default Calculator
