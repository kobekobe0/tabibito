import React, { useEffect, useState } from 'react'
import './modal.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { MdPublic, MdOutlineLock } from 'react-icons/md'
import Preview from './Preview'

function Modal() {
    const [privacy, setPrivacy] = useState(null)

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

    const [travelerCount, setTravelerCount] = useState(1)

    const [images, setImages] = useState([])
    const [selectedImages, setSelectedImages] = useState([])

    const [user, setUser] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userIdToken = JSON.parse(localStorage.getItem('user'))
        const userId = jwt_decode(userIdToken).id

        const formData = new FormData()

        formData.append('userId', userId)
        formData.append('title', title.toUpperCase())
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
        formData.append('likes', [])
        formData.append('username', user.name)
        formData.append('travelerCount', travelerCount)
        //formData.append('imageUpload', images)
        for (let i = 0, len = images.length; i < len; i++) {
            formData.append(`imageUpload`, images[i])
        } //make the image uploads an array
        console.log(images)

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

    useEffect(() => {
        const token = window.localStorage.getItem('user')
        let userData = jwt_decode(token)

        setUser(userData)
    }, [])
    const handleChange = (e, state) => {
        state(e.target.value)
    }

    const deleteUpload = (filename) => {
        //delete self from array
        let tempArr = images
        //use filter method
        tempArr = tempArr.filter((image) => image.name !== filename)
        setImages(tempArr)
    }

    const handleOnChange = (e) => {
        const selectedFiles = e.target.files
        const selectedFilesArray = Array.from(selectedFiles)

        const imagesArray = selectedFilesArray.map((file) => {
            return URL.createObjectURL(file)
        })
        setImages((prevState) => prevState.concat(selectedFilesArray))
        setSelectedImages((previousImages) =>
            previousImages.concat(imagesArray)
        )
    }

    const handleDelete = (image) => {
        setSelectedImages(selectedImages.filter((e) => e !== image))
    }
    // TODO
    // put a styled div on top of the upload button,
    // set upload button to opacity: 0 then make the styled div
    // accept the click for the upload button

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-contents">
                    <div className="modal-header">Add New Travel</div>
                    <div className="modal-body">
                        <form
                            encType="multiple/form-data"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                placeholder="Add title"
                                id="title"
                                maxLength={18}
                                onChange={(e) => handleChange(e, setTitle)}
                                value={title.toUpperCase()}
                            />
                            <textarea
                                type="text"
                                placeholder="Add description"
                                id="description"
                                maxLength={2000}
                                onChange={(e) =>
                                    handleChange(e, setDescription)
                                }
                            />
                            <p
                                style={{
                                    alignSelf: 'flex-end',
                                    color: description.length === 2000 && 'red',
                                }}
                            >
                                {description.length}/2000
                            </p>

                            <section className="budget">
                                <div className="budget-header">
                                    <h5>Budget</h5>
                                </div>
                                <div className="budget-body">
                                    <div className="budget_inputs">
                                        <input
                                            type="number"
                                            placeholder="Food"
                                            onChange={(e) =>
                                                handleChange(e, setFood)
                                            }
                                            className="budget_input"
                                            id="budget-food"
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
                                            className="budget_input"
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
                                            className="budget_input"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Other"
                                            onChange={(e) =>
                                                handleChange(e, setOther)
                                            }
                                            className="budget_input"
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

                                        <input
                                            type="number"
                                            placeholder="how many travelers?"
                                            onChange={(e) =>
                                                handleChange(
                                                    e,
                                                    setTravelerCount
                                                )
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

                            <div className="upload-images">
                                <div className="upload-button">
                                    <label for="image">Upload images</label>
                                    <input
                                        type="file"
                                        multiple
                                        id="image"
                                        filename="images"
                                        onChange={handleOnChange}
                                    />
                                </div>
                                <p className="accpeted-files">
                                    Accepted files: .jpg | .png | .gif
                                </p>

                                <Preview
                                    deletePreview={deleteUpload}
                                    images={images}
                                    selectedImages={selectedImages}
                                    handleDelete={handleDelete}
                                />
                            </div>

                            <div id="privacy">
                                <input
                                    id="public"
                                    type="radio"
                                    name="privacy"
                                    value={false}
                                    onChange={(e) =>
                                        handleChange(e, setPrivacy)
                                    }
                                />
                                <label for="public">
                                    <MdPublic size={30} />
                                </label>
                                <input
                                    id="public"
                                    type="radio"
                                    name="privacy"
                                    value={true}
                                    onChange={(e) =>
                                        handleChange(e, setPrivacy)
                                    }
                                />
                                <label for="public">
                                    <MdOutlineLock size={30} />
                                </label>
                            </div>

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
                                    privacy === null ||
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
