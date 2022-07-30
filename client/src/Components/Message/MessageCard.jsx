import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
function MessageCard({ room, socket }) {
    const [otherPersonId, setOtherPersonId] = useState('')
    const [pfp, setPfp] = useState('')
    const [name, setName] = useState('')
    const [lastMessage, setLastMessage] = useState('')

    useEffect(() => {
        if (room.participant1 === jwt_decode(localStorage.getItem('user')).id) {
            setOtherPersonId(room.participant2)
        } else {
            setOtherPersonId(room.participant1)
        }
    }, [])

    useEffect(() => {
        console.log(otherPersonId)
        axios.get(`/user/${otherPersonId}`).then((res) => {
            setPfp(() => res.data.pfp.replace('pfp', ''))
            setName(() => res.data.name)
        })
    }, [otherPersonId])

    useEffect(() => {
        axios.get(`/lastmessage/${room._id}`).then((res) => {
            setLastMessage(res.data.message)
        })
        //getlast message here if socket changes
    }, [socket])

    return (
        <li key={room._id} className="messages-list-card">
            <Link
                to={`/chatroom/${room._id}`}
                className="messages-list-card-contents"
            >
                <img src={`https://tabibit-o.herokuapp.com/${pfp}`} />
                <div className="messages-card-texts">
                    <h3>{name}</h3>
                    <p>
                        {lastMessage == ''
                            ? 'send hi'
                            : lastMessage.length > 30
                            ? lastMessage.slice(0, 30) + '...'
                            : lastMessage}
                    </p>
                    <p>{new Date(room.dateModified).getTime()}</p>
                </div>
            </Link>
        </li>
    )
}

export default MessageCard
