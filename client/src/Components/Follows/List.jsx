import { useEffect, useState } from 'react'
import axios from 'axios'
import { ImWindows } from 'react-icons/im'

function List({ id }) {
    const [pfp, setPfp] = useState('')
    const [username, setUsername] = useState('')

    useEffect(() => {
        axios.get(`/user/${id}`).then((res) => {
            setPfp(res.data.pfp)
            setUsername(res.data.name)
        })
    }, [id])

    const handleListClick = () => {
        window.location.href = `/profile/${id}`
    }

    return (
        <li onClick={handleListClick}>
            <img
                src={`https://tabibit-o.herokuapp.com/${pfp.replace(
                    'pfp',
                    ''
                )}`}
                alt={username}
                style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                }}
            />
            <span>{username}</span>
        </li>
    )
}

export default List
