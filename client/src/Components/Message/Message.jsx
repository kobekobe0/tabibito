import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SingleMessage from './SingleMessage'
import MessageCard from './MessageCard'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import './message.css'
import Navbar from '../Navbar/Navbar'
import MessageResultCard from './MessageResultCard'
import { BiSearch } from 'react-icons/bi'

function Message({ socket }) {
    const [rooms, setRooms] = useState([]) //query the database for all rooms
    const [userId, setUserId] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const tempId = jwtDecode(localStorage.getItem('user')).id
        axios.get(`/rooms/${tempId}`).then((res) => {
            console.log(res.data)
            setRooms((prev) => res.data)
        })
        setUserId(tempId)
    }, [])

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data)
        })
        return () => {
            socket.off('receive_message')
        }
    }, [socket])

    const handleSearchPeople = (e) => {
        setSearchResults([])
        setLoading(true)
        axios
            .get(`/rooms/search/${userId}?searchQuery=${searchQuery}`)
            .then((res) => {
                console.log(res.data)
                setSearchResults(res.data)
                setSearchQuery('')
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
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
                        <div className="search-messages">
                            <input
                                type="text"
                                placeholder="search your patrons or supported people"
                                className="messages-search-box"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button onClick={handleSearchPeople}>
                                <BiSearch size={27} color="white" />
                            </button>
                        </div>
                    </div>

                    <ul className="messages-list">
                        {loading ? (
                            <div className="loading-message">
                                <h1>Loading...</h1>
                            </div>
                        ) : null}
                        {searchResults.map((room) => {
                            console.log(room)
                            return (
                                <MessageResultCard
                                    room={room}
                                    socket={socket}
                                    key={room._id}
                                    userId={userId}
                                />
                            )
                        })}

                        {searchResults.length == 0 && !loading
                            ? rooms.map((room) => (
                                  <MessageCard
                                      room={room}
                                      socket={socket}
                                      key={room._id}
                                  />
                              ))
                            : null}
                    </ul>
                </div>
            </div>
            <Navbar />
        </>
    )
}

export default Message
