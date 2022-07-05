import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SingleMessage from './SingleMessage'
import MessageCard from './MessageCard'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import './message.css'
import Navbar from '../Navbar/Navbar'

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
    //make a route that returns userId
    //after search and click on a user, if the two parties doesn't have a joint room,
    //create one and then redirect to the chatroom, otherwise redirect to the existing room
    return (
        <>
            <div className="travel-page" style={{ color: 'white' }}>
                <div className="main">
                    <div className="messages-header">
                        <h1 className="messages-header-text">Messages</h1>
                        <input
                            type="text"
                            placeholder="search people"
                            className="messages-search-box"
                        />
                    </div>

                    <ul className="messages-list">
                        {rooms.map((room) => (
                            <MessageCard
                                room={room}
                                socket={socket}
                                key={room._id}
                            />
                        ))}
                    </ul>
                </div>
            </div>
            <Navbar />
        </>
    )
}

export default Message
