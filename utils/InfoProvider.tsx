import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

const InfoProvider: React.FC = ({ children }) => {
  return <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
}

export default InfoProvider
