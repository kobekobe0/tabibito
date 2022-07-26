import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AiOutlineDelete } from 'react-icons/ai'
function Card({ data, edit, removeTravel }) {
    //download image from sever using path from data
    const [image, setImage] = useState('')
    useEffect(() => {
        if (data) {
            const imagePath = data.images[0].replace('uploads', '')
            setImage(imagePath)
        }
    }, [data])

    const handleOpenTravel = () => {
        window.location.href = `/travel/${data._id}`
    }

    const deleteTravel = () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            axios
                .delete(`travel/${data._id}`)
                .then((res) => {
                    console.log(res)
                })
                .then(() => {
                    removeTravel()
                })
        }
    }
    return (
        <div
            className="travelCard_img"
            onClick={edit ? null : handleOpenTravel}
        >
            {edit && (
                <div className="card-edit-overlay">
                    <AiOutlineDelete
                        onClick={deleteTravel}
                        size={50}
                        color="tomato"
                    />
                </div>
            )}

            <img
                src={`https://tabibit-o.herokuapp.com/${image}`}
                alt="travel"
            />
            <h5>
                {data.locationTown}, {data.locationCity}
            </h5>
        </div>
    )
}

export default Card
