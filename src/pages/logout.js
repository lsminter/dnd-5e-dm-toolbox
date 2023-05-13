import {useEffect} from 'react'
import {useRouter} from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const Logout = () => {
  const router = useRouter()
  const supabase = useSupabaseClient()

  useEffect(() => {
    const logout = async () => {
      const { error } = await supabase.auth.signOut()
      router.push("/profile")
    }
    logout()
  }, [router, supabase])

  return <p>Logging out</p>
}

export default Logout;