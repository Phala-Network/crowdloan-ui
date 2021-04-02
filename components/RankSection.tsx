import styled, { css } from 'styled-components'
import Section from '@/components/Section'
import { Table, Pagination } from '@geist-ui/react'

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

  & > nav {
    margin-top: 24px !important;
    text-align: right;

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

const RankSection: React.FC = () => (
  <Section className="" xs={24} md={24} lg={24} innerStyle={style__Rank}>
    <TableWrap>
      <Table data={data} className="Table">
        <Table.Column prop="rank" label="排名" />
        <Table.Column prop="account" label="KSM账户" />
        <Table.Column prop="amount" label="质押量" />
        <Table.Column prop="reward" label="质押奖励" />
        <Table.Column prop="amount" label="邀请人数" />
        <Table.Column prop="inviters" label="质押量" />
        <Table.Column prop="inviterReward" label="邀请奖励" />
      </Table>
      <Pagination count={10} initialPage={1} />
    </TableWrap>
  </Section>
)

export default RankSection
