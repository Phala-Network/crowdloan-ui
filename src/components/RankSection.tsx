import React, { useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import { Table, Pagination } from '@geist-ui/react'
import { ChevronLeft, ChevronRight } from '@geist-ui/react-icons'
import { useI18n } from '@/i18n'
import { useQuery } from 'react-query'
import { useMeta } from '@/utils/meta'
import { GetContributorsResponse } from '@/utils/request'

const style__Rank = css`
  background: transparent;
  padding: 0;
  width: 100%;
  overflow-x: auto;
`

const TableWrap = styled.div`
  min-width: 900px;
  width: 100%;

  .Table {
    margin-top: 4px;

    thead {
      th {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    th {
      background: #222222;
      border: none !important;
      color: rgba(255, 255, 255, 0.9);
      background: rgba(0, 0, 0, 0.9);
      font-size: 12px;
      height: 60px;

      &:nth-child(1) {
        padding-left: 36px;
      }
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
        border-bottom: none;
        color: rgba(255, 255, 255, 0.9);

        &:nth-child(1) {
          padding-left: 36px;
        }
      }
      background: rgba(0, 0, 0, 0.5);
      &:nth-child(even) {
        background: rgba(0, 0, 0, 0.9);
      }
    }
  }
`

const TableFooter = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  height: 80px;
  padding-left: 30px;
  padding-right: 30px;
  align-items: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  & > .left {
    flex-grow: 1;
    font-size: 14px;
    line-height: 20px;
    color: rgba(255, 255, 255, 0.9);
  }
  & nav {
    text-align: right;
    li {
      margin-bottom: 0;
    }
    & button {
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;

      &.active {
        background: #d1ff52;
        border-radius: 4px;
      }
    }
  }
`

const RankSection: React.FC = () => {
  const { t } = useI18n()
  const { campaignId, currentContributorQuery, refetchCount } = useMeta()
  const { current: perPage } = useRef(10)

  const [page, setPage] = useState(1)

  const { data } = useQuery<GetContributorsResponse>(
    ['getRank', { campaignId, page, perPage, refetchCount }],
    {
      refetchInterval: 60 * 1000,
    }
  )

  const totalPage = useMemo(
    () => data?.pagination?.totalPage || 1,
    [data?.pagination?.totalPage]
  )

  const chartData = useMemo(() => {
    if (!data) {
      return []
    }

    const rankBase = (page - 1) * perPage + 1

    data?.contributors.forEach((i, idx) => {
      Object.keys(i).forEach((ii) => {
        if (!i[ii]) {
          i[ii] = '-'
        }
      })
      i.rank = rankBase + idx
      return i
    })

    return data?.contributors
  }, [page, data?.contributors])

  return (
    <Section className="" xs={24} md={24} lg={24} innerStyle={style__Rank}>
      <TableWrap>
        <Table data={chartData} className="Table">
          <Table.Column prop="rank" label={t('rank')} />
          <Table.Column prop="address" label={t('KSMAccount')} />
          <Table.Column prop="amount" label={t('contribute')} />
          <Table.Column prop="rewardAmount" label={t('contributeReward')} />
          <Table.Column
            prop="referralsCount"
            label={t('participantsIntroduced')}
          />
          <Table.Column
            prop="promotionRewardAmount"
            label={t('affiliationReward')}
          />
        </Table>
        <TableFooter>
          <div className="left">
            {t('myRanking')}：{currentContributorQuery.data?.meta?.rank || '-'}
          </div>
          <Pagination count={totalPage} onChange={setPage}>
            <Pagination.Next>
              <ChevronRight />
            </Pagination.Next>
            <Pagination.Previous>
              <ChevronLeft />
            </Pagination.Previous>
          </Pagination>
        </TableFooter>
      </TableWrap>
    </Section>
  )
}

export default RankSection
