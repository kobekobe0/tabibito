import { useState, useEffect } from 'react'
import { FaSave } from 'react-icons/fa'
import axios from 'axios'

function EditDescription({ userData, date, data }) {
    const [title, setTitle] = useState('')
    const [locationTown, setLocationTown] = useState('')
    const [locationCity, setLocationCity] = useState('')
    const [locationCountry, setLocationCountry] = useState('')
    const [description, setDescription] = useState('')
    const [accommodation, setAccommodation] = useState(0)
    const [transportation, setTransportation] = useState(0)
    const [food, setFood] = useState(0)
    const [other, setOther] = useState(0)
    const [transportationType, setTransportationType] = useState('')
    const [travelerTown, setTravelerTown] = useState('')
    const [travelerCity, setTravelerCity] = useState('')
    const [travelerCountry, setTravelerCountry] = useState('')
    const [headCount, setHeadCount] = useState(0)

    useEffect(() => {
        setTitle(data.title)
        setLocationTown(data.locationTown)
        setLocationCity(data.locationCity)
        setLocationCountry(data.locationCountry)
        setDescription(data.description)
        setAccommodation(data.accommodation)
        setTransportation(data.transportation)
        setFood(data.food)
        setOther(data.other)
        setTransportationType(data.transportationType)
        setTravelerTown(data.travelerTown)
        setTravelerCity(data.travelerCity)
        setTravelerCountry(data.travelerCountry)
        setHeadCount(data.travelerCount)
    }, [data])
    const handleSave = () => {
        console.log(data._id)
        data._id &&
            axios
                .put(`travel/${data._id}`, {
                    title: title.trim(),
                    locationTown: locationTown.trim(),
                    locationCity: locationCity.trim(),
                    locationCountry: locationCountry.trim(),
                    description: description,
                    accommodation: accommodation,
                    transportation: transportation,
                    food: food,
                    other: other,
                    transportationType: transportationType,
                    travelerTown: travelerTown.trim(),
                    travelerCity: travelerCity.trim(),
                    travelerCountry: travelerCountry.trim(),
                    travelerCount: headCount,
                })
                .then((res) => {
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
    }
    return (
        <>
            <section className="post-description">
                <div className="travelpage-info">
                    <div className="travel-header">
                        <div className="travel-title">
                            <input
                                type="text"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value.toUpperCase())
                                }
                                maxLength={18}
                            />
                            <div className="location-edit">
                                <input
                                    type="text"
                                    value={locationTown}
                                    onChange={(e) =>
                                        setLocationTown(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    value={locationCity}
                                    onChange={(e) =>
                                        setLocationCity(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    value={locationCountry}
                                    onChange={(e) =>
                                        setLocationCountry(e.target.value)
                                    }
                                />
                            </div>
                            <div id="user-info">
                                <div className="pfp">
                                    <img
                                        src={
                                            userData.pfp &&
                                            `http://localhost:3000/${userData.pfp.replace(
                                                'pfp',
                                                ''
                                            )}`
                                        }
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
                                    <h3
                                        id="username"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {userData.name}
                                    </h3>
                                    <h4 id="date">{date}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="travel-like">
                            <FaSave
                                color="gold"
                                size={30}
                                onClick={handleSave}
                            />
                        </div>
                    </div>
                </div>
                <div className="description">
                    <textarea
                        name=""
                        id=""
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="other-info">
                    <div className="other-info-left">
                        <h4>Budget</h4>
                        <div className="budgets">
                            <p>
                                Accomodation:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    <input
                                        type="number"
                                        value={accommodation}
                                        onChange={(e) =>
                                            setAccommodation(e.target.value)
                                        }
                                    />
                                </span>
                            </p>
                            <p>
                                Transportaion:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    <input
                                        type="number"
                                        value={transportation}
                                        onChange={(e) =>
                                            setTransportation(e.target.value)
                                        }
                                    />
                                </span>
                            </p>
                            <p>
                                Food:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    <input
                                        type="number"
                                        value={food}
                                        onChange={(e) =>
                                            setFood(e.target.value)
                                        }
                                    />
                                </span>
                            </p>
                            <p>
                                Other:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    <input
                                        type="number"
                                        value={other}
                                        onChange={(e) =>
                                            setOther(e.target.value)
                                        }
                                    />
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="other-info-right">
                        <h4>Transportation type</h4>
                        <select
                            id="transportationType-edit"
                            name="transportationType"
                            onChange={(e) =>
                                setTransportationType(e.target.value)
                            }
                        >
                            <option
                                value="Commute"
                                selected={
                                    transportationType === 'Commute'
                                        ? true
                                        : false
                                }
                            >
                                Commute
                            </option>
                            <option
                                value="Rent"
                                selected={
                                    transportationType === 'Rent' ? true : false
                                }
                            >
                                Rent
                            </option>
                            <option
                                value="Owns the vehicle"
                                selected={
                                    transportationType === 'Owns the vehicle'
                                        ? true
                                        : false
                                }
                            >
                                Owns the vehicle
                            </option>
                        </select>
                        <h4>Traveler's location</h4>
                        <div className="travelerlocation-edit">
                            <input
                                type="text"
                                value={travelerTown}
                                onChange={(e) =>
                                    setTravelerTown(e.target.value)
                                }
                            />
                            ,{' '}
                            <input
                                type="text"
                                value={travelerCity}
                                onChange={(e) =>
                                    setTravelerCity(e.target.value)
                                }
                            />
                            ,{' '}
                            <input
                                type="text"
                                value={travelerCountry}
                                onChange={(e) =>
                                    setTravelerCountry(e.target.value)
                                }
                            />
                        </div>
                        <h4>Head count</h4>
                        <input
                            type="number"
                            value={headCount}
                            onChange={(e) => setHeadCount(e.target.value)}
                        />
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditDescription
