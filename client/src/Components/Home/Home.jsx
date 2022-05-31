import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import './home.css'
import './travel.css'
import TravelCards from './TravelCards'
import ProfileBar from './ProfileBar'
import './navbar.css'
import axios from 'axios'

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

    const handleUpdate = () => {
        //confirmation
        if (window.confirm('Are you sure you want to update your profile?')) {
            axios
                .put(`/user/${user.id}`, {
                    name: username,
                    bio: bio,
                    pfp: user.pfp,
                    background: user.background,
                })
                .then((res) => {
                    console.log(res)
                    //ask user if he/she's sure

                    //update user in local storage
                    window.localStorage.setItem('user', res.data)
                    window.location.reload()
                })
        }
    }

    useEffect(() => {
        //limit the length of bio

        setBio(user.bio)

        setUsername(user.name)
    }, [user])

    const editProfile = () => {
        setEdit(!edit)
    }
    const removeEmptySpaces = (stringVal) => {
        let str = /\s/g.test(stringVal)
        if (str) {
            return stringVal.replace(/\s/g, '')
        }
        return stringVal
    }
    const handleChange = (e) => {
        if (e.target.id === 'edit-username') {
            if (username.length <= 15) {
                setUsername(removeEmptySpaces(e.target.value))
            }
        } else if (e.target.id === 'edit-bio') {
            if (bio.length <= 80) {
                setBio(e.target.value)
            }
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
                    handleUpdate={handleUpdate}
                />
                <TravelCards id={id !== '' ? id : user.id} />
            </main>
        </div>
    )
}

export default Home
