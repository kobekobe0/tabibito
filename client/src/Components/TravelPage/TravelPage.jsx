import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './travelpage.css'
import { useParams } from 'react-router-dom'
import { BsBookmark } from 'react-icons/bs'
function TravelPage() {
    const { id } = useParams()
    const [data, setData] = useState({})
    const [image, setImage] = useState([])
    const [counter, setCounter] = useState(0)

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
    }, [data])

    const next = async (i) => {
        if (counter < image.length - 1) {
            setCounter(counter + 1)
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
                                                  next
                                              </div>
                                          )}
                                          {counter > 0 ? (
                                              <div
                                                  id="prev"
                                                  onClick={() => prev(index)}
                                              >
                                                  prev
                                              </div>
                                          ) : null}
                                      </>
                                  ))
                                : null}
                        </div>
                        <div className="travelpage-info">
                            <div className="travel-header">
                                <div className="travel-title">
                                    <h2>{data.title}</h2>
                                    <div id="user-info">
                                        <h3 id="username">{data.username}</h3>
                                        <h4 id="date">{data.Date}</h4>
                                    </div>

                                    <h3>
                                        {data.locationTown}, {data.locationCity}
                                    </h3>
                                </div>
                                <div className="travel-like">
                                    <BsBookmark color="gold" size={30} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="post-description"></section>
                </div>
            </div>
        </>
    )
}

export default TravelPage
