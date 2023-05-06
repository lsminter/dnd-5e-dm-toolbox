import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {supabase} from '../../utils/supabase'

const Login = () => {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    router.push("/profile")
  }, [router])

  return <p>Login</p>
}

export default Login;