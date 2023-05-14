import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import SavedPCs from '../components/profiles/pcCharacter'

const Profile = () => {
  const router = useRouter()
  const user = useUser()
  const supabase = useSupabaseClient()
  const [userData, setUserData] = useState()
  const [loading, setLoading] = useState(true)

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
        setLoading(false)
      }
    }
    fetchData()
    
  }, [supabase, user])

  const loadPortal = async () => {
    const { data } = await axios.get('/api/portal');
    router.push(data.url)
  }

  return (
    <div className="text-white">
      <div>
        {!user && 
          <Auth
            redirectTo="http://localhost:3000/profile"
            appearance={{ theme: ThemeSupa }}
            supabaseClient={supabase}
            providers={['google']}
            socialLayout="horizontal"
          />
        }
      </div>
      {!loading && (   
        <div className="flex flex-col items-center">
          <SavedPCs />
          {userData?.is_subscribed ? `Subscribed: ${userData?.interval}` : `Not Subscribed`}
          <button onClick={loadPortal}>Manage Subscription</button>
        </div>
      )}
    </div>
  )
}

export default Profile