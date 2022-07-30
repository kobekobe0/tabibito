import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function MessageResultCard({ room, userId }) {
    //named room but contains user object
    const [clicked, setClicked] = useState(false)

    const navigate = useNavigate()
    const onClick = async () => {
        console.log(clicked)
        setClicked(true)
        try {
            await axios
                .post(
                    `https://tabibit-o.herokuapp.com/api/search/rooms/${userId}/${room._id}`
                )
                .then((res) => {
                    console.log(res.data)
                    navigate(`/chatroom/${res.data._id}`)
                    setClicked(false)
                })
        } catch (err) {
            setClicked(false)
            window.reload()
        }
    }

    //to={`/chatroom/${room._id}`}
    return (
        <li className="messages-list-card" onClick={!clicked && onClick}>
            <div className="messages-list-card-contents">
                <img
                    src={`https://tabibit-o.herokuapp.com/${room.pfp.replace(
                        'pfp',
                        ''
                    )}`}
                />
                <div className="messages-card-texts">
                    <h3>{room.name}</h3>
                </div>
            </div>
        </li>
    )
}

export default MessageResultCard
