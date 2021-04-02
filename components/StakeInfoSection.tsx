import Section from '@/components/Section'
import { Table } from '@geist-ui/react'
import * as echarts from 'echarts'
import { ECharts } from 'echarts'
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

    th {
      background: #222222;
      border: none !important;
      color: rgba(255, 255, 255, 0.9);
      font-size: 12px;
    }

    tr {
      font-size: 12px;
      line-height: 17px;

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

  const tableData = []

  const rewardChartElement = React.useRef<HTMLDivElement>()
  const rewardChart = React.useRef<ECharts>()

  React.useEffect(() => {
    if (
      rewardChart.current === undefined &&
      rewardChartElement.current !== undefined
    ) {
      rewardChart.current = echarts.init(rewardChartElement.current)
      rewardChart.current.setOption({
        xAxis: {
          type: 'time',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [],
            type: 'line',
            lineStyle: {
              color: '#D1FF52',
            },
            itemStyle: {
              borderColor: '#D1FF52',
              borderWidth: 2,
            },
          },
        ],
        title: {
          text: '结算发放',
          subtext:
            '如果Phala在本期拍卖中赢得卡槽，将按如下时间点及比例发放奖励。如果失败，您可以在拍卖结束后立即全部解锁您的质押。',
          left: 0,
          textStyle: {
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.9)',
          },
          subtextStyle: {
            fontSize: 12,
            color: 'rgba(255, 255, 255, 0.5)',
            width: 400,
            height: 40,
            lineHeight: 16,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
          },
        },
      })
    }
  }, [rewardChart, rewardChartElement])

  React.useEffect(() => {
    if (rewardChart.current !== undefined) {
      rewardChart.current.setOption({
        series: [
          {
            data: chartData,
          },
        ],
      })
    }
  }, [chartData, rewardChart])

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
          <Table.Column prop="description" label="您的质押" />
          <Table.Column prop="type" label="您的奖励" />
        </Table>
      </Detail>

      <div
        ref={rewardChartElement}
        style={{ width: '100%', height: 300 }}
      ></div>
    </Section>
  )
}

export default StakeInfoSection
