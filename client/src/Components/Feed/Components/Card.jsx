import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsBookmark, BsBookmarksFill } from 'react-icons/bs'
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from 'react-icons/bs'
import { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

function Card({ innerRef, data }) {
    const [index, setIndex] = useState(0)
    const [pfp, setPfp] = useState('')
    const [username, setUsername] = useState('')
    const [own, setOwn] = useState(false)
    const [ID, setID] = useState('')
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        const USER = jwt_decode(localStorage.getItem('user'))
        axios.get(`/user/${data.userId}`).then((res) => {
            console.log(res.data)
            setPfp(res.data.pfp.replace('pfp', ''))
            setUsername(res.data.name)
            setID(USER.id)
            console.log(USER.id)

            if (res.data._id === jwt_decode(localStorage.getItem('user')).id) {
                setOwn(true)
            }
        })

        if (data.likes.includes(USER.id)) {
            setLiked(true)
        }
    }, [])

    const handleTitleClick = () => {
        window.location.href = `/travel/${data._id}`
    }

    const handleClickUser = () => {
        if (own) {
            return (window.location.href = '/')
        }
        window.location.href = `/profile/${data.userId}`
    }

    const handleLike = () => {
        console.log(ID)
        axios
            .put(`/travel/${data._id}/like`, {
                userId: ID,
                method: 'like',
            })
            .then((res) => {
                console.log(res.data)
                setLiked(true)
            })
    }
    const handleUnLike = () => {
        console.log(ID)
        axios
            .put(`/travel/${data._id}/like`, {
                userId: ID,
                method: 'unlike',
            })
            .then((res) => {
                console.log(res.data)
                setLiked(false)
            })
    }

    const handleSave = () => {
        axios
            .put(`/travel/${data._id}/save`, {
                userId: ID,
                method: 'save',
            })
            .then((res) => {
                console.log(res.data)
                setSaved(true)
            })
    }

    const handleUnSave = () => {
        axios
            .put(`/travel/${data._id}/save`, {
                userId: ID,
                method: 'unsave',
            })
            .then((res) => {
                console.log(res.data)
                setSaved(false)
            })
    }

    return (
        <div className="feed-card" ref={innerRef}>
            <div className="card-header">
                <div className="carousel">
                    {index !== 0 && (
                        <BsFillArrowLeftCircleFill
                            className="prev"
                            onClick={() => setIndex(index - 1)}
                        />
                    )}

                    {data &&
                        data.images.map((item, i) =>
                            i == index ? (
                                <img
                                    key={i}
                                    src={`https://tabibit-o.herokuapp.com/${item.replace(
                                        'uploads',
                                        ''
                                    )}`}
                                    onClick={handleTitleClick}
                                    style={{ cursor: 'pointer' }}
                                />
                            ) : null
                        )}
                    {index !== data.images.length - 1 && (
                        <BsFillArrowRightCircleFill
                            className="next"
                            onClick={() => setIndex(index + 1)}
                        />
                    )}
                    {index == 0 && (
                        <div className="feed-card-overlay">
                            <p>
                                {data.locationTown}, {data.locationCity}
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="feed-description">
                <div className="feed-description-header">
                    <div className="feed-description-header-user">
                        <img
                            src={`https://tabibit-o.herokuapp.com/${pfp}`}
                            alt=""
                            width={'40px'}
                        />
                        <div className="feed-description-header-text">
                            <h3 onClick={handleTitleClick}>{data.title}</h3>
                            <h5 onClick={handleClickUser}>{username}</h5>
                        </div>
                    </div>
                    <div className="feed-description-header-buttons">
                        {liked ? (
                            <AiFillHeart
                                onClick={handleUnLike}
                                color="tomato"
                                size={30}
                            />
                        ) : (
                            <AiOutlineHeart
                                onClick={handleLike}
                                color="tomato"
                                size={30}
                            />
                        )}

                        {saved ? (
                            <BsBookmarksFill
                                color="gold"
                                size={25}
                                onClick={handleUnSave}
                            />
                        ) : (
                            <BsBookmark
                                color="gold"
                                size={25}
                                onClick={handleSave}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
