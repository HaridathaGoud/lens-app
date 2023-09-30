"use client"
import Link from 'next/link'
import React from 'react';
import { useExploreProfiles } from '@lens-protocol/react-web';
import 'bootstrap/dist/css/bootstrap.css';



const CreateProfile = () => {
    const { data: profile } = useExploreProfiles({
        limit: 12
    })

    return (<>
        <h1 style={{ textAlign: 'center', fontSize: '40px', textDecoration: 'none' }}>New Profile-Displaying Practise Page</h1>
        <button className='btn btn-outline-info' style={{ margin: '15px' }}><Link href={'/'}>Go Back</Link></button>
        <div className='row'>
            {
                profile?.map((profile) =>
                (<div className='col-md-2'>
                    <div className="card" style={{ width: "15rem",backgroundColor:'cadetblue' }}>
                        {
                            profile.picture && profile.picture.__typename === 'MediaSet' ? (
                                <img src={profile.picture.original.url}
                                    width='120'
                                    height='120'
                                    alt={profile.handle} className="card-img-top" />
                            ) : <div className="w-14 h-14 bg-slate-500	" />
                        }
                        <div className="card-body">
                            <h5 className="card-title">{profile.handle}/</h5>
                            <p className="card-text">{profile.bio}.</p>
                            <a href="#" className="btn btn-primary">like</a>
                        </div>
                    </div>
                </div>
                ))
            }
        </div>


    </>)
}

export default CreateProfile 