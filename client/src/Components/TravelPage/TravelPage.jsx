import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './travelpage.css'
import { useParams } from 'react-router-dom'
function TravelPage() {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [image, setImage] = useState([])
    const [counter, setCounter] = useState(1)
    const [imageToShow, setImageToShow] = useState(image[0])
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/travel/${id}`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        if (data.images) {
            data.images.forEach((image) => {
                const imagePath = image.replace('uploads', '')
                console.log(imagePath)
                setImage((prev) => [...prev, imagePath])
            })
        }
    }, [data])

    useEffect(() => {
        setImageToShow(image[0])
    }, [image])

    const next = async () => {
        setCounter(counter + 1)
        setImageToShow(image[counter])
        console.log(counter)
    }

    const prev = () => {
        setCounter(counter - 1)
        setImageToShow(image[counter])
        console.log(image[counter])
    }
    return (
        <>
            <div className="travel-page">
                <div className="main">
                    <section className="image-holder">
                        <div className="image-slider">
                            {counter < image.length ? (
                                <div onClick={next}>next</div>
                            ) : null}

                            {counter == image.length || counter !== 1 ? (
                                <div onClick={prev}>prev</div>
                            ) : null}
                            <img
                                src={`http://localhost:3000/${imageToShow}`}
                                alt=""
                                style={{ width: '300px' }}
                            />
                        </div>
                    </section>
                    <section className="post-description"></section>
                </div>
            </div>
        </>
    )
}

export default TravelPage
