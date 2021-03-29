import styled, { css } from "styled-components"
import Section from '@/components/Section'

const style__StakeActionSection = css`
  background: linear-gradient(106.53deg, rgba(209, 255, 82, 0.2) 0%, rgba(100, 238, 172, 0.2) 100%), #222222;
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
    & > .center {
      content: 'VS';
      height: 38px;
      display: block;
      width: 38px;
      height: 38px;
      background: ${props => props.theme.yg01};
      box-shadow: 0 0 0 3px ${props => props.theme.wh03};
      font-weight: 600;
      font-size: 16px;
      line-height: 38px;
      text-align: center;
      border-radius: 19px;
      color: ${props => props.theme.bl02};
      flex: none;
    }
    & > .left, & > .right {
      height: 100px;
      width: auto;
      flex: 1;
    }
  }
`

const StakeActionSection: React.FC = () => <Section className="StakeActionSection" xs={24} md={12} lg={8} innerStyle={style__StakeActionSection}>
  Stake Action
  <StakeActionInfoWrapper>
    <div className="Calculator">
      <div className="left">1</div>
      <div className="center">VS</div>
      <div className="right">2</div>
    </div>

    1234
  </StakeActionInfoWrapper>
</Section>

export default StakeActionSection
