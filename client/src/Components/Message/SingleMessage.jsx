import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef, useCallback } from 'react'
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

    const [hasMore, setHasMore] = useState(false)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [loading, setLoading] = useState(true)
    const [triggerBottom, setTriggerBottom] = useState(false)

    const lastMessageRef = useRef(null)

    // const lastMessage = useCallback(
    //     (node) => {
    //         if (observer.current) observer.current.disconnect()
    //         observer.current = new IntersectionObserver((entries) => {
    //             if (entries[0].isIntersecting) {
    //                 if (hasMore) setPage((prevPage) => prevPage + 1)
    //             }
    //         })
    //         if (node) observer.current.observe(node)
    //     },
    //     [loading]
    // )

    const loadMoreMessages = async () => {
        setLoading(true)
        try {
            await axios
                .get(`/messages/${roomId}?page=${page}&limit=${limit}`)
                .then((res) => {
                    console.log(res.data)
                    setMessages((prev) => [
                        ...res.data.result.reverse(),
                        ...prev,
                    ])
                    setPage(res?.data?.next?.page)
                    setLoading(false)
                    if (res.data.lengthData === page) setHasMore(false)
                })
        } catch (err) {
            console.log(err)
            alert(err)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (otherPersonId == '') {
            const userId = jwt_decode(localStorage.getItem('user')).id
            axios
                .post(`/rooms/${roomId}`, {
                    userId: userId,
                })
                .then((res) => {
                    setOtherPersonId(res.data.otherPersonId)
                    console.log(res.data)
                }) //query to get other person id you're talking to
            socket.emit('join_room', { room: roomId })
        }

        axios
            .get(`/messages/${roomId}?page=${page}&limit=${limit}`)
            .then((res) => {
                console.log(res.data)
                setMessages((prev) => [...prev, ...res.data?.result.reverse()])
                setLoading(false)
                if (res.data.lengthData === page) {
                    return setHasMore(false)
                }
                setHasMore(true)
                setPage(res?.data?.next.page)
                setTimeout(() => {
                    setTriggerBottom(!triggerBottom)
                }, 500)
            })
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
            setTriggerBottom(!triggerBottom)
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        })
    }, [socket])

    const handleBack = () => {
        navigate('/message')
    }

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [triggerBottom])

    const handleSendMessage = () => {
        if (message !== '') {
            socket.emit('send_message', {
                room: roomId,
                message: message,
                from: jwt_decode(localStorage.getItem('user')).id,
                to: otherPersonId,
            })

            console.log(otherPersonId)
            setTriggerBottom(!triggerBottom)
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
                    {loading && (
                        <div className="load-more-messages">Loading...</div>
                    )}
                    {hasMore && !loading ? (
                        <button
                            className="load-more-messages"
                            onClick={loadMoreMessages}
                        >
                            Load more
                        </button>
                    ) : null}
                    {messages.map((message, index) => {
                        return (
                            <div
                                ref={
                                    messages.length - 1 === index
                                        ? lastMessageRef
                                        : null
                                }
                                key={index}
                                className="message-block"
                                id={
                                    message?.from !== otherPersonId
                                        ? 'self'
                                        : 'other'
                                }
                            >
                                <p>{message?.message}</p>
                            </div>
                        )
                    })}
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
