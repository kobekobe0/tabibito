import React, { useState, useEffect } from 'react'
import {
    AiFillEdit,
    AiOutlineLogout,
    AiOutlineUserAdd,
    AiOutlineUserDelete,
} from 'react-icons/ai'
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
    handleBgUpdate,
}) => {
    const [pfpImg, setPfpImg] = useState('')
    const [bgImg, setBgImg] = useState('')

    const handleOnChange = async (e) => {
        const selectedFile = e.target.files[0]

        const imgURL = await URL.createObjectURL(selectedFile)
        //setImages((prevState) => prevState.concat(selectedFilesArray))
        setBgImg(imgURL)
        handleBgUpdate(selectedFile)
    }

    useEffect(() => {
        setPfpImg(pfp)
    }, [])
    return (
        <section className="userInfo">
            <div className="backgroundImg">
                {bgImg !== '' ? (
                    <img src={bgImg} alt="" />
                ) : (
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
                )}
                <div className="edit-bg-container">
                    <label for="edit-bg">Upload New Background</label>
                    <input
                        type="file"
                        id="edit-bg"
                        accept="image"
                        onChange={handleOnChange}
                    />
                </div>
            </div>
            <div className="profile">
                <div className="profileImg">
                    <img
                        src={`http://localhost:3000/${
                            pfp && pfpImg.replace('pfp', '')
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

const VisitProfile = ({
    pfp,
    bg,
    username,
    bio,
    following,
    followers,
    id,
    isFollowing,
}) => {
    const [followerID, setFollowerID] = useState('')
    const [followBack, setFollowBack] = useState(false)
    const [propsIsFollowing, setPropsIsFollowing] = useState(isFollowing)
    const follow = () => {
        axios
            .post('/user/follow', {
                follower: followerID,
                following: id,
                method: 'follow',
            })
            .then((res) => {
                console.log(res.data)
            })

        setPropsIsFollowing(true)
    }
    const unfollow = () => {
        axios
            .post('/user/follow', {
                follower: followerID,
                following: id,
                method: 'unfollow',
            })
            .then((res) => {
                console.log(res.data)
            })
        setPropsIsFollowing(false)
    }

    useEffect(() => {
        const userToken = localStorage.getItem('user')
        const follower = jwt_decode(userToken)
        console.log(follower.id)
        console.log(id)

        setFollowerID(follower.id)
        setPropsIsFollowing(isFollowing)
        console.log(propsIsFollowing)
    }, [isFollowing])
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
                        onClick={() => console.log(propsIsFollowing)}
                    />
                </div>
                <div className="profileInfo">
                    <div className="profileTexts">
                        <h3>{username}</h3>
                        <p>{bio}</p>
                    </div>
                    <div className="profileButtons">
                        {!propsIsFollowing ? (
                            <AiOutlineUserAdd
                                onClick={follow}
                                size={25}
                                color="skyblue"
                            />
                        ) : (
                            <AiOutlineUserDelete
                                onClick={unfollow}
                                size={25}
                                color="tomato"
                            />
                        )}
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
    handleBgUpdate,
}) {
    const logout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            //placeholder, change to real modal
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
    }

    const [userData, setUserData] = useState({})
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        const userToken = localStorage.getItem('user')
        const user = jwt_decode(userToken)
        console.log(user)
        if (id)
            axios.get(`/user/${id}`).then((res) => {
                console.log(res.data)
                setUserData(res.data)

                //wait for setUserData to be set

                console.log(res.data.followers.includes(user.id))
                console.log(res.data.followers)
                if (res.data.followers.includes(user.id)) {
                    setIsFollowing(true)
                }
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
                    isFollowing={isFollowing}
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
                handleBgUpdate={handleBgUpdate}
            />
        )
    }
}

export default ProfileBar
