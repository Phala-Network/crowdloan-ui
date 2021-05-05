interface requestFunctions {
  getPrice
  getSchedule
}

export type Response<T> = T
export type queryFnOptions = [keyof requestFunctions, unknown | undefined]

export type GetPriceOptions = {
  currency: 'KSM' | 'PHA'
}
export type GetPriceResponse = {
  symbol: string
  data: [string, number][]
  stakeRatio?: number
  stakeReward?: number
}

export type GetScheduleOptions = {
  address?: string
}
export type GetScheduleResponse = {
  points: {
    timestamp: number
    value: number
  }[]
}

export type GetCampaignOptions = {
  campaign?: number
}
