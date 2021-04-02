import { QueryClient, QueryClientProvider } from 'react-query'
import axios, { AxiosResponse } from 'axios'

interface requestFunctions {
  getPrice,
  getSchedule
}

export type Response<T> = {
  data: T
  success: boolean
}
export type queryFnOptions = [keyof requestFunctions, unknown | undefined]

export type GetPriceOptions = {
  currency: 'KSM' | 'PHA'
}
export type GetPriceResponse = {
  price: string
  stake: string
  reward: string
  kline: {
    timestamp: number
    value: number
  }[]
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

axios.defaults.baseURL = process.env.BACKEND_ENDPOINT
axios.defaults.headers.post['Content-Type'] = 'application/json'

const checkResponse = (res: AxiosResponse): void => {
  if (res.data.success !== true || res.status > 299) {
    throw res
  }
}

const apiUrls = {
  getPrice: '/prices',
  getSchedule: '/schedules',
}

const requestFunctions = {
  getPrice: async ({ currency }: GetPriceOptions) => {
    const res = await axios.get(
      apiUrls.getPrice,
      {
        params: { currency },
      })
    checkResponse(res)
    return res.data.data
  },
  getSchedule: async ({ address }: GetScheduleOptions) => {
    const res = await axios.get(
      apiUrls.getSchedule,
      {
        params: address ? { address } : null,
      }
    )
    checkResponse(res)
    return res.data.data
  }
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
