import * as React from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import ReactECharts from 'echarts-for-react'
import { useI18n } from '@/i18n'
import { useMeta } from '@/utils/meta'
import { GetCampaignResponse } from '@/utils/request'

const style__AuctionChartSection = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const AuctionChart = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  place-content: space-between;

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

const AuctionChartSection: React.FC = () => {
  const { t } = useI18n()
  const { campaign } = useMeta()

  const campaignData = React.useMemo<GetCampaignResponse>(
    () => campaign?.data,
    [campaign?.data]
  )

  const chartOptions = React.useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          xAxisIndex: 'all',
        },
      },
      grid: [
        {
          top: '20px',
          left: '6px',
          right: '6px',
          bottom: '24px',
        },
      ],
      xAxis: {
        type: 'time',
        splitLine: {
          show: true,
          lineStyle: {
            opacity: 0.1,
            type: 'dashed',
          },
        },
      },
      yAxis: {
        show: false,
        name: 'PHA',
        type: 'value',
        splitLine: { show: false },
        axisPointer: { show: false },
      },
      series: [
        {
          name: 'PHA',
          type: 'line',
          lineStyle: { color: '#d1ff52' },
          showSymbol: false,
          hoverAnimation: false,
          yAxisIndex: 0,
          data: campaignData?.meta?.contributionChart,
        },
      ],
    }
  }, [campaignData?.meta?.contributionChart])

  // todo: get heightest bid value
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
          <span className="Amount">
            {campaignData?.meta?.totalRewardAmount || '...'}
          </span>
        </div>

        <div className="Amounts">
          <div className="Amount Wh">
            <span className="Title">{t('heightestBid')}</span>
            <p className="Number">
              1,000.00 <span className="Unit">KSM</span>
            </p>
          </div>
          <div className="Amount Yg">
            <span className="Title">{t('phalaBid')}</span>
            <p className="Number">
              {campaignData?.meta?.contributionChart
                ? campaignData.meta.contributionChart[
                    campaignData.meta.contributionChart.length - 1
                  ][1]
                : '...'}{' '}
              <span className="Unit">KSM</span>
            </p>
          </div>
        </div>

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
      </AuctionChart>
    </Section>
  )
}

export default AuctionChartSection
