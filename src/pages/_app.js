import '@/styles/globals.css'
import Header from '../components/random-components/Header.js'
import {useState} from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div className="min-h-screen bg-white text-black p-4">
    <QueryClientProvider client={queryClient}>
    <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
    </div>)
}
