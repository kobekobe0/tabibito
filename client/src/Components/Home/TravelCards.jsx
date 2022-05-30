import axios from 'axios'
import React, { useEffect, useState } from 'react'
import bg from '../../images/login2.jpg'
import Card from './Card'

function TravelCards({ id }) {
    const handleNewClick = () => {
        window.location.href = '/post'
    }

    const [userId, setUserId] = useState(id)
    const [travels, setTravels] = useState([])

    useEffect(() => {
        axios.get(`travel/user/${userId}`).then((res) => {
            console.log(res)
            setTravels(res.data)
        })
    }, [userId])
    useEffect(() => {
        setUserId(id)
    }, [id])

    return (
        <section className="travels">
            <div className="header">
                <h4>Travels</h4>
            </div>
            <div className="travelCards">
                <div className="travelCard">
                    <div className="travelCard_img" onClick={handleNewClick}>
                        <img src={bg} alt="travel" />
                        <h5>+ADD NEW TRAVEL</h5>
                    </div>
                    {travels.map((travel, index) => {
                        return <Card key={index} data={travel} />
                    })}
                </div>
            </div>
        </section>
    )
}

export default TravelCards
