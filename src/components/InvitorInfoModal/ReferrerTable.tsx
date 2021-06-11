import { Table } from '@geist-ui/react'
import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { useI18n } from '../../i18n'
import { useMeta } from '../../utils/meta'
import { GetContributionsResponse } from '../../utils/request'
import { useWeb3 } from '../../utils/web3'

type Props = any

const Root = styled.div`
  & .Table {
    margin-top: 4px;

    .link-icon {
      display: inline-block;
      width: 13px;
      height: 9px;
      margin-left: 3px;
      background-image: url(/link-icon.svg);
      background-size: cover;
    }

    thead {
      th {
        background: rgba(0, 0, 0, 0.9);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }

    tbody {
      tr:last-of-type {
        td:first-of-type {
          border-bottom-left-radius: 5px;
        }
        td:last-of-type {
          border-bottom-right-radius: 5px;
        }
      }
    }

    .cell {
      min-height: 2.2rem;
    }

    th {
      background: #222222;

      border: none !important;
      color: rgba(255, 255, 255, 0.9);
      font-size: 12px;
    }

    tr {
      font-size: 12px;
      line-height: 17px;
      background: #1a1a1a;

      &.hover {
        &:hover {
          background: rgba(255, 255, 255, 0.2);

          td {
            color: #fff;
          }
        }
      }

      td {
        color: rgba(255, 255, 255, 0.9);
        border-bottom: none;
      }

      &:nth-child(even) {
        background: rgba(0, 0, 0, 0.9);
      }
    }
  }
`

const ReferrerTable: React.FC<Props> = () => {
  const { campaignId } = useMeta()
  const { currentAccount } = useWeb3()
  const { t } = useI18n()

  const { data, isLoading } = useQuery<GetContributionsResponse>([
    'getContributions',
    {
      perPage: 255,
      page: 1,
      referrer: currentAccount.address,
      campaignId,
    },
  ])

  if (isLoading) {
    return null
  }

  const tableData = React.useMemo(
    () =>
      data?.contributions?.map?.((item) => {
        return {
          ...item,
          address:
            item?.address?.slice?.(0, 6) + '...' + item?.address?.slice?.(-6),
        }
      }),
    [data?.contributions]
  )

  return (
    <Root>
      <Table data={tableData} className="Table">
        <Table.Column prop="address" label={t('ReferrerTable.Account')} />
        <Table.Column prop="amount" label={t('ReferrerTable.ContributedKSM')} />
        <Table.Column
          prop="promotionRewardAmount"
          label={t('ReferrerTable.ReferralRewards')}
        />
      </Table>
    </Root>
  )
}

export default ReferrerTable
