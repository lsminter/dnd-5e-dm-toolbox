import '@/styles/globals.css'
import {useState} from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div className="h-screen bg-white text-black p-4">
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
    </div>)
}
