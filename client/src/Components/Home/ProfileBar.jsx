import React from 'react'
import bg from '../../images/login2.jpg'
import profile from '../../images/profile.jpg'

//placeholder for profile bar
function ProfileBar() {
    return (
        <section className="userInfo">
            <div className="backgroundImg">
                <img src={bg} alt="" />
            </div>
            <div className="profile">
                <div className="profileImg">
                    <img src={profile} alt="" />
                </div>
                <div className="profileInfo">
                    <div className="profileTexts">
                        <h3>Kobekoblanca</h3>
                        <p>
                            “The world is a book and those who do not travel
                            read only one page.”
                        </p>
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
