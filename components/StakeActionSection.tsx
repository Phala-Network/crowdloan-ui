import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import { Input, Button, Tooltip, useInput } from '@geist-ui/react'
import { ChevronRight } from '@geist-ui/react-icons'
import { useWeb3 } from '@/utils/web3'
import { useBalance } from '@/utils/polkadot/hooks'
import { useCallback } from 'react'
import { usePolkadotApi } from '@/utils/polkadot'
import Demical from 'decimal.js'

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

      // override
      & .KSMRateInput .input-wrapper {
        width: 100px;
        background: rgba(0, 0, 0, 0.2);
        border: none !important;
      }

      & .KSMRateInput input {
        font-size: 25px !important;
        line-height: 39px !important;
        color: rgba(255, 255, 255, 0.9) !important;
        font-weight: 600;
        text-align: right;
      }
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

  // override
  & .PriceInput .input-wrapper {
    width: 60px;
    background: rgba(0, 0, 0, 0.2);
    border: none !important;
    line-height: 24px !important;
  }
  & .PriceInput {
    height: 24px !important;

    span {
      background: rgba(0, 0, 0, 0.2);
      color: rgba(255, 255, 255, 0.9) !important;
      border: none;
      padding: 0 6px;
    }

    & input {
      margin-left: 0;
      font-size: 14px !important;
      line-height: 24px !important;
      color: rgba(255, 255, 255, 0.9) !important;
      font-weight: 600;
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

  & .alert-circle {
    display: inline-block;
    width: 14px;
    height: 14px;
    background-image: url('/alert.svg');
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

  // override
  & .InviterInput .input-wrapper {
    width: 260px;
    background: rgba(0, 0, 0, 0.2);
    border: none !important;
    line-height: 40px !important;
  }
  & .InviterInput {
    height: 40px !important;

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
  }
`

const StakeActionSection: React.FC = () => {
  const { currentAccount, currentInjector } = useWeb3()
  const { api, initialized, chainInfo } = usePolkadotApi()
  const balance = useBalance(currentAccount?.address)

  const stakeInput = useInput('')

  const tryContribute = useCallback(() => {
    if (!(initialized && chainInfo)) {
      return
    }

    const input = new Demical(parseFloat(stakeInput.state) || 0)
    const tokenDecimals = chainInfo.tokenDecimals.toJSON() || 12
    const txValue = new Demical('1' + '0'.repeat(tokenDecimals as number))
      .mul(input)
      .toString()
    const tx = api.tx.crowdloan.contribute(3000, txValue, null)
    tx.signAndSend(
      currentAccount.address,
      { signer: currentInjector.signer },
      ({ status }) => {
        if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`)
        } else {
          console.log(`Current status: ${status.type}`)
        }
      }
    ).catch((error: any) => {
      console.log(':( transaction failed', error)
    })
  }, [
    stakeInput.state,
    initialized,
    chainInfo,
    currentAccount,
    currentInjector,
  ])

  return (
    <Section
      className="StakeActionSection"
      xs={24}
      md={12}
      lg={8}
      innerStyle={style__StakeActionSection}
    >
      <StakeActionInputWrapper>
        <div className="wrap">
          <span className="text">输入质押量</span>
          <span className="balance">
            余额: {balance ? balance.toHuman() : '...'}
          </span>
        </div>
        <div className="InputWrap">
          <Input
            className="Input"
            type="number"
            placeholder="0"
            {...stakeInput.bindings}
          />
          <div className="InputPostfix">
            <span className="Label">最大</span>
            <span className="Unit">KSM</span>
          </div>
        </div>
      </StakeActionInputWrapper>
      <StakeActionInfoWrapper>
        <div className="Title">
          计算
          <Tooltip
            text={
              <div>
                可获得的PHA：预估可获得的奖励
                <br />
                PHA价格、KSM年化、KSM价格：默认当前市场数据，可编辑
                <br />
                为PHA质押的收益=可获得的PHA*PHA价格
                <br />
                KSM抵押收益：质押的KSM*KSM价格
                <br />
                额外收益=质押收益-抵押收益
                <br />
                预估收益、质押收益、额外收益中的最大值是按照当前质押量计算，最小值是按质押硬顶计算
                <br />
                <a>
                  查看更多详情
                  <span>
                    <ChevronRight size={16} />
                  </span>
                </a>
              </div>
            }
            type="dark"
            placement="bottomStart"
            hideArrow={true}
            offset={4}
            portalClassName="TooltipText"
          >
            <i className="alert-circle" />
          </Tooltip>
        </div>
        <div className="Calculator">
          <div className="left">
            <div className="Rate">Phala质押年化</div>
            <div className="RateNum">21%</div>
            <div className="Price">PHA价格</div>
            <Input label="$" className="PriceInput" />
            <div className="Price">为PHA质押奖励</div>
            <div className="Amount">13,374PHA</div>
            <div className="Price">为Phala质押收益</div>
            <div className="Amount">$ 5,345.00</div>
          </div>
          <div className="center">VS</div>
          <div className="right">
            <div className="Rate">KSM质押年化</div>
            <Input className="KSMRateInput" />
            <div className="Price">KSM价格</div>
            <Input label="$" className="PriceInput" />
            <div className="Price">KSM抵押奖励</div>
            <div className="Amount">13,374PHA</div>
            <div className="Price">
              KSM抵押收益 <i className="alert-circle" />
            </div>
            <div className="Amount">$ 5,345.00</div>
          </div>
        </div>

        <div className="Extra">
          <span className="ExtraTitle">为PHA质押的额外收益</span>
          <span className="ExtraAmount">最高$ 3,000.00</span>
        </div>
      </StakeActionInfoWrapper>
      <StakeActionForm>
        <div className="InviterWrap">
          邀请人
          <Input
            className="InviterInput"
            placeholder="填写邀请人获得PHA奖励(选填)"
          />
        </div>
        <Button className="ActionBtn" onClick={tryContribute}>
          质押
        </Button>
      </StakeActionForm>
    </Section>
  )
}

export default StakeActionSection
