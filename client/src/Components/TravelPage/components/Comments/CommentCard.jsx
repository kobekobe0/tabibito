import { useEffect, useState } from 'react'
import axios from 'axios'
import { AiFillSave } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import jwt_decode from 'jwt-decode'
function CommentCard({
    deleteComment,
    id,
    userId,
    likes,
    comment,
    ownPost,
    date,
}) {
    const [pfp, setPfp] = useState('')
    const [username, setUsername] = useState('')
    const [edit, setEdit] = useState(false)
    const [commentToDisplay, setCommentToDisplay] = useState(comment)
    const [editComment, setEditComment] = useState(comment)
    const [owner, setOwner] = useState(false)
    const [dateToShow, setDateToShow] = useState('')

    useEffect(() => {
        axios.get(`/user/${userId}`).then((res) => {
            setPfp(res.data.pfp)
            setUsername(res.data.name)
        })

        const token = localStorage.getItem('user')
        const decoded = jwt_decode(token)
        if (decoded.id === userId) {
            setOwner(true)
        }

        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]

        const splitted = date.split('-')
        const last = splitted[2].split('T')[0]
        setDateToShow(
            months[parseInt(splitted[1]) - 1] + ' ' + last + ', ' + splitted[0]
        ) //converts date from db to desired format
    }, [])

    const updateComment = (e) => {
        e.preventDefault()
        if (editComment !== '') {
            if (editComment == commentToDisplay) return setEdit(false)
            if (editComment.length > 300) return alert('Comment too long')
            const token = localStorage.getItem('user')
            const decoded = jwt_decode(token)
            axios
                .put(`/comment/${id}`, {
                    newComment: editComment,
                    userId: decoded.id,
                })
                .then((res) => {
                    setEdit(false)
                    setCommentToDisplay(editComment)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    return (
        <li className="comment-single">
            <div className="comment-single-wrapper">
                <div className="comment-single-texts">
                    <img
                        src={
                            pfp &&
                            `https://tabibit-o.herokuapp.com/${pfp.replace(
                                'pfp',
                                ''
                            )}`
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
                                <h5>{dateToShow}</h5>
                            </div>

                            {edit ? (
                                <AiFillSave
                                    className="more-btn dropdown"
                                    size="1.5em"
                                    onClick={updateComment}
                                    color="#00bcd4"
                                    cursor={'pointer'}
                                />
                            ) : owner || ownPost ? (
                                <div className="more-btn dropdown">
                                    <BsThreeDots
                                        className="dropbtn"
                                        size="1.2em"
                                    />
                                    <div className="dropdown-content">
                                        {ownPost && !owner ? (
                                            <a
                                                href="#"
                                                onClick={() =>
                                                    deleteComment(
                                                        id,
                                                        jwt_decode(
                                                            localStorage.getItem(
                                                                'user'
                                                            )
                                                        ).id
                                                    )
                                                }
                                            >
                                                Delete
                                            </a>
                                        ) : (
                                            <>
                                                <a
                                                    href="#"
                                                    onClick={() =>
                                                        setEdit(true)
                                                    }
                                                >
                                                    Edit
                                                </a>
                                                <a
                                                    href="#"
                                                    onClick={() =>
                                                        deleteComment(
                                                            id,
                                                            jwt_decode(
                                                                localStorage.getItem(
                                                                    'user'
                                                                )
                                                            ).id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        {edit ? (
                            <div className="comment-edit-container">
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setEditComment(e.target.value)
                                    }
                                    value={editComment}
                                    maxLength="300"
                                />
                            </div>
                        ) : (
                            <p>{commentToDisplay}</p>
                        )}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CommentCard
