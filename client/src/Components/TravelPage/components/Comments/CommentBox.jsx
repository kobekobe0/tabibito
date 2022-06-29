import React from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useState } from 'react'

function CommentBox({ pfp, id, setComments, comments }) {
    const [comment, setComment] = useState('')

    const handlePost = (e) => {
        e.preventDefault()
        const userId = jwt_decode(localStorage.getItem('user')).id
        console.log('clicked')
        if (comment !== '') {
            return axios
                .post('/comment', {
                    userId: userId,
                    postId: id,
                    comment: comment,
                })
                .then((res) => {
                    console.log(res)
                    setComments((prev) => [res.data, ...prev])
                    setComment('')
                })
                .catch((err) => {
                    alert(err)
                })
        }
    }

    return (
        <div className="comment-form">
            <div className="comment-profile-img">
                <img
                    src={
                        pfp && `http://localhost:3000/${pfp.replace('pfp', '')}`
                    }
                    style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                    }}
                />
            </div>

            <input
                type="text"
                placeholder="Write a comment..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            />
            <button disabled={comment == ''} onClick={handlePost}>
                Post
            </button>
        </div>
    )
}

export default CommentBox
