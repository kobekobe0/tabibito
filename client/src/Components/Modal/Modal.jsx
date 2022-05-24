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

    const [images, setImages] = useState('')

    //TODO
    // handle Image upload, Im not sure if it will be handled in FE or BE
    // Styles and Loading animation

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userIdToken = JSON.parse(localStorage.getItem('user'))
        const userId = jwt_decode(userIdToken).id

        const formData = new FormData()

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

        formData.append('userId', userId)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('food', food)
        formData.append('accommodation', accommodation)
        formData.append('transportation', transportation)
        formData.append('other', other)
        formData.append('transportationType', transportationType)
        formData.append('duration', duration)
        formData.append('locationTown', locationTown)
        formData.append('locationCity', locationCity)
        formData.append('locationCountry', locationCountry)
        formData.append('travelerTown', locationTownTraveler)
        formData.append('travelerCity', locationCityTraveler)
        formData.append('travelerCountry', locationCountryTraveler)
        formData.append('private', privacy)
        formData.append('deleted', false)
        formData.append('imageUpload', images)
        // for(let i=0, len=images.length; i<len; i++) {
        //     formData.append(`imageUpload${i}`, images[i])
        // }  make the image uploads an array
        console.log(images)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        try {
            await axios
                .post('http://localhost:3000/api/travel', formData)
                .then((res) => {
                    console.log(res)
                })
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e, state) => {
        state(e.target.value)
    }

    const uploadHandler = (e) => {
        let files = e.target.files[0]
        console.log(files)
        setImages(files)

        // formdata is required to upload images, set the name to imageUplaod
        const imageData = new FormData()
        imageData.append('imageUpload', files)
        //setImages([...images, file])   this is for when I make image uploads an array

        axios
            .post('http://localhost:3000/api/travel/image', imageData)
            .then((res) => {
                console.log(res)
            })
    }
    // TODO
    // put a styled div on top of the upload button,
    // set upload button to opacity: 0 then make the styled div
    // accept the click for the upload button

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-contents">
                    <div className="modal-header">Add new travel</div>
                    <div className="modal-body">
                        <form
                            encType="multiple/form-data"
                            onSubmit={handleSubmit}
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
                                filename="images"
                                onChange={(e) => uploadHandler(e)}
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
