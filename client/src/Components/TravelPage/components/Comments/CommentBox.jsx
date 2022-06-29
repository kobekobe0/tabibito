import React from 'react'

function CommentBox({ pfp }) {
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

            <input type="text" placeholder="Write a comment..." />
            <button>Post</button>
        </div>
    )
}

export default CommentBox
