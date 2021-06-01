import { Table } from '@geist-ui/react'
import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useI18n } from '@/i18n'

type Props = React.ComponentProps<typeof Table>

const RankTable: React.FC<Props> = (props) => {
  const isXS = useMediaQuery({ maxWidth: 760 })
  const isSM = useMediaQuery({ minWidth: 760, maxWidth: 960 })
  const isMD = useMediaQuery({ minWidth: 960, maxWidth: 1280 })
  const isLG = useMediaQuery({ minWidth: 1280 })
  const { t } = useI18n()

  const rankColumn = <Table.Column prop="rank" label={t('rank')} />
  const addressColum = <Table.Column prop="address" label={t('KSMAccount')} />
  const amountColum = <Table.Column prop="amount" label={t('contribute')} />
  const rewardAmountColumn = (
    <Table.Column prop="rewardAmount" label={t('contributeReward')} />
  )
  const referralsCountColumn = (
    <Table.Column prop="referralsCount" label={t('participantsIntroduced')} />
  )
  const promotionRewardAmountColumn = (
    <Table.Column prop="promotionRewardAmount" label={t('affiliationReward')} />
  )

  return (
    <>
      <Table hidden={!isXS} {...props} className="Table">
        {addressColum}
        {rewardAmountColumn}
        {promotionRewardAmountColumn}
      </Table>
      <Table hidden={!isSM} {...props} className="Table">
        {rankColumn}
        {addressColum}
        {rewardAmountColumn}
        {promotionRewardAmountColumn}
      </Table>
      <Table hidden={!isMD} {...props} className="Table">
        {rankColumn}
        {addressColum}
        {amountColum}
        {rewardAmountColumn}
        {promotionRewardAmountColumn}
      </Table>
      <Table hidden={!isLG} {...props} className="Table">
        {rankColumn}
        {addressColum}
        {amountColum}
        {rewardAmountColumn}
        {referralsCountColumn}
        {promotionRewardAmountColumn}
      </Table>
    </>
  )
}

export default RankTable
