/* app/page.tsx */
'use client'

import { useEffect, useState } from 'react'
import { client, exploreProfiles } from '../app/api'
import Link from 'next/link'

export default function Home() {
  /* create initial state to hold array of profiles */
  const [profiles, setProfiles] = useState<any>([])
  useEffect(() => {
    fetchProfiles()
  }, [])
  async function fetchProfiles() {
    try {
      /* fetch profiles from Lens API */
      let response = await client.query({ query: exploreProfiles })
      /* return profiles with profile pics  */
      let profileData = await Promise.all(response.data.exploreProfiles.items.filter(async profileInfo => {
        return profileInfo.picture.__typename === 'MediaSet'
      }))

      /* update the local state with the profiles array */
      setProfiles(profileData)
    } catch (err) {
      console.log({ err })
    }
  }
  return (
    <div className='pt-20'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-5xl mb-6 font-bold'>Hello Lens 🌿</h1>
        {
          profiles.map(profile => (
            <div key={profile.id} className='w-2/3 shadow-md p-6 rounded-lg mb-8 flex flex-col items-center'>
              <img className='w-48' src={profile.picture.original.url} />
              <p className='text-xl text-center mt-6'>{profile.name}</p>
              <p className='text-base text-gray-400  text-center mt-2'>{profile.bio}</p>
              <Link href={`/profile/${profile.handle}`}>
                <p className='cursor-pointer text-violet-600 text-lg font-medium text-center mt-2 mb-2'>{profile.handle}</p>
              </Link>
              <p className='text-pink-600 text-sm font-medium text-center'>{profile.stats.totalFollowers} followers</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}