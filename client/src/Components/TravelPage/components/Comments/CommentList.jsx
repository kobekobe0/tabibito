import CommentCard from './CommentCard'

function CommentList({ comments, deleteComment, ownPost }) {
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
                        ownPost={ownPost}
                        date={comment.date}
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
