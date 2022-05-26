import React, { useEffect, useState } from 'react'
import bg from '../../images/login2.jpg'
import axios from 'axios'
function Card({ data }) {
    //download image from sever using path from data
    const [image, setImage] = useState('')
    useEffect(() => {
        if (data) {
            const imagePath = data.images[0].replace('uploads', '')
            setImage(imagePath)
        }
    }, [data])

    return (
        <div className="travelCard_img">
            <img src={`http://localhost:3000/${image}`} alt="travel" />
            <h5>
                {data.locationTown}, {data.locationCity}
            </h5>
        </div>
    )
}

export default Card
