import Section from '@/components/Section'
import { Table } from '@geist-ui/react'
import ReactECharts from 'echarts-for-react'
import * as React from 'react'
import styled, { css } from 'styled-components'
import { useI18n } from '@/i18n'
import { useMeta } from '@/utils/meta'

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
    margin-bottom: 8px;
  }

  & .Number {
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.9);
  }
`

const Detail = styled.div`
  margin-bottom: 20px;

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

const StakeInfoSection: React.FC = () => {
  const { t } = useI18n()
  const { currentContributorQuery } = useMeta()
  console.log(currentContributorQuery?.data)
  // const [address] = React.useState<string | null>(
  //   '51gcyDD5ryWMeH6SFEArATWv9y49UAUsZQRWHBwnke3KUdTN'
  // )

  // const { data: queryData } = useQuery(['getSchedule', { address }], {
  //   refetchInterval: 60 * 1000,
  // })

  // const chartData = React.useMemo(
  //   () =>
  //     (queryData as GetScheduleResponse)?.points?.map((point) => [
  //       point.timestamp * 1000,
  //       point.value,
  //     ]) ?? [],
  //   [queryData]
  // )

  // const tableData = [
  //   { property: '2021.4.5 12:59', description: '300.00KSM', type: '100.00PHA' },
  //   { property: '2021.4.5 12:59', description: '300.00KSM', type: '100.00PHA' },
  //   { property: '2021.4.5 12:59', description: '300.00KSM', type: '100.00PHA' },
  // ]
  // const icon = (_: any, rowData: any) => {
  //   return (
  //     <span>
  //       {rowData.rowValue.description}
  //       <i className="link-icon"></i>
  //     </span>
  //   )
  // }
  // tableData.forEach((i) => (i['descriptionIcon'] = icon))

  // const rewardChartElement = React.useRef<HTMLDivElement>()
  // const rewardChart = React.useRef<ECharts>()

  const chartOptions = React.useMemo(() => {
    return Object.assign(
      {},
      {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0]
            const date = new Date(params.name)
            return (
              date.getDate() +
              '/' +
              (date.getMonth() + 1) +
              '/' +
              date.getFullYear() +
              ' : ' +
              params.value[1]
            )
          },
          axisPointer: {
            animation: false,
          },
        },
        grid: [
          {
            top: '20px',
            left: '30px',
            right: '24px',
            bottom: '30px',
          },
        ],
        xAxis: {
          type: 'time',
          boundaryGap: [0, 0],
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
        yAxis: {
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
            data: [],
          },
        ],
      }
    )
  }, [[]])

  return (
    <Section
      className=""
      xs={24}
      md={12}
      lg={8}
      innerStyle={style__StakeInfoSection}
    >
      <Amount>
        <div className="Amounts">
          <div className="Amount Gr">
            <span className="Title">{t('yourContribute')}</span>
            <p className="Number">
              1,000.00 <span className="Unit">KSM</span>
            </p>
          </div>
          <div className="Amount Yg">
            <span className="Title">{t('yourTotalReward')}</span>
            <p className="Number">
              1,000.00 <span className="Unit">PHA</span>
            </p>
          </div>
        </div>
        <Inviter>
          <div className="Item">
            <span className="Text">{t('participantsIntroduced')}</span>
            <span className="Number">2 人</span>
          </div>
          <div className="Item">
            <span className="Text">{t('affiliationReward')}</span>
            <span className="Number">223.00 PHA</span>
          </div>
        </Inviter>
      </Amount>

      <Detail>
        <div className="Title">
          <span>{t('contributeDetails')}</span>
          <a href="">{t('more')}</a>
        </div>

        <Table data={[]} className="Table">
          <Table.Column prop="property" label={t('time')} />
          <Table.Column prop="descriptionIcon" label={t('yourContribute')} />
          <Table.Column prop="type" label={t('yourReward')} />
        </Table>
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
