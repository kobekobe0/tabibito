import React from 'react'
import { AiFillEdit, AiOutlineLogout } from 'react-icons/ai'

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
}) {
    const logout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            //placeholder, change to real modal
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
    }
    if (!edit) {
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
