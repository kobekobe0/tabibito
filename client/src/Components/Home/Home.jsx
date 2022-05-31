import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import './home.css'
import './travel.css'
import TravelCards from './TravelCards'
import ProfileBar from './ProfileBar'
import './navbar.css'

function Home() {
    //function for fetching data from the server
    const [user, setUser] = useState({})
    const [id, setId] = useState('')
    const [edit, setEdit] = useState(false)

    const [username, setUsername] = useState(user.name)
    const [bio, setBio] = useState('')

    useEffect(() => {
        const token = window.localStorage.getItem('user')
        const url = window.location.href
        console.log(url)
        if (url.includes('profile')) {
            //extract id in url
            const id = url.split('/')
            const length = id.length - 1
            console.log(id[length])
            setId(id[length])
        }
        if (token) {
            //decode jwt token
            let userData = jwt_decode(token)
            console.log(userData)
            setUser(userData)
            console.log(user)
            if (!userData) {
                window.localStorage.removeItem('user')
                window.location.href = '/login'
            } else {
                //fetch data
            }
        } else {
            window.location.href = '/login'
        }
    }, [])

    useEffect(() => {
        setUsername(user.name)
        setBio(user.bio)
    }, [user])

    const editProfile = () => {
        setEdit(!edit)
    }

    const handleChange = (e) => {
        if (e.target.id === 'edit-username') {
            setUsername(e.target.value)
        } else if (e.target.id === 'edit-bio') {
            setBio(e.target.value)
        }
    }

    //supply data to the profile bar  -  placeholder
    return (
        <div className="home">
            <main>
                <ProfileBar
                    id={id !== '' ? id : user.id}
                    pfp={user.pfp}
                    bg={user.background}
                    username={user.name}
                    bio={user.bio}
                    following={user.following}
                    followers={user.followers}
                    saves={user.saves}
                    editProfile={editProfile}
                    edit={edit}
                    handleChange={handleChange}
                    usernameChange={username}
                    bioChange={bio}
                />
                <TravelCards id={id !== '' ? id : user.id} />
            </main>
        </div>
    )
}

export default Home
