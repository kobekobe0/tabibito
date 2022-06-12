import React, { useState, useEffect } from 'react'
import { AiFillEdit, AiOutlineLogout } from 'react-icons/ai'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
const EditProfile = ({
    id,
    pfp,
    bg,
    username,
    bio,
    following,
    followers,
    saves,
    editProfile,
    handleChange,
    usernameChange,
    bioChange,
    handleUpdate,
}) => {
    return (
        <section className="userInfo">
            <div className="backgroundImg">
                <img
                    src={
                        bg &&
                        `http://localhost:3000/${bg.replace('background', '')}`
                    }
                    alt=""
                />
            </div>
            <div className="profile">
                <div className="profileImg">
                    <img
                        src={`http://localhost:3000/${
                            pfp && pfp.replace('pfp', '')
                        }`}
                        alt=""
                    />
                </div>
                <div className="profileInfo">
                    <div
                        className="profileTexts"
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <input
                            type="text"
                            id="edit-username"
                            value={usernameChange}
                            onChange={handleChange}
                        />

                        <textarea
                            id="edit-bio"
                            type="text"
                            value={bioChange}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profileButtons">
                        <button onClick={handleUpdate}>Update Profile</button>
                        <button>Logout</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

const VisitProfile = ({ pfp, bg, username, bio, following, followers, id }) => {
    const follow = () => {
        //decode user token in local Storage
        const userToken = localStorage.getItem('user')

        const follower = jwt_decode(userToken)
        console.log(follower)
        axios
            .post('/user/follow', {
                follower: follower.id,
                following: id,
                method: 'follow',
            })
            .then((res) => {
                console.log(res.data)
            })
    }
    const unfollow = () => {
        //decode user token in local Storage
        const userToken = localStorage.getItem('user')

        const follower = jwt_decode(userToken)
        console.log(follower)
        axios
            .post('/user/follow', {
                follower: follower.id,
                following: id,
                method: 'unfollow',
            })
            .then((res) => {
                console.log(res.data)
            })
    }
    return (
        <section className="userInfo">
            <div className="backgroundImg">
                <img
                    src={`http://localhost:3000/${
                        bg && bg.replace('background', '')
                    }`}
                />
            </div>
            <div className="profile">
                <div className="profileImg">
                    <img
                        src={`http://localhost:3000/${
                            pfp && pfp.replace('pfp', '')
                        }`}
                        alt=""
                    />
                </div>
                <div className="profileInfo">
                    <div className="profileTexts">
                        <h3>{username}</h3>
                        <p>{bio}</p>
                    </div>
                    <div className="profileButtons">
                        <button onClick={follow}>follow</button>
                        <button onClick={unfollow}>unfollow</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

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
    editProfile,
    edit,
    handleChange,
    usernameChange,
    bioChange,
    handleUpdate,
    visit,
}) {
    const logout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            //placeholder, change to real modal
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
    }

    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (id)
            axios.get(`/user/${id}`).then((res) => {
                console.log(res.data)
                setUserData(res.data)
            })
    }, [id])

    if (!edit) {
        if (!visit) {
            return (
                <section className="userInfo">
                    <div className="backgroundImg">
                        <img
                            src={
                                bg &&
                                `http://localhost:3000/${bg.replace(
                                    'background',
                                    ''
                                )}`
                            }
                            alt=""
                        />
                    </div>
                    <div className="profile">
                        <div className="profileImg">
                            <img
                                src={`http://localhost:3000/${
                                    pfp && pfp.replace('pfp', '')
                                }`}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <div className="profileTexts">
                                <h3>{username}</h3>
                                <p>{bio}</p>
                            </div>
                            <div className="profileButtons">
                                <AiFillEdit
                                    onClick={editProfile}
                                    size="2em"
                                    color="skyblue"
                                />

                                <AiOutlineLogout
                                    onClick={logout}
                                    size="2em"
                                    color="tomato"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )
        } else {
            return (
                <VisitProfile
                    pfp={userData.pfp}
                    bg={userData.background}
                    username={userData.name}
                    bio={userData.bio}
                    following={userData.following}
                    followers={userData.followers}
                    id={id}
                />
            )
        }
    } else if (edit) {
        return (
            <EditProfile
                pfp={pfp}
                bg={bg}
                username={username}
                bio={
                    'The world is like a book, those who don’t like it are afraid to close it.'
                }
                following={following}
                followers={followers}
                saves={saves}
                editProfile={editProfile}
                handleChange={handleChange}
                usernameChange={usernameChange}
                bioChange={bioChange}
                handleUpdate={handleUpdate}
            />
        )
    }
}

export default ProfileBar
