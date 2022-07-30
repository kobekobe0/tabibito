import CommentBox from './CommentBox'
import CommentList from './CommentList'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Comments({ pfp, id, ownPost }) {
    const [comments, setComments] = useState([])
    useEffect(() => {
        axios
            .get(`/comment/${id}`)
            .then((res) => {
                setComments(res.data)
            })
            .catch((err) => {
                alert(err)
            })
    }, [])

    const deleteComment = (commentId, userId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            //placeholder for real confirm
            axios
                .post(`/comment/${commentId}`, {
                    userId: userId,
                    postId: id,
                })
                .then((res) => {
                    //delete comment on comments array
                    setComments((prev) =>
                        prev.filter((comment) => comment._id !== commentId)
                    )
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
    }
    return (
        <div className="comment-container">
            <h3 className="comments-header">Add Comment Below</h3>
            <CommentBox
                pfp={pfp}
                id={id}
                setComments={setComments}
                comments={comments}
            />
            <CommentList
                id={id}
                comments={comments}
                setComments={setComments}
                deleteComment={deleteComment}
                ownPost={ownPost}
            />
        </div>
    )
}

export default Comments
