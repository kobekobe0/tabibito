import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './travelpage.css'
import { useParams } from 'react-router-dom'
import { BsBookmark } from 'react-icons/bs'
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import { BsFillPeopleFill } from 'react-icons/bs'
import pfp from '../../images/profile.jpg' //placeholder profile picture
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
                    <section className="image-holder">
                        <div className="image-slider">
                            {image
                                ? image.map((image, index) => (
                                      <>
                                          <img
                                              src={`http://localhost:3000/${image}`}
                                              alt="travel"
                                              style={{
                                                  display:
                                                      counter === index
                                                          ? 'block'
                                                          : 'none',
                                                  opacity:
                                                      counter === index
                                                          ? '1'
                                                          : '0',
                                                  objectFit:
                                                      index === 0 && 'cover',
                                              }}
                                              id={`image${index}`}
                                              className="image"
                                          />
                                          {image.length > counter && (
                                              <div
                                                  id="next"
                                                  onClick={() => next(index)}
                                                  style={{
                                                      display:
                                                          image.length !==
                                                          counter + 1
                                                              ? null
                                                              : 'none',
                                                  }}
                                              >
                                                  <BsFillArrowRightCircleFill />
                                              </div>
                                          )}
                                          {counter > 0 ? (
                                              <div
                                                  id="prev"
                                                  onClick={() => prev(index)}
                                              >
                                                  <BsFillArrowLeftCircleFill />
                                              </div>
                                          ) : null}
                                      </>
                                  ))
                                : null}
                            <div
                                className="viewfull-image"
                                onClick={() => setShow(!show)}
                            >
                                <p>View full image</p>
                            </div>
                        </div>
                        <div
                            style={{ display: show ? 'flex' : 'none' }}
                            className="image-modal"
                        >
                            <div className="close-modal">
                                <AiOutlineClose
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setShow(false)}
                                    color="red"
                                    size={30}
                                />
                            </div>
                            <div className="imagemodal-image">
                                <img
                                    src={`http://localhost:3000/${image[counter]}`}
                                    alt=""
                                />
                                {image.length > counter && (
                                    <div
                                        id="next"
                                        onClick={() => next(1)}
                                        style={{
                                            display:
                                                image.length !== counter + 1
                                                    ? null
                                                    : 'none',
                                        }}
                                    >
                                        <BsFillArrowRightCircleFill size={25} />
                                    </div>
                                )}
                                {counter > 0 ? (
                                    <div id="prev" onClick={() => prev(1)}>
                                        <BsFillArrowLeftCircleFill size={25} />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        {image.map((image, index) => (
                            <img
                                src={`http://localhost:3000/${image}`}
                                alt=""
                                style={{
                                    width: '25px',
                                    alignSelf: 'center',
                                    cursor: 'pointer',
                                    border:
                                        counter === index
                                            ? '2px solid white'
                                            : null,
                                }}
                                onClick={() => setCounter(index)}
                            />
                        ))}
                        <div className="travelpage-info">
                            <div className="travel-header">
                                <div className="travel-title">
                                    <h2>{data.title}</h2>
                                    <h3>
                                        {data.locationTown}, {data.locationCity}
                                        , {data.locationCountry}
                                    </h3>
                                    <div id="user-info">
                                        <div className="pfp">
                                            <img
                                                src={pfp}
                                                alt=""
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    objectFit: 'cover',
                                                    borderRadius: '50%',
                                                }}
                                            />
                                        </div>
                                        <div className="texts">
                                            <h3 id="username">
                                                {data.username}
                                            </h3>
                                            <h4 id="date">{date}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="travel-like">
                                    <BsBookmark color="gold" size={30} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="post-description">
                        <div className="description">
                            <pre>{data.description}</pre>
                        </div>
                        <div className="other-info">
                            <div className="other-info-left">
                                <h4>Budget</h4>
                                <div className="budgets">
                                    <p>
                                        Accomodation:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {data.accommodation &&
                                                data.accommodation
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ','
                                                    )}
                                        </span>
                                    </p>
                                    <p>
                                        Transportaion:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {data.accommodation &&
                                                data.transportation
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ','
                                                    )}
                                        </span>
                                    </p>
                                    <p>
                                        Food:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {data.accommodation &&
                                                data.food
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ','
                                                    )}
                                        </span>
                                    </p>
                                    <p>
                                        Other:{' '}
                                        <span style={{ fontWeight: 'bold' }}>
                                            {data.accommodation &&
                                                data.other
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        ','
                                                    )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="other-info-right">
                                <h4>Transportation type</h4>
                                <p>{data.transportationType}</p>
                                <h4>Traveler's location</h4>
                                <p>
                                    {data.travelerTown}, {data.travelerCity},{' '}
                                    {data.travelerCountry}
                                </p>
                                <h4>Head count</h4>
                                <p>
                                    <BsFillPeopleFill size={20} />{' '}
                                    {data.travelerCount} ={' '}
                                    {(data.accommodation +
                                        data.food +
                                        data.other +
                                        data.transportation) /
                                        data.travelerCount}
                                    {'/person'}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default TravelPage
