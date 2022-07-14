import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { MdArrowBackIos } from 'react-icons/md'

//send message request here (emit in socket io)
//jpin room here
//for every message, update room dateModified

function SingleMessage({ socket }) {
    const { roomId } = useParams()
    const [message, setMessage] = useState('')
    const [otherPersonId, setOtherPersonId] = useState('')
    const [otherUser, setOtherUser] = useState('')
    const [messages, setMessages] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const userId = jwt_decode(localStorage.getItem('user')).id
        axios
            .post(`/rooms/${roomId}`, {
                userId: userId,
            })
            .then((res) => {
                setOtherPersonId(res.data.otherPersonId)
                console.log(res.data)
            }) //query to get other person id you're talking to

        axios.get(`/messages/${roomId}`).then((res) => {
            setMessages((prev) => res.data?.reverse())
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
            setMessages((prev) => [...prev, data])
        })
    }, [socket])

    const handleBack = () => {
        navigate('/message')
    }

    const handleSendMessage = () => {
        if (message !== '') {
            socket.emit('send_message', {
                room: roomId,
                message: message,
                from: jwt_decode(localStorage.getItem('user')).id,
                to: otherPersonId,
            })

            console.log(otherPersonId)

            setMessage('')
        }
    }
    //use roomId params to get messages and otherPerson's ID
    return (
        <div className="travel-page">
            <div className="main">
                <div className="chatroom-details">
                    <MdArrowBackIos
                        size="2em"
                        style={{ marginLeft: '1.5em' }}
                        onClick={handleBack}
                    />

                    <div className="chatroom-details-texts">
                        <h3>{otherUser.name}</h3>
                        <img
                            src={`http://localhost:3000/${otherUser?.pfp?.replace(
                                'pfp',
                                ''
                            )}`}
                            alt=""
                        />
                    </div>
                </div>
                <div className="chatroom-messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className="message-block"
                            id={
                                message.from !== otherPersonId
                                    ? 'self'
                                    : 'other'
                            }
                        >
                            <p>{message.message}</p>
                        </div>
                    ))}
                </div>{' '}
                <div className="chatroom-input">
                    <input
                        type="text"
                        placeholder="enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default SingleMessage
