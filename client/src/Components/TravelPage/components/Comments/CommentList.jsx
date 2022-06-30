import CommentCard from './CommentCard'
import axios from 'axios'

function CommentList({ comments, deleteComment }) {
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
                        key={comment._id}
                    />
                ))}
                {comments.length === 0 && (
                    <p className="no-comments" style={{ textAlign: 'center' }}>
                        No comments yet.
                    </p>
                )}
            </ul>
        </div>
    )
}

export default CommentList
