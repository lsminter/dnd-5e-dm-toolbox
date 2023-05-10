import {useEffect} from 'react'
import {useRouter} from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const Login = () => {
  const router = useRouter()
  const supabase = useSupabaseClient()

  useEffect(() => {
    supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    router.push("/profile")
  }, [router, supabase])

  return <p>Login</p>
}

export default Login;