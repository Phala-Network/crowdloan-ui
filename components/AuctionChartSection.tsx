import * as React from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import * as echarts from 'echarts'

const style__AuctionChartSection = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const AuctionChart = styled.div`
  .ChartTitle {
    font-size: 16px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 14px;

    .Amount {
      font-weight: 600;
      margin-left: 13px;
    }
  }

  .Amounts {
    display: flex;
    .Amount {
      width: 50%;
      position: relative;
      padding-left: 8px;

      &.Wh {
        &::before {
          content: '';
          width: 2px;
          height: 42px;
          left: 0;
          top: 7.5px;
          position: absolute;
          background: rgba(255, 255, 255, 0.9);
        }
      }

      &.Yg {
        &::before {
          content: '';
          width: 2px;
          height: 42px;
          left: 0;
          top: 7.5px;
          position: absolute;
          background: #d1ff52;
        }
      }

      .Title {
        font-size: 12px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.5);
      }

      .Number {
        font-size: 16px;
        line-height: 28px;
        padding: 0;
        margin: 0;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
      }

      .Unit {
        font-size: 12px;
      }
    }
  }
`

function randomData() {
  now = new Date(+now + oneDay)
  value = value + Math.random() * 21 - 10
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value),
    ],
  }
}
const oneDay = 24 * 3600 * 1000
let value = Math.random() * 1000
let now = new Date(1997, 9, 3)

const AuctionChartSection: React.FC = () => {
  React.useEffect(() => {
    const chartDom = document.getElementById('AuctionChart')
    const myChart = echarts.init(chartDom as HTMLDivElement)
    const data = []
    for (let i = 0; i < 1000; i++) {
      data.push(randomData())
    }

    const option = {
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
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
      },
      series: [
        {
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: data,
        },
      ],
    }

    myChart.setOption(option as any) // TODO: fix this type error
  }, [])

  return (
    <Section
      xs={24} md={12} lg={24}
      className="" innerStyle={style__AuctionChartSection}>
      <AuctionChart>
        <div className="ChartTitle">
          <span className="Text">质押奖池:</span>
          <span className="Amount">100,000,000PHA</span>
        </div>

        <div className="Amounts">
          <div className="Amount Wh">
            <span className="Title">质押总量</span>
            <p className="Number">
              1,000.00 <span className="Unit">KSM</span>
            </p>
          </div>
          <div className="Amount Yg">
            <span className="Title">质押总量</span>
            <p className="Number">
              1,000.00 <span className="Unit">KSM</span>
            </p>
          </div>
        </div>

        <div id='AuctionChart' style={{ width: '100%', height: 240 }}/>
      </AuctionChart>
    </Section>
  )
}

export default AuctionChartSection
