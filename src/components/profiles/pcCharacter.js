import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react' 

const SavedPCs = () => {
  const [characterName, setCharacterName] = useState()
  const supabase = useSupabaseClient()
  const user = useUser()

  useEffect(() => {
    console.log({user: user})
    const savedPCs = async () => {
      const { data, error } = await supabase
        .from('premium_content')
        .select('pc_id')
        .eq('id', user.id)
        .single()
        console.log(data, error)
  
      setCharacterName(data?.pc_id)
    }

    savedPCs()
  }, [supabase, user])

  return (
    <div className="relative inline-block text-left px-2">
      <div>
        <p className="text-center">Saved PC&apos;s</p>
        <p>{characterName}</p>
      </div>
    </div>
  );
}

export default SavedPCs;