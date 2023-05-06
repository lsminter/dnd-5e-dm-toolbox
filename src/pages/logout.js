import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {supabase} from '../../utils/supabase';

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      const { error } = await supabase.auth.signOut()
      router.push("/profile")
    }
    logout()
  }, [router])

  return <p>Logout</p>
}

export default Logout;