import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SingleMessage from './SingleMessage'
import MessageCard from './MessageCard'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import './message.css'
import Navbar from '../Navbar/Navbar'
import MessageResultCard from './MessageResultCard'

function Message({ socket }) {
    const [rooms, setRooms] = useState([]) //query the database for all rooms
    const [userId, setUserId] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const tempId = jwtDecode(localStorage.getItem('user')).id
        axios.get(`/rooms/${tempId}`).then((res) => {
            setRooms((prev) => res.data)
        })
        setUserId(tempId)
    }, [])

    useEffect(() => {
        socket.on('receive_message', (data) => {})
        return () => {
            socket.off('receive_message')
        }
    }, [socket])

    const handleSearchPeople = (e) => {
        setSearchResults([])
        //searchpeopleroute
        axios
            .get(`/rooms/search/${userId}?searchQuery=${e.target.value}`)
            .then((res) => {
                setSearchResults(res.data)
            })
    }

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
                            placeholder="search your patrons or supported people"
                            className="messages-search-box"
                            onSubmit={handleSearchPeople}
                        />
                        <button onClick={handleSearchPeople}>Search</button>
                    </div>

                    <ul className="messages-list">
                        {searchResults.map((room) => (
                            <MessageResultCard />
                        ))}

                        {searchResults.length == 0 &&
                            rooms.map((room) => (
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
