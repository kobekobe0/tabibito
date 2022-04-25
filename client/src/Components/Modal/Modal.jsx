import React, { useState, useEffect } from 'react'
import './modal.css'
import axios from 'axios'

function Modal() {
    const [privacy, setPrivacy] = useState(true)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [food, setFood] = useState(0)
    const [accommodation, setAccommodation] = useState(0)
    const [transportation, setTransportation] = useState(0)
    const [other, setOther] = useState(0)
    const [transportationType, setTransportationType] = useState('')

    const [duration, setDuration] = useState(0)

    const [locationTown, setLocationTown] = useState('')
    const [locationCity, setLocationCity] = useState('')
    const [locationCountry, setLocationCountry] = useState('')

    const [locationTownTraveler, setLocationTownTraveler] = useState('')
    const [locationCityTraveler, setLocationCityTraveler] = useState('')
    const [locationCountryTraveler, setLocationCountryTraveler] = useState('')

    const [images, setImages] = useState([])

    useEffect(() => {}, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            images: ['gggg', 'ggggg'],
            title: title,
            userId: 1,
            description: description,
            budget: {
                food: food,
                accommodation: accommodation,
                transportation: transportation,
                other: other,
            },
            location: {
                town: locationTown,
                city: locationCity,
                country: locationCountry,
            },
            travelerLocation: {
                town: locationTownTraveler,
                city: locationCityTraveler,
                country: locationCountryTraveler,
            },
            transportationType: transportationType,
            private: privacy,
            deleted: false,
            duration: 0,
        }

        axios.post('http://localhost:3000/api/travel', data)
    }

    const handleChange = (e, state) => {
        state(e.target.value)
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-contents">
                    <div className="modal-header">Add new travel</div>
                    <div className="modal-body">
                        <form encType="multipart/form-data">
                            <input
                                type="text"
                                placeholder="Add title"
                                id="title"
                                onChange={(e) => handleChange(e, setTitle)}
                            />
                            <textarea
                                type="text"
                                placeholder="Add description"
                                id="description"
                                onChange={(e) =>
                                    handleChange(e, setDescription)
                                }
                            />

                            <section className="budget">
                                <div className="budget-header">
                                    <h4>Budget</h4>
                                </div>
                                <div className="budget-body">
                                    <div className="budget_inputs">
                                        <input
                                            type="number"
                                            placeholder="Food"
                                            onChange={(e) =>
                                                handleChange(e, setFood)
                                            }
                                        />
                                        <input
                                            type="number"
                                            placeholder="Transportation"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setTransportation
                                                )
                                            }
                                        />
                                        <input
                                            type="number"
                                            placeholder="Accomodation"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setAccommodation
                                                )
                                            }
                                        />
                                        <input
                                            type="number"
                                            placeholder="Other"
                                            onChange={(e) =>
                                                handleChange(e, setOther)
                                            }
                                        />
                                    </div>
                                    <div className="budget_Dropdown">
                                        <label for="transportationType">
                                            Transportation mode:
                                        </label>
                                        <select
                                            id="transportationType"
                                            name="cars"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setTransportationType
                                                )
                                            }
                                        >
                                            <option value="Commute">
                                                Commute
                                            </option>
                                            <option value="Rent">Rent</option>
                                            <option value="Owns the vehicle">
                                                Owns the vehicle
                                            </option>
                                        </select>
                                        <input
                                            type="number"
                                            placeholder="enter duration(in days)"
                                            onChange={(e) =>
                                                handleChange(e, setDuration)
                                            }
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="location">
                                <div className="location-header">
                                    <h4>Location</h4>
                                </div>
                                <div className="location-body">
                                    <div className="location_inputs">
                                        <div className="destination">
                                            <h5>Destination location</h5>
                                            <input
                                                type="text"
                                                placeholder="town"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setLocationTown
                                                    )
                                                }
                                            />
                                            <input
                                                type="text"
                                                placeholder="city"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setLocationCity
                                                    )
                                                }
                                            />
                                            <input
                                                type="text"
                                                placeholder="country"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setLocationCountry
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="traveler">
                                            <h5>Traveler's location</h5>
                                            <input
                                                type="text"
                                                placeholder="town"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setLocationTownTraveler
                                                    )
                                                }
                                            />
                                            <input
                                                type="text"
                                                placeholder="city"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setLocationCityTraveler
                                                    )
                                                }
                                            />
                                            <input
                                                type="text"
                                                placeholder="country"
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        setLocationCountryTraveler
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <label for="image">Upload images: </label>
                            <input
                                type="file"
                                id="image"
                                onChange={(e) => setImages(e.target.files)}
                            />

                            <input
                                type="submit"
                                id="submit"
                                name="Submit"
                                onClick={handleSubmit}
                                disabled={
                                    title === '' ||
                                    description === '' ||
                                    food === '' ||
                                    transportationType === '' ||
                                    locationTown === '' ||
                                    locationCity === '' ||
                                    locationCountry === '' ||
                                    locationTownTraveler === '' ||
                                    locationCityTraveler === '' ||
                                    locationCountryTraveler === ''
                                        ? true
                                        : false
                                }
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
