import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import SavedPCs from '../components/profiles/pcCharacter'

const Profile = () => {
  const user = useUser()
  const supabase = useSupabaseClient()
  const [userData, setUserData] = useState()

  useEffect(() => {
    const fetchData = async () => {

      if(user){
        const { data: profile, error } = await supabase
          .from('profile')
          .select(('*'))
          .eq('id', user.id)
          .single()

        setUserData({
          ...user,
          ...profile
        })
      }


    }
    fetchData()
    
  }, [supabase, user])

  if (!user)
    return (
      <Auth
        redirectTo="http://localhost:3000/profile"
        appearance={{ theme: ThemeSupa }}
        supabaseClient={supabase}
        providers={['google', 'github']}
        socialLayout="horizontal"
      />
    )

  return (
    <div className="text-white">
      <SavedPCs />
      <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(userData, null, 2)}</pre>
    </div>
  )
}

export default Profile