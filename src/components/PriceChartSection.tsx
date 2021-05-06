import Section from '@/components/Section'
import { Loading } from '@geist-ui/react'
import ReactECharts from 'echarts-for-react'
import * as React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import type { GetPriceResponse } from '@/utils/request'

const PriceChart = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  place-content: space-between;

  .Amounts {
    display: flex;

    .Amount {
      margin-left: 0.25em;
      position: relative;
      padding-left: 0.8rem;
      padding-right: 0.6rem;

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
        display: inline-flex;
        flex-flow: row nowrap;
        height: 28px;
      }

      .Text {
        font-size: 12px;
        line-height: 1.5em;
        color: rgba(255, 255, 255, 0.5);
      }

      .Detail {
        display: flex;
        flex-direction: row;
      }

      .Item {
        display: inline-flex;
        flex-direction: column;
        margin-left: 0.5em;
      }

      .Item:first-of-type {
        margin-left: 0;
      }
    }

    .Amount:first-of-type {
      margin-left: 0;
      min-width: 50%;
    }
  }
`

type PriceChartSectionProps = {
  ksmInitialData: GetPriceResponse
  phaInitialData: GetPriceResponse
}

const defaultChartOptions = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      xAxisIndex: 'all',
    },
  },
  axisPointer: {
    link: { xAxisIndex: 'all' },
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: true,
      lineStyle: {
        opacity: 0.1,
        type: 'dashed',
      },
    },
    splitNumber: 20,
  },
  grid: [
    {
      left: '30px',
      right: '24px',
      bottom: '24px',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: 'KSM',
      splitLine: { show: false },
      axisPointer: { show: false },
    },
    {
      type: 'value',
      name: 'PHA',
      splitLine: { show: false },
      axisPointer: { show: false },
    },
  ],
  series: [
    {
      name: 'KSM',
      type: 'line',
      lineStyle: { color: '#eb5757' },
      showSymbol: false,
      hoverAnimation: false,
      yAxisIndex: 0,
      data: [],
    },
    {
      name: 'PHA',
      type: 'line',
      lineStyle: { color: '#d1ff52' },
      showSymbol: false,
      hoverAnimation: false,
      yAxisIndex: 1,
      data: [],
    },
  ],
}

const PriceChartSection: React.FC<PriceChartSectionProps> = (
  props: PriceChartSectionProps
) => {
  const { data: ksmQueryData, error: ksmQueryError } = useQuery(
    ['getPrice', { currency: 'KSM' }],
    { refetchInterval: 60 * 1000, initialData: props.ksmInitialData }
  )
  const ksmData = React.useMemo<GetPriceResponse | undefined>(
    () => ksmQueryData,
    [ksmQueryData]
  )

  const { data: phaQueryData, error: phaQueryError } = useQuery(
    ['getPrice', { currency: 'PHA' }],
    { refetchInterval: 60 * 1000, initialData: props.phaInitialData }
  )
  const phaData = React.useMemo<GetPriceResponse | undefined>(
    () => phaQueryData,
    [phaQueryData]
  )
  const chartOptions = React.useMemo(() => {
    if (ksmQueryError) {
      console.error('[PriceChart] Read KSM prices failed: ', ksmQueryError)
    }

    if (phaQueryError) {
      console.error('[PriceChart] Read PHA prices failed: ', ksmQueryError)
    }

    return Object.assign({}, defaultChartOptions, {
      series: [
        {
          name: 'KSM',
          type: 'line',
          lineStyle: { color: '#eb5757' },
          showSymbol: false,
          hoverAnimation: false,
          yAxisIndex: 0,
          data: ksmData?.data,
        },
        {
          name: 'PHA',
          type: 'line',
          lineStyle: { color: '#d1ff52' },
          showSymbol: false,
          hoverAnimation: false,
          yAxisIndex: 1,
          data: phaData?.data,
        },
      ],
    })
  }, [ksmData, phaData])

  return (
    <Section xs={24} md={12} lg={24} className="">
      <PriceChart>
        <div className="Amounts">
          <div className="Amount Re">
            <span className="Title">KSM</span>
            <div className="Detail">
              <div className="Item">
                <span className="Text">Price</span>
                <span className="Number">
                  $
                  {ksmData?.data?.length ? (
                    ksmData.data[ksmData.data.length - 1][1]
                  ) : (
                    <Loading size="mini" />
                  )}
                </span>
              </div>
              <div className="Item">
                <span className="Text">Stake</span>
                <span className="Number">
                  {typeof ksmData?.stakeParticipatingRate === 'number' ? (
                    ksmData.stakeParticipatingRate + '%'
                  ) : (
                    <Loading size="mini" />
                  )}
                </span>
              </div>
              <div className="Item">
                <span className="Text">Reward</span>
                <span className="Number">
                  {typeof ksmData?.stakeApr === 'number' ? (
                    ksmData.stakeApr + '%'
                  ) : (
                    <Loading size="mini" />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="Amount Yg">
            <span className="Title">PHA</span>
            <div className="Detail">
              <div className="Item">
                <span className="Text">Price</span>
                <span className="Number">
                  $
                  {phaData?.data?.length ? (
                    phaData.data[phaData.data.length - 1][1]
                  ) : (
                    <Loading size="mini" />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <ReactECharts
          option={chartOptions}
          style={{
            height: 'auto',
            minHeight: '270px',
            flex: 1,
            width: '100%',
            margin: '-10px auto 0',
          }}
        />
      </PriceChart>
    </Section>
  )
}

export default PriceChartSection
