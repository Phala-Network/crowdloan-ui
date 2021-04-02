import Section from '@/components/Section'
import { Loading } from '@geist-ui/react'
import * as echarts from 'echarts'
import { ECharts } from 'echarts'
import * as React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { APIEndpoints } from '../utils/Configuration'

const PriceChart = styled.div`
  width: 100%;

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
      }

      .Text {
        font-size: 12px;
        line-height: 1.5em;
        color: rgba(255, 255, 255, 0.5);
      }

      .Item {
        display: inline-flex;
        flex-direction: column;
        margin-left: 0.25em;
      }

      .Item:first-of-type {
        margin-left: 0;
      }
    }

    .Amount:first-of-type {
      margin-left: 0;
    }
  }
`

type EndpointResponse = {
    price: string
    stake: string
    reward: string
    kline: {
        timestamp: number
        value: number
    }[]
}

const fetchData = async (currency: string): Promise<EndpointResponse> => {
    const req = await fetch(APIEndpoints.getPrices + currency)
    const json = await req.json()
    if (json.success !== true) { throw new Error('Response is not success') }
    return json.data as EndpointResponse
}

type PriceChartSectionProps = { ksmInitialData: EndpointResponse, phaInitialData: EndpointResponse }

const PriceChartSection: React.FC<PriceChartSectionProps> = (props: PriceChartSectionProps) => {
    const priceChartElement = React.useRef<HTMLDivElement>(undefined)
    const priceChart = React.useRef<ECharts>()

    const { data: ksmQueryData, error: ksmQueryError } = useQuery(
        'ksmPrices',
        async () => await fetchData('KSM'),
        { refetchInterval: 60 * 1000, initialData: props.ksmInitialData }
    )
    const ksmData = React.useMemo<EndpointResponse | undefined>(() => ksmQueryData, [ksmQueryData])

    const { data: phaQueryData, error: phaQueryError } = useQuery(
        'phaPrices',
        async () => await fetchData('PHA'),
        { refetchInterval: 60 * 1000, initialData: props.phaInitialData }
    )
    const phaData = React.useMemo<EndpointResponse | undefined>(() => phaQueryData, [phaQueryData])

    React.useEffect(() => {
        // initialize price chart using echarts

        if (priceChart.current === undefined) {
            priceChart.current = echarts.init(priceChartElement.current)
            priceChart.current.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false,
                    },
                },
                yAxis: [
                    {
                        type: 'value',
                        name: 'KSM',
                        splitLine: { show: false }
                    }, {
                        type: 'value',
                        name: 'PHA',
                        splitLine: { show: false }
                    }
                ],
                series: [
                    {
                        name: 'KSM',
                        type: 'line',
                        lineStyle: { color: '#eb5757' },
                        showSymbol: false,
                        hoverAnimation: false,
                        yAxisIndex: 0,
                        data: []
                    },
                    {
                        name: 'PHA',
                        type: 'line',
                        lineStyle: { color: '#d1ff52' },
                        showSymbol: false,
                        hoverAnimation: false,
                        yAxisIndex: 1,
                        data: []
                    }
                ],
            })
        }
    })

    React.useEffect(() => {
        // re-render data

        if (ksmQueryError) {
            console.error('[PriceChart] Read KSM prices failed: ', ksmQueryError)
        }

        if (phaQueryError) {
            console.error('[PriceChart] Read PHA prices failed: ', ksmQueryError)
        }

        priceChart.current.setOption({
            series: [
                {
                    data: ksmData?.kline?.map((point) => [point.timestamp * 1000, point.value]) ?? []
                },
                {
                    data: phaData?.kline?.map((point) => [point.timestamp * 1000, point.value]) ?? []
                }
            ]
        })
    }, [ksmData, phaData])

    return (
        <Section className="">
            <PriceChart>
                <div className="Amounts">
                    <div className="Amount Re">
                        <span className="Title">KSM</span>
                        <div className="Detail">
                            <div className="Item">
                                <span className="Text">Price</span>
                                <span className="Number">${ksmData?.price ?? <Loading size="mini" />}</span>
                            </div>
                            <div className="Item">
                                <span className="Text">Stake</span>
                                <span className="Number">{
                                    ksmData?.stake === undefined
                                        ? <Loading size="mini" />
                                        : (ksmData.stake as unknown as number) * 100
                                }%</span>
                            </div>
                            <div className="Item">
                                <span className="Text">Reward</span>
                                <span className="Number">{
                                    ksmData?.reward === undefined
                                        ? <Loading size="mini" />
                                        : (ksmData.reward as unknown as number) * 100
                                }%</span>
                            </div>
                        </div>
                    </div>
                    <div className="Amount Yg">
                        <span className="Title">PHA</span>
                        <div className="Detail">
                            <div className="Item">
                                <span className="Text">Price</span>
                                <span className="Number">${phaData?.price ?? <Loading size="mini" />}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div ref={priceChartElement} style={{ width: '100%', height: 240 }} />
            </PriceChart>
        </Section>
    )
}

export default PriceChartSection

export async function getStaticProps(): Promise<PriceChartSectionProps> {
    return { ksmInitialData: await fetchData('KSM'), phaInitialData: await fetchData('PHA') }
}
