import * as React from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import ReactECharts from 'echarts-for-react'
import dayjs from 'dayjs'
import { useI18n } from 'next-rosetta'
import { AppLocale } from '@/i18n'

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
      now.getTime(),
      Math.round(value),
    ],
  }
}
const oneDay = 24 * 3600 * 1000
let value = Math.random() * 1000
let now = new Date(1997, 9, 3)

const AuctionChartSection: React.FC = (props) => {
  const { t } = useI18n<AppLocale>()
  const data = []
  for (let i = 0; i < 1000; i++) {
    data.push(randomData())
  }

  const chartOptions = React.useMemo(() => {
    return Object.assign({}, {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            return (
              dayjs(params[0].value[1]).format('YYYY/MM/DD HH:mm:ss') +
              '<br/>' +
              params[0].value[0] + ' KSM'
            )
          },
        axisPointer: {
          type: 'cross',
          snap: true,
          animation: false,
          lineStyle: {
            color: 'rgba(209, 255, 82, 0.5)',
          },
          crossStyle: {
            color: 'rgba(209, 255, 82, 0.5)',
          },
          label: {
            show: false,
          },
        },
        borderWidth: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        textStyle: {
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: 12, 
        },
        extraCssText: 'border-radius: 2px; padding: 4px 8px; backdrop-filter: blur(10px);',
      },
      grid: {
        top: '0',
        left: '0',
        bottom: '10%',
        right: '0',
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false,
        },
        axisLabel: {
          formatter: function (params) {
            const date = new Date(params)
            return (
              (date.getMonth() + 1).toString().padStart(2, '0') +
              '.' +
              date.getDate().toString().padStart(2, '0')
            )
          },
        },
      },
      yAxis: {
        show: false,
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
          itemStyle: {
            normal: {
              color: '#d1ff52',
              borderColor: 'rgba(255, 255, 255, 0.9)',
              borderWidth: 1,
            }
          },
          data: data,
          lineStyle: { color: '#d1ff52' },
        },
      ],
    })
  }, [data])

  return (
    <Section
      xs={24}
      md={12}
      lg={24}
      className=""
      innerStyle={style__AuctionChartSection}
    >
      <AuctionChart>
        <div className="ChartTitle">
          <span className="Text">{t('stakingRewardPool')}:</span>
          <span className="Amount">100,000,000PHA</span>
        </div>

        <div className="Amounts">
          <div className="Amount Wh">
            <span className="Title">{t('stakingTotal')}</span>
            <p className="Number">
              1,000.00 <span className="Unit">KSM</span>
            </p>
          </div>
          <div className="Amount Yg">
            <span className="Title">{t('stakingTotal')}</span>
            <p className="Number">
              1,000.00 <span className="Unit">KSM</span>
            </p>
          </div>
        </div>

        <ReactECharts
          option={chartOptions}
          style={{
            height: '190px',
            width: '100%',
          }}
        />
      </AuctionChart>
    </Section>
  )
}

export default AuctionChartSection
