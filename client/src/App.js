import './App.css'
import Register from './Components/Register/Register.jsx'
import Login from './Components/Login/Login.jsx'
import Home from './Components/Home/Home'
import Modal from './Components/Modal/Modal'
import './Components/Home/navbar.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import TravelPage from './Components/TravelPage/TravelPage'
import PublicFeed from './Components/Feed/PublicFeed'
import { QueryClient, QueryClientProvider } from 'react-query'
import Search from './Components/Search/Search'
import VerifyPage from './Components/Verify/VerifyPage'
import Message from './Components/Message/Message'
import FollowingFeed from './Components/Feed/FollowingFeed'
import SingleMessage from './Components/Message/SingleMessage'
import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'

const socket = io('https://tabibit-o.herokuapp.com/')
const queryClient = new QueryClient()

function App() {
    const [notification, setNotification] = useState([])
    useEffect(() => {
        if (localStorage.getItem('user')) {
            const userId = jwt_decode(localStorage.getItem('user')).id
            socket.emit('p2p_connection', {
                userId: userId,
            })
            socket.on('p2p_message_receive', (data) => {
                //trigger notification
            })
        }
    }, [socket, localStorage.getItem('user')])
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/post" element={<Modal />} />
                        <Route
                            exact
                            path="/travel/:id"
                            element={<TravelPage />}
                        />
                        <Route exact path="/profile/:id" element={<Home />} />
                        <Route
                            exact
                            path="/public"
                            element={<PublicFeed content="public" />}
                        />
                        <Route
                            exact
                            path="/following"
                            element={<FollowingFeed content="following" />}
                        />
                        <Route exact path="/search" element={<Search />} />
                        <Route
                            exact
                            path="/verify/:ticketId"
                            element={<VerifyPage />}
                        />
                        <Route
                            exact
                            path="/message"
                            element={<Message socket={socket} />}
                        />
                        <Route
                            exact
                            path="/chatroom/:roomId"
                            element={<SingleMessage socket={socket} />}
                        />

                        <Route exact path="/" element={<Home />} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </>
    )
}

export default App
