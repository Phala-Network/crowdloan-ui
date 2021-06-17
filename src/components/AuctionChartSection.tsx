import * as React from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import ReactECharts from 'echarts-for-react'
import { useI18n } from '@/i18n'
import { useMeta } from '@/utils/meta'
import { GetCampaignResponse, GetCompetitorsResponse } from '@/utils/request'
import { useQuery } from 'react-query'
import { useIntl } from 'gatsby-plugin-intl'

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
          background: #03ffff;
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
  const { locale } = useIntl()
  const { campaignQuery: campaign } = useMeta()

  const campaignData = React.useMemo<GetCampaignResponse>(
    () => campaign?.data,
    [campaign?.data]
  )
  const { campaignId } = useMeta()
  const { data: getCompetitorsData } = useQuery<GetCompetitorsResponse>(
    ['getCompetitors', { campaignId }],
    {
      refetchInterval: 60 * 1000,
    }
  )

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
          top: '0px',
          left: '16px',
          right: '16px',
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
          itemStyle: { color: '#03FFFF' },
          showSymbol: false,
          yAxisIndex: 0,
          data: campaignData?.meta?.contributionChart,
        },
      ],
    }
  }, [campaignData?.meta?.contributionChart])

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
            {campaignData?.campaign?.raisedAmount || '...'} KSM
          </span>
        </div>

        <div className="Amounts">
          <div className="Amount Wh">
            <span className="Title">{t('heightestBid')}</span>
            <p className="Number">
              {getCompetitorsData?.competitors?.[0]?.raisedAmount || '-'}{' '}
              <span className="Unit">KSM</span>
            </p>
          </div>
          <div className="Amount Yg">
            <span className="Title">{t('phalaBid')}</span>
            <p className="Number">
              {campaignData?.meta?.contributionChart
                ? campaignData.meta.contributionChart[
                    campaignData.meta.contributionChart.length - 1
                  ]?.[1]
                : '-'}{' '}
              <span className="Unit">KSM</span>
            </p>
          </div>
        </div>

        <ReactECharts
          opts={{ locale }}
          option={chartOptions}
          style={{
            height: 'auto',
            minHeight: '190px',
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
