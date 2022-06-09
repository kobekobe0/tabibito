import { useEffect, useState, useRef, useCallback } from 'react'
import './PublicFeed.css'
import jwt_decode from 'jwt-decode'

import axios from 'axios'
import Card from './Components/Card'

function PublicFeed() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [profileImg, setProfileImg] = useState('')
    const [limit, setLimit] = useState(2)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)

    const observer = useRef()
    const lastTravelCard = useCallback(
        (node) => {
            if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    if (hasMore) setPage((prevPage) => prevPage + 1)
                }
            })
            if (node) observer.current.observe(node)
        },
        [loading]
    )

    const goToProfile = () => {
        window.location.href = '/'
    }

    useEffect(() => {
        try {
            axios
                .get(`/travel/public?page=${page}&limit=${limit}`)
                .then((res) => {
                    setData((prev) => [...prev, ...res.data.result])
                    console.log(res.data)
                    setLoading(false)

                    if (res.data.lengthData === page) {
                        return setHasMore(false)
                    }
                    setHasMore(true)
                })
        } catch (e) {}
    }, [page])
    return (
        <>
            {' '}
            <div className="public-feed">
                <main>
                    <div className="feed-header">
                        <h1>TABIBITO</h1>

                        <img
                            onClick={goToProfile}
                            src={`http://localhost:3000/\anya.jpg`}
                            alt=""
                        />
                    </div>
                    <div className="feed-content">
                        {data &&
                            data.map((item, i) => {
                                if (data.length === i + 1) {
                                    return (
                                        <Card
                                            innerRef={lastTravelCard}
                                            key={item._id}
                                            data={item}
                                            profileImg={profileImg}
                                        />
                                    )
                                } else {
                                    return (
                                        <Card
                                            key={item._id}
                                            data={item}
                                            profileImg={profileImg}
                                        />
                                    )
                                }
                            })}
                    </div>
                </main>
            </div>
        </>
    )
}

export default PublicFeed
