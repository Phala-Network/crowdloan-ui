import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import axios, { AxiosResponse } from 'axios'
import renameKeys from 'deep-rename-keys'
import { snakeToCamel } from 'naming-convention-transfer'
import type {
  GetPriceOptions,
  GetScheduleOptions,
  GetCampaignOptions,
  queryFnOptions,
  GetContributorsOptions,
  GetContributorOptions,
  GetContributionsOptions,
} from './types'

axios.defaults.baseURL = process.env.GATSBY_BACKEND_ENDPOINT
axios.defaults.headers.post['Content-Type'] = 'application/json'

const checkResponse = (res: AxiosResponse): void => {
  if (res.status > 299) {
    throw res
  }
  return renameKeys(res.data, (key) => snakeToCamel(key))
}

const apiUrls = {
  getPrice: '/coin_market_charts/',
  getCampaign: '/campaigns/',
  getCampaign__contributors: '/contributors',
  getCampaign__contributions: '/contributions',
  getSchedule: '/schedules',
}

const requestFunctions = {
  async getAnnouncements({ campaignId = 1, locale = 'zh' }) {
    const res = await axios.get(`/campaigns/${campaignId}/announcements`, {
      params: {
        locale,
      },
    })
    return checkResponse(res)
  },
  getPrice: async ({ currency }: GetPriceOptions) => {
    const res = await axios.get(apiUrls.getPrice + currency)
    return checkResponse(res)
  },
  getCampaign: async ({ campaignId = 1 }: GetCampaignOptions) => {
    const res = await axios.get(apiUrls.getCampaign + campaignId)
    return checkResponse(res)
  },
  getSchedule: async ({ address }: GetScheduleOptions) => {
    const res = await axios.get(apiUrls.getSchedule, {
      params: address ? { address } : null,
    })
    return checkResponse(res)
  },
  getRank: async ({
    campaignId,
    page = 1,
    perPage = 10,
  }: GetContributorsOptions) => {
    const res = await axios.get(
      apiUrls.getCampaign + campaignId + apiUrls.getCampaign__contributors,
      {
        params: {
          page,
          per_page: perPage,
        },
      }
    )
    return checkResponse(res)
  },
  getContributions: async ({
    campaignId,
    page = 1,
    perPage = 10,
    contributor,
  }: GetContributionsOptions) => {
    const res = await axios.get(
      apiUrls.getCampaign + campaignId + apiUrls.getCampaign__contributions,
      {
        params: {
          page,
          per_page: perPage,
          contributor,
        },
      }
    )
    return checkResponse(res)
  },
  getContributor: async ({
    campaignId,
    contributorId,
  }: GetContributorOptions) => {
    if (!contributorId) {
      return null
    }
    let res
    try {
      res = await axios.get(
        apiUrls.getCampaign +
          campaignId +
          apiUrls.getCampaign__contributors +
          '/' +
          contributorId
      )
    } catch (error) {
      if (error.response?.status === 404) {
        return null
      }
      throw error
    }
    return checkResponse(res)
  },
}

const queryFn = async ({ queryKey }): Promise<unknown> => {
  const [actionName, props] = queryKey as queryFnOptions
  return requestFunctions[actionName](props as any)
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      queryFn,
    },
  },
})

const RequestProvider: React.FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export { apiUrls, RequestProvider }
export default RequestProvider
export * from './types'
