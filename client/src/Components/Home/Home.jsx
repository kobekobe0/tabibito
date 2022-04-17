import React, { useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import './home.css'
import bg from '../../images/login2.jpg'
import profile from '../../images/profile.jpg'

function Home() {
    //function for fetching data from the server

    useEffect(() => {
        const token = window.localStorage.getItem('user')
        if (token) {
            //decode jwt token
            let user = jwt_decode(token)
            console.log(user)
            if (!user) {
                window.localStorage.removeItem('user')
                window.location.href = '/login'
            } else {
                //fetch data
            }
        } else {
            window.location.href = '/login'
        }
    }, [])
    return (
        <div className="home">
            <main>
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
                                    “The world is a book and those who do not
                                    travel read only one page.”
                                </p>
                            </div>
                            <div className="profileButtons">
                                <button>Edit Profile</button>
                                <button>Logout</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section></section>
                <section></section>
            </main>
        </div>
    )
}

export default Home
