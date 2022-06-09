import { AiOutlineHeart, AiOutlineHeartFill } from 'react-icons/ai'
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

    useEffect(() => {
        axios.get(`/user/${data.userId}`).then((res) => {
            console.log(res.data)
            setPfp(res.data.pfp.replace('pfp', ''))
            setUsername(res.data.name)

            if (res.data._id === jwt_decode(localStorage.getItem('user')).id) {
                setOwn(true)
            }
        })
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
                                    src={`http://localhost:3000/${item.replace(
                                        'uploads',
                                        ''
                                    )}`}
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
                            src={`http://localhost:3000/${pfp}`}
                            alt=""
                            width={'40px'}
                        />
                        <div className="feed-description-header-text">
                            <h3 onClick={handleTitleClick}>{data.title}</h3>
                            <h5 onClick={handleClickUser}>{username}</h5>
                        </div>
                    </div>
                    <div className="feed-description-header-buttons">
                        <AiOutlineHeart color="tomato" size={30} />
                        <BsBookmark color="gold" size={25} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
