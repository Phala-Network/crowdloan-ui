import { IntlShape, useIntl } from 'gatsby-plugin-intl'

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

const _useI18n = (): IntlShape & { t: (id: string) => string } => {
  const intl = useIntl()
  return {
    t: (id) => intl.formatMessage({ id }),
    ...intl,
  }
}

export const localeNames = {
  zh: '中文',
  en: 'English',
}

export { _useI18n as useI18n }
