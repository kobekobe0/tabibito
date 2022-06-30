import CommentBox from './CommentBox'
import CommentList from './CommentList'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Comments({ pfp, id }) {
    const [comments, setComments] = useState([])
    const [trigger, setTrigger] = useState(false)
    useEffect(() => {
        axios
            .get(`/comment/${id}`)
            .then((res) => {
                setComments(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const deleteComment = (commentId, userId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            //placeholder for real confirm
            axios
                .post(`/comment/${commentId}`, {
                    userId: userId,
                })
                .then((res) => {
                    console.log(commentId !== res.data._id)
                    //delete comment on comments array
                    setComments((prev) =>
                        prev.filter((comment) => comment._id !== commentId)
                    )
                })
                .catch((err) => {
                    console.log(err.message)
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
            />
        </div>
    )
}

export default Comments
