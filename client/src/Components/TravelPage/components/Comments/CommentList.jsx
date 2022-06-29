import CommentCard from './CommentCard'
import axios from 'axios'

function CommentList({ id, comments, setComments }) {
    const deleteComment = (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            //placeholder for real confirm
            axios
                .delete(`/comment/${commentId}`)
                .then((res) => {
                    setComments((prev) =>
                        prev.filter((comment) => comment._id !== commentId)
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    return (
        <div className="comment-list">
            <ul>
                {comments.map((comment) => (
                    <CommentCard
                        deleteComment={deleteComment}
                        id={comment._id}
                        userId={comment.userId}
                        likes={comment.likes}
                        comment={comment.comment}
                    />
                ))}
                {comments.length === 0 && (
                    <p className="no-comments" style={{ textAlign: 'center' }}>
                        No comments yet!
                    </p>
                )}
            </ul>
        </div>
    )
}

export default CommentList
