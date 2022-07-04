import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
//send message request here (emit in socket io)
//jpin room here
//for every message, update room dateModified
function SingleMessage({ socket }) {
    const { roomId } = useParams()
    const [message, setMessage] = useState('')
    const [otherPersonId, setOtherPersonId] = useState('')
    const [otherUser, setOtherUser] = useState('')
    useEffect(() => {
        const userId = jwt_decode(localStorage.getItem('user')).id
        axios
            .post(`/rooms/${roomId}`, {
                userId: userId,
            })
            .then((res) => {
                setOtherPersonId(res.data.otherPersonId)
                console.log(res.data)
            })

        socket.emit('join_room', { room: roomId })
    }, [])

    useEffect(() => {
        axios.get(`/user/${otherPersonId}`).then((res) => {
            console.log(res.data)
            setOtherUser(res.data)
        })
    }, [otherPersonId])

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
            setMessage(data.message)
        })
    }, [socket])

    const handleSendMessage = () => {
        if (message !== '') {
            socket.emit('send_message', {
                room: roomId,
                message: message,
                from: jwt_decode(localStorage.getItem('user')).id,
                to: otherPersonId,
            })

            socket.emit('p2p_notification', {
                userId: otherPersonId,
                message: message,
                notification: true,
            })
            setMessage('')
        }
    }
    //use roomId params to get messages and otherPerson's ID
    return (
        <div>
            {roomId}
            <input type="text" onChange={(e) => setMessage(e.target.value)} />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}

export default SingleMessage
