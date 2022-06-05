import { useEffect, useState } from 'react'
import './PublicFeed.css'
import jwt_decode from 'jwt-decode'

function PublicFeed() {
    const [profileImg, setProfileImg] = useState('')
    useEffect(() => {
        //get token from localStorage
        const token = window.localStorage.getItem('user')
        if (token) {
            //decode token
            let userData = jwt_decode(token)
            console.log(userData)
            setProfileImg(userData.pfp.replace('pfp', ''))
        }
    })
    return (
        <>
            {' '}
            <div className="public-feed">
                <main>
                    <div className="feed-header">
                        <h1>EXPLORE 🧭</h1>
                        <img
                            src={`http://localhost:3000/${profileImg}`}
                            alt=""
                        />
                    </div>
                </main>
            </div>
        </>
    )
}

export default PublicFeed
