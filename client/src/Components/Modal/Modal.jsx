import React, { useState, useEffect } from 'react'
import './modal.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

function Modal() {
    const [privacy, setPrivacy] = useState(true)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [food, setFood] = useState(0)
    const [accommodation, setAccommodation] = useState(0)
    const [transportation, setTransportation] = useState(0)
    const [other, setOther] = useState(0)
    const [transportationType, setTransportationType] = useState('Commute')

    const [duration, setDuration] = useState(0)

    const [locationTown, setLocationTown] = useState('')
    const [locationCity, setLocationCity] = useState('')
    const [locationCountry, setLocationCountry] = useState('')

    const [locationTownTraveler, setLocationTownTraveler] = useState('')
    const [locationCityTraveler, setLocationCityTraveler] = useState('')
    const [locationCountryTraveler, setLocationCountryTraveler] = useState('')

    const [images, setImages] = useState(Array)

    //TODO
    // handle Image upload, Im not sure if it will be handled in FE or BE
    // Styles and Loading animation

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userIdToken = JSON.parse(localStorage.getItem('user'))
        const userId = jwt_decode(userIdToken).id

        const formData = new FormData()

        const budget = {
            food: food,
            accommodation: accommodation,
            transportation: transportation,
            other: other,
        }

        const location = {
            town: locationTown,
            city: locationCity,
            country: locationCountry,
        }
        const locationTraveler = {
            town: locationTownTraveler,
            city: locationCityTraveler,
            country: locationCountryTraveler,
        }

        formData.append('title', title)
        formData.append('description', description)
        formData.append('budget', budget)
        formData.append('duration', duration)
        formData.append('location', location)
        formData.append('privacy', privacy)
        formData.append('images', images)
        formData.append('userId', userId)
        formData.append('deleted', false)

        // const data = {
        //     images: images, //pass 64bit encoded images
        //     title: title,
        //     userId: userId,
        //     description: description,
        //     budget: {
        //         food: food,
        //         accommodation: accommodation,
        //         transportation: transportation,
        //         other: other,
        //     },
        //     location: {
        //         town: locationTown,
        //         city: locationCity,
        //         country: locationCountry,
        //     },
        //     travelerLocation: {
        //         town: locationTownTraveler,
        //         city: locationCityTraveler,
        //         country: locationCountryTraveler,
        //     },
        //     transportationType: transportationType,
        //     private: privacy,
        //     deleted: false,
        //     duration: duration,
        // }

        console.log(JSON.parse(formData.get('budget')))
        try {
            await axios.post('http://localhost:3000/api/travel', formData)
        } catch (err) {
            console.log(err)
        }
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
                        <form
                            encType="multipart/form-data"
                            action="../../../../server/uploads"
                        >
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
                                multiple
                                id="image"
                                name="images"
                                onChange={async (e) => {
                                    await setImages((images) => [
                                        ...images,
                                        e.target.files[0],
                                    ])
                                }}
                            />
                            <label for="privacy">Privacy:</label>
                            <select
                                id="privacy"
                                name="privacy"
                                onChange={(e) => handleChange(e, setPrivacy)}
                            >
                                <option value={true}>Private</option>
                                <option value={false}>Public</option>
                            </select>

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
                                    locationCountryTraveler === '' ||
                                    duration === '' ||
                                    images.length === 0
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
