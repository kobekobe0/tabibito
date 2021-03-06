import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './travelpage.css'
import { useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import '../Feed/PublicFeed.css'
import Images from './components/Images'
import Description from './components/Description'
import { CheckUserExistsOther } from '../../CheckUserExists'

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
    const [pfp, setPfp] = useState('')
    useEffect(() => {
        CheckUserExistsOther()
        setData({})
        axios
            .get(`travel/${id}`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {})
    }, [])
    useEffect(() => {
        setImage([])
        if (data.images) {
            data.images.forEach((image) => {
                const imagePath = image.replace('uploads', '')
                setImage((prev) => [...prev, imagePath])
            })
        }
        let dateObj = new Date(data.Date)
        let year = dateObj.getFullYear()
        let month = dateObj.getMonth()
        let dt = dateObj.getDate()

        setDate(months[month] + ' ' + dt + ', ' + year)

        const pfp = jwtDecode(localStorage.getItem('user')).pfp.replace(
            'pfp',
            ''
        )

        setPfp(pfp)
    }, [data])

    const next = async (i) => {
        if (counter < image.length - 1) {
            setCounter(counter + 1)
        }

        if (counter === image.length - 1) {
            setCounter(0)
        }
    }

    const prev = (i) => {
        if (counter > 0) {
            setCounter(counter - 1)
        }
    }

    const goToProfile = () => {
        window.location.href = `/`
    }

    const goToFeed = () => {
        window.location.href = `/public`
    }

    return (
        <>
            <div className="feed-header">
                <h1 onClick={goToFeed}>TABIBITO</h1>

                <img
                    onClick={goToProfile}
                    src={`https://tabibit-o.herokuapp.com/${pfp}`}
                    alt=""
                />
            </div>
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
                    <Description
                        data={data}
                        pfp={pfp}
                        date={date}
                        setCounter={setCounter}
                        id={id}
                    />
                </div>
            </div>
        </>
    )
}

export default TravelPage
