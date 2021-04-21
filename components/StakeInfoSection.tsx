import Section from '@/components/Section'
import { Table } from '@geist-ui/react'
import ReactECharts from 'echarts-for-react'
import * as React from 'react'
import { useQuery } from 'react-query'
import styled, { css } from 'styled-components'
import { GetScheduleResponse } from '@/utils/request'

const style__StakeInfoSection = css`
  display: flex;
  flex-direction: column;
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
  & .title {
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.9);
  }
  & .info {
    font-size: 12px;
    line-height: 17px;
    color: rgba(255, 255, 255, 0.5);
  }
`

const oneDay = 24 * 3600 * 1000
let value = Math.random() * 1000 + 800
let now = new Date(1997, 9, 3)
function randomData() {
  now = new Date(+now + oneDay)
  value = value + Math.random() * 21 - 10
  return {
    name: now.toString(),
    value: [
      now.getTime(),
      Math.round(value),
    ],
  }
}
const data = []
for (let i = 0; i < 30; i++) {
  data.push(randomData())
}

const StakeInfoSection: React.FC = () => {
  const [address] = React.useState<string | null>(
    '51gcyDD5ryWMeH6SFEArATWv9y49UAUsZQRWHBwnke3KUdTN'
  )

  const { data: queryData } = useQuery(
    ['getSchedule', { address }],
    {
      refetchInterval: 60 * 1000,
    }
  )

  const chartData = React.useMemo(
    () =>
      (queryData as GetScheduleResponse)?.points?.map((point) => [
        point.timestamp * 1000,
        point.value,
      ]) ?? [],
    [queryData]
  )

  const tableData = [
    { property: '2021.4.5 12:59', description: '300.00KSM', type: '100.00PHA' },
    { property: '2021.4.5 12:59', description: '300.00KSM', type: '100.00PHA' },
    { property: '2021.4.5 12:59', description: '300.00KSM', type: '100.00PHA' },
  ]
  const icon = (_: any, rowData: any) => {
    return <span>{rowData.rowValue.description}<i className="link-icon"></i></span>
  }
  tableData.forEach(i => i['descriptionIcon'] = icon )

  // const rewardChartElement = React.useRef<HTMLDivElement>()
  // const rewardChart = React.useRef<ECharts>()

  const chartOptions = React.useMemo(() => {
    return Object.assign({}, {
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
      xAxis: {
        type: 'time',
        boundaryGap: [0, 0],
        splitLine: {
          show: false,
        },
        axisTick: {
          interval: 2,
          show: false
        },
        axisLabel: {
          // showMinLabel: true,
          // showMaxLabel: true,
          formatter: function (params) {
            const date = new Date(params)
            return (
              date.getFullYear() +
              '.' +
              (date.getMonth() + 1) +
              '.' +
              date.getDate()
            )
          },
        },
        axisLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        // boundaryGap: [0, '100%'],
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
      grid: {
        top: '10%',
        left: '12%',
        bottom: '10%',
        right: '10%',
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
            }
          },
          data: data,
        },
      ],
    })
  }, [data])

  // React.useEffect(() => {
  //   if (rewardChart.current !== undefined) {
  //     rewardChart.current.setOption({
  //       series: [
  //         {
  //           data: chartData,
  //         },
  //       ],
  //     })
  //   }
  // }, [chartData, rewardChart])

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
            <span className="Title">您的质押总量</span>
            <p className="Number">
              1,000.00 <span className="Unit">KSM</span>
            </p>
          </div>
          <div className="Amount Yg">
            <span className="Title">您的总奖励</span>
            <p className="Number">
              1,000.00 <span className="Unit">PHA</span>
            </p>
          </div>
        </div>
        <Inviter>
          <div className="Item">
            <span className="Text">邀请人数</span>
            <span className="Number">2 人</span>
          </div>
          <div className="Item">
            <span className="Text">邀请人数</span>
            <span className="Number">223.00 PHA</span>
          </div>
        </Inviter>
      </Amount>

      <Detail>
        <div className="Title">
          <span>质押明细</span>
          <a href="">查看全部</a>
        </div>

        <Table data={tableData} className="Table">
          <Table.Column prop="property" label="时间" />
          <Table.Column prop="descriptionIcon" label="您的质押" />
          <Table.Column prop="type" label="您的奖励" />
        </Table>
      </Detail>


      <Chart>
        <span className="title">结算发放</span>
        <div className="info">如果Phala在本期拍卖中赢得卡槽，将按如下时间点及比例发放奖励。如果失败，您可以在拍卖结束后立即全部解锁您的质押。</div>
        <ReactECharts
          option={chartOptions}
          style={{
            height: '179px',
            width: '100%',
          }}
        />
      </Chart>
    </Section>
  )
}

export default StakeInfoSection
