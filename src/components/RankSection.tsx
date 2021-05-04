import React from 'react'
import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import { Table, Pagination } from '@geist-ui/react'
import { ChevronLeft, ChevronRight } from '@geist-ui/react-icons'
import { useI18n } from '@/i18n'

const style__Rank = css`
  background: transparent;
  padding: 0;
`

const data = [
  {
    rank: '1',
    account: '1FCu68……9vWS1Q',
    amount: 5600,
    reward: 100,
    inviters: 100,
    inviterReward: '12,123,312.00 ',
  },
  {
    rank: '2',
    account: '1FCu68……9vWS1Q',
    amount: 5600,
    reward: 100,
    inviters: 100,
    inviterReward: '12,123,312.00 ',
  },
  {
    rank: '3',
    account: '1FCu68……9vWS1Q',
    amount: 5600,
    reward: 100,
    inviters: 100,
    inviterReward: '12,123,312.00 ',
  },
  {
    rank: '4',
    account: '1FCu68……9vWS1Q',
    amount: 5600,
    reward: 100,
    inviters: 100,
    inviterReward: '12,123,312.00 ',
  },
  {
    rank: '5',
    account: '1FCu68……9vWS1Q',
    amount: 5600,
    reward: 100,
    inviters: 100,
    inviterReward: '12,123,312.00 ',
  },
  {
    rank: '6',
    account: '1FCu68……9vWS1Q',
    amount: 5600,
    reward: 100,
    inviters: 100,
    inviterReward: '12,123,312.00 ',
  },
  {
    rank: '7',
    account: '1FCu68……9vWS1Q',
    amount: 5600,
    reward: 100,
    inviters: 100,
    inviterReward: '12,123,312.00 ',
  },
  {
    rank: '8',
    account: '1FCu68……9vWS1Q',
    amount: 5600,
    reward: 100,
    inviters: 100,
    inviterReward: '12,123,312.00 ',
  },
  {
    rank: '9',
    account: '1FCu68……9vWS1Q',
    amount: 5600,
    reward: 100,
    inviters: 100,
    inviterReward: '12,123,312.00 ',
  },
  {
    rank: '10',
    account: '1FCu68……9vWS1Q',
    amount: 5600,
    reward: 100,
    inviters: 100,
    inviterReward: '12,123,312.00 ',
  },
]

const TableWrap = styled.div`
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

  return (
    <Section className="" xs={24} md={24} lg={24} innerStyle={style__Rank}>
      <TableWrap>
        <Table data={data} className="Table">
          <Table.Column prop="rank" label={t('rank')} />
          <Table.Column prop="account" label={t('KSMAccount')} />
          <Table.Column prop="inviters" label={t('contribute')} />
          <Table.Column prop="amount" label={t('contributeReward')} />
          <Table.Column prop="reward" label={t('participantsIntroduced')} />
          <Table.Column prop="inviterReward" label={t('affiliationReward')} />
        </Table>
        <TableFooter>
          <div className="left">{t('myRanking')}：</div>
          <Pagination count={10} initialPage={1}>
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
