import { useEffect, useState } from 'react'
import axios from 'axios'

import { BsThreeDots } from 'react-icons/bs'
function CommentCard({ deleteComment, id, userId, likes, comment }) {
    const [pfp, setPfp] = useState('')
    const [username, setUsername] = useState('')

    useEffect(() => {
        axios.get(`/user/${userId}`).then((res) => {
            setPfp(res.data.pfp)
            setUsername(res.data.name)
        })
    }, [])

    return (
        <li className="comment-single">
            <div className="comment-single-wrapper">
                <div className="comment-single-texts">
                    <img
                        src={
                            pfp &&
                            `http://localhost:3000/${pfp.replace('pfp', '')}`
                        }
                        style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                        }}
                    />
                    <div className="comment-single-top">
                        <div className="comment-single-top-texts">
                            <div className="comment-details">
                                <h4>{username}</h4>
                                <h5>1hr ago(dummy time)</h5>
                            </div>

                            <div className="more-btn dropdown">
                                <BsThreeDots className="dropbtn" size="1.2em" />
                                <div className="dropdown-content">
                                    <a href="#">Edit</a>
                                    <a
                                        href="#"
                                        onClick={() => deleteComment(id)}
                                    >
                                        Delete
                                    </a>
                                </div>
                            </div>
                        </div>
                        <p>{comment}</p>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CommentCard
