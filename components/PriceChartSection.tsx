import * as React from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import * as echarts from 'echarts'

const style__PriceChartSection = css`
  width: 100%;
  height: 100%;
`

const PriceChart = styled.div`
  width: 100%;

  .Amounts {
    display: flex;

    .Amount {
      width: 50%;
      position: relative;
      padding-left: 8px;
      padding-right: 20px;

      &.Re {
        &::before {
          content: '';
          width: 2px;
          height: 63px;
          left: 0;
          top: 7.5px;
          position: absolute;
          background: #eb5757;
        }

        & .Detail {
          display: flex;
          justify-content: space-between;
        }
      }

      &.Yg {
        &::before {
          content: '';
          width: 2px;
          height: 63px;
          left: 0;
          top: 7.5px;
          position: absolute;
          background: #d1ff52;
        }
      }

      .Title {
        font-size: 14px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.9);
      }

      .Number {
        font-size: 16px;
        line-height: 28px;
        padding: 0;
        margin: 0;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
      }

      .Text {
        font-size: 12px;
        line-height: 17px;
        color: rgba(255, 255, 255, 0.5);
      }

      .Item {
        display: inline-flex;
        flex-direction: column;
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
let now = +new Date(1997, 9, 3)

const PriceChartSection: React.FC = () => {
  React.useEffect(() => {
    const chartDom = document.getElementById('PriceChart')
    const myChart = echarts.init(chartDom)
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

    myChart.setOption(option)
  }, [])

  return (
    <Section innerStyle={style__PriceChartSection}>
      <PriceChart>
        <div className="Amounts">
          <div className="Amount Re">
            <span className="Title">KSM</span>
            <div className="Detail">
              <div className="Item">
                <span className="Text">Price</span>
                <span className="Number">$14.1</span>
              </div>
              <div className="Item">
                <span className="Text">Stake</span>
                <span className="Number">61%</span>
              </div>
              <div className="Item">
                <span className="Text">Price</span>
                <span className="Number">12.1%</span>
              </div>
            </div>
          </div>
          <div className="Amount Yg">
            <span className="Title">PHA</span>
            <div className="Detail">
              <div className="Item">
                <span className="Text">Price</span>
                <span className="Number">$14.1</span>
              </div>
            </div>
          </div>
        </div>

        <div id="PriceChart" style={{ width: '100%', height: 240 }}></div>
      </PriceChart>
    </Section>
  )
}

export default PriceChartSection
