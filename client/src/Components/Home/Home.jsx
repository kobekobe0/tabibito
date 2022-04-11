import React, { useEffect } from 'react'
import axios from 'axios'

function Home() {
    //function for fetching data from the server

    useEffect(() => {
        const token = window.localStorage.getItem('user')
        if (token) {
            //decode jwt token

            if (!user) {
                window.localStorage.removeItem('user')
                window.location.href = '/login'
            } else {
                //fetch data
            }
        }
    }, [])
    return <div>Home</div>
}

export default Home
