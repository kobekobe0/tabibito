const Comment = require('../../models/comment.model')
const UserData = require('../../models/register.model')
const Travel = require('../../models/travel.model')
const createComment = async (req, res) => {
    const { userId, postId, comment } = req.body
    try {
        if (await UserData.findById(userId)) {
            if (comment === '') {
                return res.status(400).json({
                    message: 'Comment is required',
                })
            }
            const newComment = await Comment.create({
                userId,
                postId,
                comment,
            })
            return res.status(201).json(newComment)
        }
        return res.status(404).json({
            message: 'User not found',
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteComment = async (req, res) => {
    const { commentId } = req.params
    const { userId, postId } = req.body
    try {
        const comment = await Comment.findOne({
            _id: commentId,
        })

        const post = await Travel.findById(postId)

        if (userId !== comment.userId) {
            if (post.userId == userId) {
                const deleted = await comment.deleteOne()

                const newComments = await Comment.find({
                    postId: postId,
                })
                if (!comment) {
                    return res.status(404).json({
                        message: 'Comment not found',
                    })
                }
                return res.status(200).json({
                    message: 'Comment deleted',
                    data: deleted,
                    newComments: newComments,
                })
            }

            return res.status(401).json({
                message: 'You are not authorized to delete this comment',
            })
        }
        const deleted = await comment.deleteOne()

        const newComments = await Comment.find({
            postId: postId,
        })
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found',
            })
        }
        res.status(200).json({
            message: 'Comment deleted',
            data: deleted,
            newComments: newComments,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const editComment = async (req, res) => {
    const { newComment, userId } = req.body
    const { commentId } = req.params
    try {
        const comment = await Comment.findById(commentId)
        if (userId !== comment.userId) {
            return res.status(401).json({
                message: 'You are not authorized to delete this comment',
            })
        }

        const toEdit = await comment.updateOne({
            $set: {
                comment: newComment,
            },
        })

        if (!toEdit) {
            return res.status(404).json({
                message: 'Comment not found',
            })
        }
        res.status(200).json({
            message: 'Comment edited',
            data: toEdit,
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getCommentByIdPostId = async (req, res) => {
    const { postId } = req.params
    try {
        const comments = await Comment.find({ postId }).sort({ date: -1 })
        if (!comments) {
            return res.status(404).json({
                message: 'Comments not found',
            })
        }
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createComment,
    deleteComment,
    editComment,
    getCommentByIdPostId,
}
