import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
    <div className="min-h-screen text-white">
      <div>
        {!user && 
          <Auth
            redirectTo={'http://localhost:3000/'}
            appearance={{ theme: ThemeSupa }}
            supabaseClient={supabase}
            providers={['google']}
            socialLayout="horizontal"
          />
        }
      </div>
      {!loading && (   
        <div className="flex flex-col items-center text-center">
          <SavedPCs subscribed={userData?.is_subscribed}/>
          {
            userData?.is_subscribed
          ? 
            <div className="text-center">
              <p>Subscribed: {userData?.interval}ly</p>
              <button onClick={loadPortal}>Manage Subscription</button>
            </div>
          : 
            <div className="text-center">
              <p>Not Subscribed</p>
              <Link href="/pricing" className="hover:text-purple-400">Click to go to pricing</Link>
            </div>
          }
        </div>
      )}
    </div>
  )
}

export default Profile