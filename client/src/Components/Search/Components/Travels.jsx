import { useEffect, useState } from 'react'
import axios from 'axios'
function Travels({ userId, town, city, img, title, id }) {
    const [pfp, setPfp] = useState('')
    const [username, setUsername] = useState('')
    useEffect(() => {
        axios.get(`/user/${userId}`).then((res) => {
            setPfp(res.data.pfp)
            setUsername(res.data.name)
        })
    }, [])
    const handleClick = () => {
        window.location.href = `/travel/${id}`
    }
    return (
        <div className="travels-data" key={img} onClick={handleClick}>
            <img
                className="background-travel-result"
                src={`https://tabibit-o.herokuapp.com/${img.replace(
                    'uploads',
                    ''
                )}`}
            />
            <div className="overlay-travel-result">
                <img
                    src={`https://tabibit-o.herokuapp.com/${pfp.replace(
                        'pfp',
                        ''
                    )}`}
                    alt=""
                    style={{ width: '50px', height: '50px' }}
                />
                <div>
                    <h4>
                        <span>{town}</span>, <span>{city}</span>
                    </h4>
                    <h5>{title}</h5>
                    <h6>{username}</h6>
                </div>
            </div>
        </div>
    )
}

export default Travels
