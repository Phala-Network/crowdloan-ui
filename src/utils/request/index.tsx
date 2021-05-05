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
  getSchedule: '/schedules',
}

const requestFunctions = {
  getPrice: async ({ currency }: GetPriceOptions) => {
    const res = await axios.get(apiUrls.getPrice + currency)
    return checkResponse(res)
  },
  getCampaign: async ({ campaign = 1 }: GetCampaignOptions) => {
    const res = await axios.get(apiUrls.getCampaign + campaign)
    return checkResponse(res)
  },
  getSchedule: async ({ address }: GetScheduleOptions) => {
    const res = await axios.get(apiUrls.getSchedule, {
      params: address ? { address } : null,
    })
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
