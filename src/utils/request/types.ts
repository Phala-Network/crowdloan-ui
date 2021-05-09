interface requestFunctions {
  getSchedule
  getPrice
}

export type Response<T> = T
export type queryFnOptions = [keyof requestFunctions, unknown | undefined]

export type GetScheduleOptions = {
  address?: string
}
export type GetScheduleResponse = {
  points: {
    timestamp: number
    value: number
  }[]
}

export type PaginationField = {
  currentPage: number
  totalPage: number
  totalCount: number
  perPage: number
}

export type GetPriceOptions = {
  currency: 'KSM' | 'DOT' | 'PHA'
}
export type GetPriceResponse = {
  symbol: string
  price: number
  lastUpdatedAt: string
  data: [string, number][]
  stakeParticipatingRate?: number
  stakeApr?: number
}

export type GetCampaignsResponse = {
  campaign: {
    id: number
    name: string
    parachainId: string
    cap: number
    raisedAmount: number
  }
}

export type GetCampaignOptions = {
  campaignId: number
}
export type GetCampaignResponse = {
  campaign: {
    id: number
    name: string
    parachainId: string
    cap: number
    hardCap: number
    totalRewardAmount: string
    raisedAmount: number
  }
  meta: {
    milestones: {
      estimatesAt: string
      title: string
      body: string
    }[]
    estimateFirstReleasingIn: string
    estimateEndReleasingIn: string
    firstReleasingPercentage: number
    estimateReleasingDaysInterval: number
    estimateReleasingPercentagePerInterval: number
    contributionChart: [string, number][]
  }
}

export type GetAnnouncementsOptions = {
  campaignId: number
  page?: number
  perPage?: number
}
export type GetAnnouncementsResponse = {
  announcements: {
    id: number
    title: string
    link: string
    body: string
    publishedAt: string
  }[]
  pagination: PaginationField
}

export type GetContributionsOptions = {
  campaignId: number
  contributor?: string
  referrer?: string
  page?: number
  perPage?: number
}
export type GetContributionsResponse = {
  contributions: {
    address: string
    amount: number
    rewardAmount: number
    promotionRewardAmount: number
    timestamp: string
    time?
  }[]
  pagination: PaginationField
  meta: {
    referralsCount?: number
    promotionRewardAmount?: number
  }
}

export type GetContributorsOptions = {
  campaignId: number
  page?: number
  perPage?: number
}
export type GetContributorsResponse = {
  contributors: {
    address: string
    amount: number
    rewardAmount: number
    referralsCount: number
    promotionRewardAmount: number
    rank?: number
  }[]
  pagination: PaginationField
}

export type GetContributorOptions = {
  campaignId: number
  contributorId: number
}
export type GetContributorResponse = {
  contributor: {
    address: string
    amount: number
    rewardAmount: number
    referralsCount: number
    promotionRewardAmount: number
  }
  meta: {
    rank: number
    referrer?: string
    latestContributions: {
      amount: number
      rewardAmount: number
      timestamp: string
      time?: string
    }[]
    simulateReleasingCharts: [string, number][]
  }
}