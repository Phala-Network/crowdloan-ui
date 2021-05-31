import { Table } from '@geist-ui/react'
import { IntlContext } from 'gatsby-plugin-intl'
import React, { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useI18n } from '@/i18n'
import { useMeta } from '@/utils/meta'
import { GetContributionsResponse } from '@/utils/request'
import { useWeb3 } from '@/utils/web3'

const ContributionList: React.FC = () => {
  const { t } = useI18n()
  const { campaignId, dayjs } = useMeta()
  const { currentAccount } = useWeb3()
  const { locale } = React.useContext(IntlContext)
  const { data } = useQuery<GetContributionsResponse>([
    'getContributions',
    {
      perPage: 255,
      page: 1,
      contributor: currentAccount.address,
      campaignId,
    },
  ])
  const tableData = useMemo(() => {
    if (!data?.contributions) {
      return null
    }
    const ret = data?.contributions
    ret.forEach((i) => {
      i.time = dayjs(i.timestamp).locale(locale).format('lll')
      Object.keys(i).forEach((ii) => {
        if (typeof i[ii] === 'number') {
          i[ii] ||= '0'
        } else {
          i[ii] ||= '-'
        }
      })
    })
    return ret
  }, [data?.contributions])
  return (
    <Table data={tableData} className="Table">
      <Table.Column prop="time" label={t('time')} />
      <Table.Column prop="amount" label={t('yourContribute')} />
      <Table.Column prop="rewardAmount" label={t('yourReward')} />
    </Table>
  )
}

export default ContributionList
