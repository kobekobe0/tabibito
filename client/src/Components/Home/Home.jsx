import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import './home.css'
import './travel.css'
import TravelCards from './TravelCards'
import ProfileBar from './ProfileBar'
import './navbar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { MdPublic } from 'react-icons/md'
import Navbar from '../Navbar/Navbar'
import Compressor from 'compressorjs'
import { CheckUserExistsHome } from '../../CheckUserExists'
function Home() {
    //function for fetching data from the server
    const [user, setUser] = useState({})
    const [id, setId] = useState('')
    const [edit, setEdit] = useState(false)
    const [visit, setVisit] = useState(false)
    const [username, setUsername] = useState(user.name)
    const [bio, setBio] = useState('')
    const [uploadBg, setUploadBg] = useState('')
    const [uploadPfp, setUploadPfp] = useState('')

    useEffect(() => {
        CheckUserExistsHome(setId, setVisit, setUser)
    }, [])

    const handleBgUpdate = (file) => {
        new Compressor(file, {
            quality: 0.6,
            convertTypes: ['image/jpeg'],
            success: (compressedResult) => {
                setUploadBg(compressedResult)
            },
        })
    }

    const handlePfpUpdate = (file) => {
        new Compressor(file, {
            quality: 0.9,
            convertTypes: ['image/jpeg'],
            width: 600,
            height: 600,
            success: (compressedResult) => {
                setUploadPfp(compressedResult)
            },
        })
    }

    const handleUpdate = () => {
        //confirmation
        if (window.confirm('Are you sure you want to update your profile?')) {
            const formData = new FormData()

            formData.append('name', username)
            formData.append('bio', bio)
            formData.append('background', user.background)
            formData.append('pfp', user.pfp)
            console.log(uploadBg)
            if (uploadBg !== '') {
                formData.append('backgroundUpload', uploadBg)
            }
            if (uploadPfp !== '') {
                formData.append('profileUpload', uploadPfp)
            }

            axios.put(`/user/${user.id}`, formData).then((res) => {
                console.log(res)
                //ask user if he/she's sure

                //update user in local storage
                window.localStorage.setItem('user', res.data)
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
    const closeEdit = () => {
        setEdit(false)
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
        <>
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
                        visit={visit}
                        handleBgUpdate={handleBgUpdate}
                        handlePfpUpdate={handlePfpUpdate}
                        closeEdit={closeEdit}
                    />
                    <TravelCards id={id !== '' ? id : user.id} edit={edit} />
                </main>
            </div>
            <Navbar />
        </>
    )
}

export default Home
