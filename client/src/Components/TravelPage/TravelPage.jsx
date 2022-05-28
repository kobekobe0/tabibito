import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './travelpage.css'
import { useParams } from 'react-router-dom'
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
                        <div>
                            <h2>{data.title}</h2>
                        </div>
                    </section>
                    <section className="post-description"></section>
                </div>
            </div>
        </>
    )
}

export default TravelPage
