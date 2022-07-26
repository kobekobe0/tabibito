import React, { useState, useEffect } from 'react'
import {
    AiFillEdit,
    AiOutlineLogout,
    AiOutlineUserAdd,
    AiOutlineUserDelete,
    AiFillSave,
} from 'react-icons/ai'
import { MdCancel } from 'react-icons/md'
import { ImFilePicture } from 'react-icons/im'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import FollowModal from '../Follows/FollowModal'
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
    handlePfpUpdate,
    patrons,
    supporting,
    closeEdit,
}) => {
    const [pfpImg, setPfpImg] = useState('')
    const [bgImg, setBgImg] = useState('')

    const handleBgChange = async (e) => {
        const selectedFile = e.target.files[0]
        const imgURL = await URL.createObjectURL(selectedFile)

        setBgImg(imgURL)
        handleBgUpdate(selectedFile)
    }
    const handlePfpChange = async (e) => {
        const selectedFile = e.target.files[0]
        const imgURL = await URL.createObjectURL(selectedFile)

        setPfpImg(imgURL)
        handlePfpUpdate(selectedFile)
    }

    return (
        <section className="userInfo">
            <div className="backgroundImg">
                {bgImg !== '' ? (
                    <img src={bgImg} alt="" />
                ) : (
                    <img
                        src={
                            bg &&
                            `https://tabibit-o.herokuapp.com/${bg.replace(
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
                        onChange={handleBgChange}
                    />
                </div>
            </div>
            <div className="profile">
                <div className="profileImg">
                    {pfpImg !== '' ? (
                        <img src={pfpImg} alt="" />
                    ) : (
                        <img
                            src={`https://tabibit-o.herokuapp.com/${
                                pfp && pfp.replace('pfp', '')
                            }`}
                            alt=""
                        />
                    )}
                    <div className="edit-pfp-container">
                        <label for="edit-pfp">
                            <ImFilePicture color="smokewhite" size={35} />
                        </label>
                        <input
                            type="file"
                            id="edit-pfp"
                            accept="image"
                            onChange={handlePfpChange}
                        />
                    </div>
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
                        <div className="follows">
                            <p>
                                Followers{' '}
                                <span>{patrons && patrons.length}</span>
                            </p>
                            <p>
                                Following{' '}
                                <span>{supporting && supporting.length}</span>
                            </p>
                        </div>

                        <textarea
                            id="edit-bio"
                            type="text"
                            value={bioChange}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profileButtons">
                        <AiFillSave
                            onClick={handleUpdate}
                            size="2em"
                            color="gold"
                        />
                        <MdCancel
                            size="2em"
                            color="tomato"
                            onClick={closeEdit}
                        />
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
    modal,
    modalType,
    closeModal,
    patrons,
    supporting,
    openPatronsModal,
    openSupportingModal,
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
            {modal && (
                <FollowModal
                    ids={modalType == 'Patrons' ? patrons : supporting}
                    type={modalType}
                    closeModal={closeModal}
                />
            )}
            <div className="backgroundImg">
                <img
                    src={`https://tabibit-o.herokuapp.com/${
                        bg && bg.replace('background', '')
                    }`}
                />
            </div>
            <div className="profile">
                <div className="profileImg">
                    <img
                        src={`https://tabibit-o.herokuapp.com/${
                            pfp && pfp.replace('pfp', '')
                        }`}
                        onClick={() => console.log(propsIsFollowing)}
                    />
                </div>
                <div className="profileInfo">
                    <div className="profileTexts">
                        <h3>{username}</h3>
                        <div className="follows">
                            <p
                                onClick={openPatronsModal}
                                style={{ cursor: 'pointer' }}
                            >
                                Patrons <span>{patrons && patrons.length}</span>
                            </p>
                            <p
                                onClick={openSupportingModal}
                                style={{ cursor: 'pointer' }}
                            >
                                Supporting{' '}
                                <span>{patrons && supporting.length}</span>
                            </p>
                        </div>
                        <p>{bio}</p>
                    </div>
                    <div className="profileButtons">
                        {!propsIsFollowing ? (
                            <AiOutlineUserAdd
                                onClick={follow}
                                size="2em"
                                color="skyblue"
                            />
                        ) : (
                            <AiOutlineUserDelete
                                onClick={unfollow}
                                size="2em"
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
    handlePfpUpdate,
    closeEdit,
}) {
    const logout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            //placeholder, change to real modal
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
    }

    const [userData, setUserData] = useState({})
    const [patrons, setPatrons] = useState([])
    const [supporting, setSupporting] = useState([])
    const [isFollowing, setIsFollowing] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalType, setModalType] = useState('')

    useEffect(() => {
        const userToken = localStorage.getItem('user')
        const user = jwt_decode(userToken)
        console.log(user)
        if (id)
            axios.get(`/user/${id}`).then((res) => {
                console.log(res.data)
                setUserData(res.data)
                setPatrons(res.data.followers)
                setSupporting(res.data.following)

                //wait for setUserData to be set

                console.log(res.data.followers.includes(user.id))
                console.log(res.data.followers)
                if (res.data.followers.includes(user.id)) {
                    setIsFollowing(true)
                }
            })
    }, [id])

    const closeModal = () => {
        setModal(false)
    }
    const openPatronsModal = () => {
        setModal(true)
        setModalType('Patrons')
    }
    const openSupportingModal = () => {
        setModal(true)
        setModalType('Supporting')
    }

    if (!edit) {
        if (!visit) {
            return (
                <section className="userInfo">
                    {modal && (
                        <FollowModal
                            ids={modalType == 'Patrons' ? patrons : supporting}
                            type={modalType}
                            closeModal={closeModal}
                        />
                    )}

                    <div className="backgroundImg">
                        <img
                            src={
                                bg &&
                                `https://tabibit-o.herokuapp.com/${bg.replace(
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
                                src={`https://tabibit-o.herokuapp.com/${
                                    pfp && pfp.replace('pfp', '')
                                }`}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <div className="profileTexts">
                                <h3>{username}</h3>
                                <div className="follows">
                                    <p
                                        onClick={openPatronsModal}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Patrons{' '}
                                        <span>{patrons && patrons.length}</span>
                                    </p>
                                    <p
                                        onClick={openSupportingModal}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        Supporting{' '}
                                        <span>
                                            {patrons && supporting.length}
                                        </span>
                                    </p>
                                </div>
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
                    patrons={patrons}
                    supporting={supporting}
                    modal={modal}
                    modalType={modalType}
                    closeModal={closeModal}
                    openPatronsModal={openPatronsModal}
                    openSupportingModal={openSupportingModal}
                    closeEdit={closeEdit}
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
                handlePfpUpdate={handlePfpUpdate}
                patrons={patrons}
                supporting={supporting}
                closeEdit={closeEdit}
            />
        )
    }
}

export default ProfileBar
