import { AiOutlineHeart, AiOutlineHeartFill } from 'react-icons/ai'
import { BsBookmark, BsBookmarksFill } from 'react-icons/bs'
import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from 'react-icons/bs'
import { useState } from 'react'
function Card({ innerRef, data }) {
    const [index, setIndex] = useState(0)

    return (
        <div className="feed-card" ref={innerRef}>
            <div className="card-header">
                <div className="carousel" style={{ height: '600px' }}>
                    {index !== 0 && (
                        <BsFillArrowLeftCircleFill
                            className="prev"
                            onClick={() => setIndex(index - 1)}
                        />
                    )}

                    {data &&
                        data.images.map((item, i) =>
                            i == index ? (
                                <img
                                    key={i}
                                    src={`http://localhost:3000/${item.replace(
                                        'uploads',
                                        ''
                                    )}`}
                                />
                            ) : null
                        )}
                    {index !== data.images.length - 1 && (
                        <BsFillArrowRightCircleFill
                            className="next"
                            onClick={() => setIndex(index + 1)}
                        />
                    )}
                </div>
            </div>
            <div className="feed-description">
                <div className="feed-description-header">
                    <div className="feed-description-header-user">
                        <img
                            src={`http://localhost:3000/anya.jpg`}
                            alt=""
                            width={'50px'}
                        />
                        <div className="feed-description-header-text">
                            <h3>{data.title}</h3>
                            <h5>Sept. 5, 2022</h5>
                        </div>
                    </div>
                    <div className="feed-description-header-buttons">
                        <AiOutlineHeart color="tomato" size={30} />
                        <BsBookmark color="gold" size={25} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
