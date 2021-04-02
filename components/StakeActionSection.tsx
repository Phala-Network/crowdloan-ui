import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import { Input, Button } from '@geist-ui/react'

const style__StakeActionSection = css`
  background: linear-gradient(
      106.53deg,
      rgba(209, 255, 82, 0.2) 0%,
      rgba(100, 238, 172, 0.2) 100%
    ),
    #222222;
  display: flex;
  flex-direction: column;
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
      }
    }
  }

  & .Title {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 12px;
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
  }
`

const StakeActionSection: React.FC = () => (
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
        <span className="balance">余额: 123.1231239</span>
      </div>
      <div className="InputWrap">
        <Input className="Input" />
        <div className="InputPostfix">
          <span className="Label">最大</span>
          <span className="Unit">KSM</span>
        </div>
      </div>
    </StakeActionInputWrapper>
    <StakeActionInfoWrapper>
      <div className="Title">计算</div>
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
          <div className="Price">KSM抵押收益</div>
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
      <Button className="ActionBtn">质押</Button>
    </StakeActionForm>
  </Section>
)

export default StakeActionSection
