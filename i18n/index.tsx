import { I18nProvider, RosettaExtended, useI18n } from 'next-rosetta'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export interface AppLocale {
  locale: string
  stakingRewardPool: string
  stakingTotal: string
  aboutKhala: string
  learnSlotAuction: string
  affiliationProgram: string
  connectWallet: string
  rank: string
  KSMAccount: string
  contribute: string
  contributeReward: string
  participantsIntroduced: string
  affiliationReward: string
  myRanking: string
  enterAnContributeAmount: string
  balance: string
  max: string
  calculate: string
  contributingReward: string
  contributingIncome: string
  phaPrice: string
  stake: string
  phalaStakeAPY: string
  KSMAPY: string
  KSMPrice: string
  stakingReward: string
  stakingIncome: string
  moreIncome: string
  introducer: string
  fillIntroducer: string
  yourTotalReward: string
  contributeDetails: string
  more: string
  time: string
  yourContribute: string
  yourReward: string
  rewardVest: string
  rewardVestTip: string
}

const _useI18n = (): RosettaExtended<AppLocale> => useI18n<AppLocale>()

const _I18nProvider: React.FC = ({ children }) => {
  const { locale } = useRouter()
  const [table, setTable] = useState(null)

  useEffect(() => {
    ;(async () => {
      setTable(await import(`@/i18n/${locale}.json`))
    })()
  }, [locale])

  return <I18nProvider table={table}>{children}</I18nProvider>
}

export const localeNames = {
  zh: '中文',
  en: 'English',
}

export default _I18nProvider
export { _useI18n as useI18n }
