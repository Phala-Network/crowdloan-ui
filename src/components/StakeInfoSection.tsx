import Section from '@/components/Section'
import { Modal, Spacer, Table, useModal } from '@geist-ui/react'
import ReactECharts from 'echarts-for-react'
import * as React from 'react'
import styled, { css } from 'styled-components'
import { useI18n } from '@/i18n'
import { useMeta } from '@/utils/meta'
import { IntlContext } from 'gatsby-plugin-intl'
import { useWeb3 } from '@/utils/web3'
import { ConnectWallet } from '@/components/ConnectWallet'
import useReleasingData from '@/hooks/useReleasingData'
import { CalculatorContext } from '@/components/StakeActionSection/Calculator'
import AlertIcon from '@/components/AlertIcon'
import InvitorInfoDialog from '@/components/InvitorInfoModal'
import ContributionList from '@/components/ContributionList'
import ModalTitle from '@/components/ModalTitle'

const style__StakeInfoSection = css`
  display: flex;
  flex-flow: column wrap;
`

const Amount = styled.div`
  width: 100%;
  padding: 16px;
  height: 171px;
  background: #222222;
  border-radius: 8px;
  box-sizing: border;

  & .Amounts {
    display: flex;
    padding-bottom: 16px;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.2);

    .Amount {
      width: 50%;
      position: relative;
      padding-left: 8px;

      &.Gr {
        color: #64eeac;
        &::before {
          content: '';
          width: 2px;
          height: 44px;
          left: 0;
          top: 7.5px;
          position: absolute;
          background: #64eeac;
        }
      }

      &.Yg {
        color: #d1ff52;
        &::before {
          content: '';
          width: 2px;
          height: 44px;
          left: 0;
          top: 7.5px;
          position: absolute;
          background: #d1ff52;
        }
      }

      .Title {
        font-size: 12px;
      }

      .Number {
        font-size: 24px;
        line-height: 34px;
        padding: 0;
        margin: 0;
        font-weight: 600;
      }

      .Unit {
        font-size: 12px;
      }
    }
  }
`

const Inviter = styled.div`
  margin-top: 16px;
  width: 100%;

  & .Item {
    display: flex;
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.5);
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  & .Icon {
    margin: 0 6px;
    opacity: 0.5;
    cursor: pointer;
  }

  & .Number {
    flex: 1;
    text-align: right;
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.9);
  }
`

const Detail = styled.div`
  margin-bottom: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  & .Title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 20px;

    a {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.9);
    }
  }

  & .Table {
    margin-top: 4px;

    .link-icon {
      display: inline-block;
      width: 13px;
      height: 9px;
      margin-left: 3px;
      background-image: url(/link-icon.svg);
      background-size: cover;
    }

    thead {
      th {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    tbody {
      tr:last-of-type {
        td:first-of-type {
          border-bottom-left-radius: 5px;
        }
        td:last-of-type {
          border-bottom-right-radius: 5px;
        }
      }
    }

    th {
      background: #222222;
      border: none !important;
      color: rgba(255, 255, 255, 0.9);
      font-size: 12px;
    }

    tr {
      font-size: 12px;
      line-height: 17px;
      background: #1a1a1a;

      &.hover {
        &:hover {
          background: rgba(255, 255, 255, 0.2);

          td {
            color: #fff;
          }
        }
      }

      td {
        color: rgba(255, 255, 255, 0.9);
        border-bottom: none;
      }

      &:nth-child(even) {
        background: #222222;
      }
    }
  }
`

const Chart = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;

  & .title {
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.9);
  }
  & .info {
    margin-top: 3px;
    font-size: 12px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.5);
  }
`

const NoticeCard = styled.div`
  margin-top: 3px;
  min-height: 100px;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  place-content: center;
  text-align: center;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  color: ${(props) => props.theme.wh02};
  background: ${(props) => props.theme.bl04};
  border-radius: 8px;
