import React, { useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import './home.css'
import './travel.css'
import TravelCards from './TravelCards'
import ProfileBar from './ProfileBar'
import './navbar.css'

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
                <ProfileBar />
                <TravelCards />
            </main>
        </div>
    )
}

export default Home
