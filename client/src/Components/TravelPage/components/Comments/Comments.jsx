import CommentBox from './CommentBox'
import CommentList from './CommentList'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Comments({ pfp, id }) {
    const [comments, setComments] = useState([])

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
            />
        </div>
    )
}

export default Comments