`

const StakeInfoSection: React.FC = () => {
  const { t } = useI18n()
  const { dayjs, currentContributorQuery } = useMeta()
  const { locale } = React.useContext(IntlContext)
  const { currentAccount } = useWeb3()
  const listModal = useModal()
  const { contributingReward } = React.useContext(CalculatorContext)
  const localData = useReleasingData(contributingReward)
  const invitorInfoDialogModal = useModal()
  const chartOptions = React.useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        textStyle: {
          color: 'white',
        },
      },
      grid: [
        {
          top: '20px',
          left: '0px',
          right: '6px',
          bottom: '30px',
        },
      ],
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
        axisTick: {
          interval: 2,
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'white',
              opacity: 0.1,
              type: 'dashed',
            },
          },
        },
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'white',
              opacity: 0.1,
              type: 'dashed',
            },
          },
        },
      ],
      series: [
        {
          type: 'line',
          showSymbol: true,
          hoverAnimation: false,
          lineStyle: { color: '#d1ff52' },
          itemStyle: {
            normal: {
              color: '#d1ff52',
              borderColor: 'rgba(255, 255, 255, 0.9)',
              borderWidth: 1,
            },
          },
          data: currentContributorQuery?.data?.meta?.simulateReleasingCharts,
        },
        {
          type: 'line',
          showSymbol: true,
          hoverAnimation: false,
          lineStyle: { color: 'rgba(255, 255, 255, 0.9)' },
          itemStyle: {
            normal: {
              color: 'rgba(255, 255, 255, 0.9)',
              borderColor: 'rgba(255, 255, 255, 0.9)',
              borderWidth: 1,
            },
          },
          data: localData,
        },
      ],
    }
  }, [currentContributorQuery?.data?.meta?.simulateReleasingCharts, localData])

  const tableData = React.useMemo(() => {
    if (!currentContributorQuery?.data?.meta?.latestContributions) {
      return null
    }
    const ret = currentContributorQuery?.data?.meta?.latestContributions
    ret.forEach((i) => {
      i.time = dayjs(i.timestamp).locale(locale).format('lll')
      Object.keys(i).forEach((ii) => {
        if (typeof i[ii] === 'number') {
          i[ii] ||= '0'
        } else {
          i[ii] ||= '-'
        }
      })
    })
    return ret
  }, [currentContributorQuery?.data?.meta?.latestContributions])

  const contributorAmount = currentContributorQuery?.data?.contributor?.amount

  return (
    <Section
      className=""
      xs={24}
      md={12}
      lg={8}
      innerStyle={style__StakeInfoSection}
    >
      <InvitorInfoDialog modal={invitorInfoDialogModal} />
      <Amount>
        <div className="Amounts">
          <div className="Amount Gr">
            <span className="Title">{t('yourContribute')}</span>
            <p className="Number">
              {contributorAmount || (currentAccount ? '0' : '-')}{' '}
              <span className="Unit">KSM</span>
            </p>
          </div>
          <div className="Amount Yg">
            <span className="Title">{t('yourTotalReward')}</span>
            <p className="Number">
              {(currentContributorQuery?.data?.contributor?.rewardAmount || 0) +
                currentContributorQuery?.data?.contributor
                  ?.promotionRewardAmount ||
                0 ||
                (currentAccount ? '0' : '-')}{' '}
              <span className="Unit">PHA</span>
            </p>
          </div>
        </div>
        <Inviter>
          {[
            {
              name: t('participantsIntroduced'),
              value: currentContributorQuery?.data?.contributor?.referralsCount,
              after: '',
            },
            {
              name: t('affiliationReward'),
              value: currentContributorQuery?.data?.contributor?.rewardAmount,
              after: 'PHA',
            },
          ].map(({ name, value, after }) => {
            return (
              <div className="Item" key={name}>
                <span className="Text">{name}</span>
                <AlertIcon
                  className="Icon"
                  onClick={() => invitorInfoDialogModal.setVisible(true)}
                />
                <span className="Number">
                  {value || (currentAccount ? '0' : '-')}
                  {after && ` ${after}`}
                </span>
              </div>
            )
          })}
        </Inviter>
      </Amount>

      <Modal {...listModal.bindings}>
        <ModalTitle {...listModal.bindings}>
          {t('contributeDetails')}
        </ModalTitle>
        <Modal.Content>
          <ContributionList />
        </Modal.Content>
      </Modal>

      <Detail>
        <div className="Title">
          <span>{t('contributeDetails')}</span>
          {contributorAmount > 3 && (
            <a onClick={() => listModal.setVisible(true)}>
              <span style={{ marginRight: 5 }}>{t('more')}</span>
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.33325 5L0.333252 10V0L5.33325 5Z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </a>
          )}
        </div>

        {contributorAmount && (
          <Table data={tableData} className="Table">
            <Table.Column prop="time" label={t('time')} />
            <Table.Column prop="amount" label={t('yourContribute')} />
            <Table.Column prop="rewardAmount" label={t('yourReward')} />
          </Table>
        )}

        {!contributorAmount && (
          <NoticeCard>
            <img
              draggable={false}
              src="/detail-placeholder.svg"
              alt="detail-placeholder"
            />
            <Spacer y={0.5}></Spacer>
            {currentAccount && t('noData')}
            {!currentAccount && <ConnectWallet />}
          </NoticeCard>
        )}
      </Detail>

      <Chart>
        <span className="title">{t('rewardVest')}</span>
        <div className="info">{t('rewardVestTip')}</div>
        <ReactECharts
          option={chartOptions}
          style={{
            height: 'auto',
            minHeight: '180px',
            flex: 1,
            width: '100%',
            margin: '0 auto 0',
          }}
        />
      </Chart>
    </Section>
  )
}

export default StakeInfoSection
