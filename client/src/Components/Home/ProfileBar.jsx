import axios from 'axios'
import React, { useEffect } from 'react'
import bg from '../../images/login2.jpg'
import profile from '../../images/profile.jpg'

//add following, followers, saves
function ProfileBar({
    id,
    pfp,
    bg,
    username,
    bio,
    following,
    followers,
    saves,
}) {
    return (
        <section className="userInfo">
            <div className="backgroundImg">
                <img
                    src={`http://localhost:3000/${bg.replace(
                        'background',
                        ''
                    )}`}
                    alt=""
                />
            </div>
            <div className="profile">
                <div className="profileImg">
                    <img
                        src={`http://localhost:3000/${pfp.replace('pfp', '')}`}
                        alt=""
                    />
                </div>
                <div className="profileInfo">
                    <div className="profileTexts">
                        <h3>{username}</h3>
                        <p>{bio}</p>
                    </div>
                    <div className="profileButtons">
                        <button>Edit Profile</button>
                        <button>Logout</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfileBar
