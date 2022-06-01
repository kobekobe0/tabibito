import {
    BsFillArrowRightCircleFill,
    BsFillArrowLeftCircleFill,
} from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
function Images({
    image,
    counter,
    next,
    prev,
    setShow,
    show,
    data,
    pfp,
    date,
    setCounter,
}) {
    return (
        <>
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
                                              counter === index ? '1' : '0',
                                          objectFit: index === 0 && 'cover',
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
                                                  image.length !== counter + 1
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
                                counter === index ? '2px solid white' : null,
                        }}
                        onClick={() => setCounter(index)}
                    />
                ))}
            </section>
        </>
    )
}

export default Images
