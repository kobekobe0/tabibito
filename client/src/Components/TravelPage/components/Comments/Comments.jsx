import CommentBox from './CommentBox'
import CommentList from './CommentList'

function Comments({ pfp }) {
    return (
        <div className="comment-container">
            <h3 className="comments-header">Add Comment Below</h3>
            <CommentBox pfp={pfp} />
            <CommentList pfp={pfp} />
        </div>
    )
}

export default Comments
