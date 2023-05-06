import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../../utils/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Profile = () => {
  const supabaseClient = supabase
  const user = useUser()
  const [data, setData] = useState()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('profile').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user, supabaseClient])

  if (!user)
    return (
      <Auth
        redirectTo="http://localhost:3000/profile"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabaseClient}
        providers={['github']}
        socialLayout="horizontal"
      />
    )

  return (
    <div className="grid grid-cols-1 text-white">
      <button className="text-left" onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      Congrats! {user.email} is logged in!
    </div>
  )
}

export default Profile