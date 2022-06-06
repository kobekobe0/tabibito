import { useEffect, useState } from 'react'
import './PublicFeed.css'
import jwt_decode from 'jwt-decode'
import { AiOutlineHeart, AiOutlineHeartFill } from 'react-icons/ai'
import { BsBookmark, BsBookmarksFill } from 'react-icons/bs'

function PublicFeed() {
    const [profileImg, setProfileImg] = useState('')
    useEffect(() => {
        //get token from localStorage
        const token = window.localStorage.getItem('user')
        if (token) {
            //decode token
            let userData = jwt_decode(token)
            console.log(userData)
            setProfileImg(userData.pfp.replace('pfp', ''))
        }
    })

    const goToProfile = () => {
        window.location.href = '/'
    }
    return (
        <>
            {' '}
            <div className="public-feed">
                <main>
                    <div className="feed-header">
                        <h1>TABIBITO 🧭</h1>
                        <img
                            onClick={goToProfile}
                            src={`http://localhost:3000/${profileImg}`}
                            alt=""
                        />
                    </div>
                    <div className="feed-content">
                        <div className="feed-card">
                            <div className="card-header">
                                <img
                                    style={{ width: '100%' }}
                                    src={`http://localhost:3000/imageUpload-1653806035576.jpg`}
                                />
                            </div>
                            <div className="feed-description">
                                <div className="feed-description-header">
                                    <div className="feed-description-header-user">
                                        <img
                                            src={`http://localhost:3000/${profileImg}`}
                                            alt=""
                                            width={'50px'}
                                        />
                                        <div className="feed-description-header-text">
                                            <h3>Kobekoblanca</h3>
                                            <h5>Sept. 5, 2022</h5>
                                        </div>
                                    </div>
                                    <div className="feed-description-header-buttons">
                                        <AiOutlineHeart
                                            color="tomato"
                                            size={30}
                                        />
                                        <BsBookmark color="gold" size={25} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feed-card">
                            <div className="card-header">
                                <img
                                    style={{ width: '100%' }}
                                    src={`http://localhost:3000/imageUpload-1653806035576.jpg`}
                                />
                            </div>
                            <div className="feed-description">
                                <div className="feed-description-header">
                                    <div className="feed-description-header-user">
                                        <img
                                            src={`http://localhost:3000/${profileImg}`}
                                            alt=""
                                            width={'50px'}
                                        />
                                        <div className="feed-description-header-text">
                                            <h3>Kobekoblanca</h3>
                                            <h5>Sept. 5, 2022</h5>
                                        </div>
                                    </div>
                                    <div className="feed-description-header-buttons">
                                        <AiOutlineHeart
                                            color="tomato"
                                            size={30}
                                        />
                                        <BsBookmark color="gold" size={25} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feed-card">
                            <div className="card-header">
                                <img
                                    style={{ width: '100%' }}
                                    src={`http://localhost:3000/imageUpload-1653806035576.jpg`}
                                />
                            </div>
                            <div className="feed-description">
                                <div className="feed-description-header">
                                    <div className="feed-description-header-user">
                                        <img
                                            src={`http://localhost:3000/${profileImg}`}
                                            alt=""
                                            width={'50px'}
                                        />
                                        <div className="feed-description-header-text">
                                            <h3>Kobekoblanca</h3>
                                            <h5>Sept. 5, 2022</h5>
                                        </div>
                                    </div>
                                    <div className="feed-description-header-buttons">
                                        <AiOutlineHeart
                                            color="tomato"
                                            size={30}
                                        />
                                        <BsBookmark color="gold" size={25} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feed-card">
                            <div className="card-header">
                                <img
                                    style={{ width: '100%' }}
                                    src={`http://localhost:3000/imageUpload-1653806035576.jpg`}
                                />
                            </div>
                            <div className="feed-description">
                                <div className="feed-description-header">
                                    <div className="feed-description-header-user">
                                        <img
                                            src={`http://localhost:3000/${profileImg}`}
                                            alt=""
                                            width={'50px'}
                                        />
                                        <div className="feed-description-header-text">
                                            <h3>Kobekoblanca</h3>
                                            <h5>Sept. 5, 2022</h5>
                                        </div>
                                    </div>
                                    <div className="feed-description-header-buttons">
                                        <AiOutlineHeart
                                            color="tomato"
                                            size={30}
                                        />
                                        <BsBookmark color="gold" size={25} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default PublicFeed
