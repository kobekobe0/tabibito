import { AiOutlineHeart, AiOutlineHeartFill } from 'react-icons/ai'
import { BsBookmark, BsBookmarksFill } from 'react-icons/bs'

function Card({ innerRef, data }) {
    return (
        <div className="feed-card" ref={innerRef}>
            <div className="card-header">
                <img
                    style={{ width: '100%' }}
                    src={`http://localhost:3000/imageUpload-1653806035576.jpg`}
                />
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
