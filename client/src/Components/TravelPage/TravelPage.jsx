import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './travelpage.css'
import { useParams } from 'react-router-dom'

import pfp from '../../images/profile.jpg' //placeholder profile picture

import Images from './components/Images'
import Description from './components/Description'
function TravelPage() {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [image, setImage] = useState([])
    const [counter, setCounter] = useState(0)
    const [date, setDate] = useState('')
    const months = [
        'Jan',
        'Feb',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const [show, setShow] = useState(false)

    useEffect(() => {
        setData({})
        axios
            .get(`http://localhost:3000/api/travel/${id}`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        setImage([])
        if (data.images) {
            data.images.forEach((image) => {
                const imagePath = image.replace('uploads', '')
                console.log(imagePath)
                setImage((prev) => [...prev, imagePath])
            })
        }
        let dateObj = new Date('2021-09-16T10:20:00.000Z')
        console.log(dateObj)
        let year = dateObj.getFullYear()
        console.log(year)
        let month = dateObj.getMonth()
        console.log(month)
        let dt = dateObj.getDate()

        setDate(months[month] + ' ' + dt + ', ' + year)
    }, [data])

    const next = async (i) => {
        if (counter < image.length - 1) {
            setCounter(counter + 1)
        }

        if (counter === image.length - 1) {
            setCounter(0)
        }
        console.log(counter + 1)
        console.log(typeof image.length)
    }

    const prev = (i) => {
        if (counter > 0) {
            setCounter(counter - 1)
        }

        console.log(counter)
    }

    return (
        <>
            <div className="travel-page">
                <div className="main">
                    <Images
                        image={image}
                        counter={counter}
                        next={next}
                        prev={prev}
                        setShow={setShow}
                        show={show}
                        data={data}
                        pfp={pfp}
                        date={date}
                        setCounter={setCounter}
                    />
                    <Description data={data} />
                </div>
            </div>
        </>
    )
}

export default TravelPage
