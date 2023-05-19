import '../styles/globals.css'
import NavBar from '../components/random-components/NavBar.js'
import Footer from '../components/random-components/Footer.js'
import {useState} from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { Analytics } from '@vercel/analytics/react';
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'


export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
    supabaseClient={supabaseClient}
    initialSession={pageProps.initialSession}
  >
      <div className="min-h-screen bg-gradient-to-b from-red-900 from-60% to-black text-black">
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Component {...pageProps} />
          <Footer />
        </QueryClientProvider>
        <Analytics />
      </div>
    </SessionContextProvider>
  )
}
