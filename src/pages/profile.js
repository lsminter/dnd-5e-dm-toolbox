import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

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
    <div className="min-h-screen">
      <div>
        {!user && 
          <Auth
            redirectTo={`${process.env.CLIENT_URL}/profile`}
            appearance={{ theme: ThemeSupa }}
            supabaseClient={supabase}
            providers={['google']}
            socialLayout="horizontal"
          />
        }
      </div>
      {!loading && (   
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 text-center m-4 space-x-4">
            <div className="grid grid-cols-1">
              <h1 className="text-2xl">
              {console.log(userData)}
                {userData?.email ? (
                  <div className="grid justify-items-center">
                    {userData?.email}
                  </div>
                  ) : (
                    <div className="grid justify-items-center">
                      {userData?.user_metadata.email}
                    </div>
                  )
                }
              </h1>
              <div className="grid grid-cols-1 justify-items-center space-y-2">
                <button className="bg-defaultButton w-[280px] h-[50px] rounded-md">Saved PC&apos;s</button>
                <button className="bg-defaultButton w-[280px] h-[50px] rounded-md">Saved NPC&apos;s</button>
                <button className="bg-defaultButton w-[280px] h-[50px] rounded-md">Saved Encounters</button>
                <button className="bg-defaultButton w-[280px] h-[50px] rounded-md">Saved Campaigns</button>
              </div>
            </div>
            <div className="w-full h-full justify-self-center">
              <Image 
                alt="site logo" 
                src="/images/logos/white-logo.svg" 
                width={300}
                height={300}
              />
            </div>
          </div>
          
          <div className="mt-8 space-y-2">
            <p className="text-center">Being able to save PC&apos;s, NPC&apos;s, Encounters, and Campaigns will coming soon!</p>

            {
              userData?.is_subscribed
            ? 
              <div className="text-center space-y-2">
                <p>Subscription Status: {userData?.interval}ly</p>
                <button className="bg-defaultButton rounded-md p-2" onClick={loadPortal}>Manage Subscription</button>
              </div>
            : 
              <div className="text-center space-y-2">
                <p>Subscription Status: Not Subscribed</p>
                <Link href="/pricing" className="hover:text-purple-400">Click to go to pricing</Link>
              </div>
            }    
          </div>   
        </div>
      )}
    </div>
  )
}

export default Profile