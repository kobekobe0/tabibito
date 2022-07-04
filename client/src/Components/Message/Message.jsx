import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SingleMessage from './SingleMessage'
import MessageCard from './MessageCard'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

function Message({ socket }) {
    const [room, setRoom] = useState('')
    const [name, setName] = useState('')
    const [rooms, setRooms] = useState([]) //query the database for all rooms

    const handleSubmit = (e) => {
        e.preventDefault()

        socket.emit('join_room', { name, room })
    }

    useEffect(() => {
        axios
            .get(`/rooms/${jwtDecode(localStorage.getItem('user')).id}`)
            .then((res) => {
                console.log(res.data)
                setRooms((prev) => res.data)
            })
    }, [])

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
        })
    }, [socket])

    //make a route that finds a room by userId and otherPersonId
    //pass the roomId as props

    // this will have ul of message boxes
    // then when you click one of the boxes it will emit a join_room event
    // and the server will emit a join_room event to specific client with the room name
    return (
        <>
            <div className="travel-page" style={{ color: 'white' }}>
                <div className="main">
                    <h1>CHATS</h1>
                    <ul>
                        {rooms.map((room) => (
                            <MessageCard
                                room={room}
                                socket={socket}
                                key={room._id}
                            />
                        ))}
                    </ul>
                </div>
                <div className="messages"></div>
            </div>
        </>
    )
}

export default Message
