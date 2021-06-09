import Section from '@/components/Section'
import { Loading } from '@geist-ui/react'
import ReactECharts from 'echarts-for-react'
import * as React from 'react'
import styled from 'styled-components'
import type { GetPriceResponse } from '@/utils/request'
import { useMeta } from '@/utils/meta'
import TextTooltip from '@/components/TextTooltip'
import { useI18n } from '@/i18n'
import dayjs from 'dayjs'

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
          height: 58px;
          left: 0;
          top: 3px;
          position: absolute;
          background: #eb5757;
        }
      }

      &.Yg {
        &::before {
          content: '';
          width: 2px;
          height: 58px;
          left: 0;
          top: 3px;
          position: absolute;
          background: #03ffff;
        }
      }

      .Title {
        font-size: 14px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
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

const defaultChartOptions = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    textStyle: {
      color: 'white',
    },
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
      left: '0px',
      right: '0px',
      bottom: '20px',
      top: '20px',
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Amount',
      splitLine: { show: false },
      axisPointer: { show: false },
      show: false,
    },
    {
      type: 'value',
      name: 'PHA',
      splitLine: { show: false },
      axisPointer: { show: false },
      show: false,
    },
  ],
  series: [
    {
      name: 'KSM',
      type: 'line',
      itemStyle: { color: '#eb5757' },
      showSymbol: false,
      hoverAnimation: false,
      yAxisIndex: 0,
      data: [],
    },
    {
      name: 'PHA',
      type: 'line',
      itemStyle: { color: '#03FFFF' },
      showSymbol: false,
      hoverAnimation: false,
      yAxisIndex: 1,
      data: [],
    },
  ],
}

const PriceChartSection: React.FC = () => {
  const { price } = useMeta()
  const { t } = useI18n()

  const ksmData = React.useMemo<GetPriceResponse>(
    () => price?.ksmQuery?.data,
    [price?.ksmQuery?.data]
  )

  const phaData = React.useMemo<GetPriceResponse>(
    () => price?.phaQuery?.data,
    [price?.phaQuery?.data]
  )
  const chartOptions = React.useMemo(() => {
    const formatData = (item) => [item[0], item[1].toFixed(2)]

    return Object.assign({}, defaultChartOptions, {
      series: [
        {
          ...defaultChartOptions.series[0],
          data: ksmData?.data?.map?.(formatData),
        },
        {
          ...defaultChartOptions.series[1],
          data: phaData?.data?.map?.(formatData),
        },
      ],
    })
  }, [ksmData, phaData])

  return (
    <Section xs={24} md={12} lg={24} className="">
      <PriceChart>
        <div className="Amounts">
          <div className="Amount Re">
            <div className="Title">
              <span>KSM</span>
              <TextTooltip
                style={{ marginLeft: 5 }}
                placement="bottom"
                text={[
                  <div key="link">
                    {t('dataSource')}:{' '}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={t('stakingrewardsLink')}
                    >
                      StakingRewards
                    </a>
                    {' & '}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={t('coinGechoLink')}
                    >
                      CoinGecho
                    </a>
                  </div>,
                  <div key="ksmData.lastUpdatedAt">
                    {t('priceLastUpdated')}{' '}
                    {dayjs(ksmData?.lastUpdatedAt).format('YYYY-MM-DD HH:mm')}
                  </div>,
                ]}
              />
            </div>
            <div className="Detail">
              <div className="Item">
                <span className="Text">Price</span>
                <span className="Number">
                  $
                  {ksmData?.data?.length ? (
                    ksmData.data[ksmData.data.length - 1][1].toFixed(2)
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
            <div className="Title">
              <span>PHA</span>
              <TextTooltip
                style={{ marginLeft: 5 }}
                placement="bottom"
                text={[
                  <div key="link">
                    {t('dataSource')}:{' '}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={t('coinGechoLink')}
                    >
                      CoinGecho
                    </a>
                  </div>,
                  <div key="phaData.lastUpdatedAt">
                    {t('lastUpdated')}{' '}
                    {dayjs(phaData?.lastUpdatedAt).format('YYYY-MM-DD HH:mm')}
                  </div>,
                ]}
              />
            </div>
            <div className="Detail">
              <div className="Item">
                <span className="Text">Price</span>
                <span className="Number">
                  $
                  {phaData?.data?.length ? (
                    phaData.data[phaData.data.length - 1][1].toFixed(2)
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
            minHeight: '190px',
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
