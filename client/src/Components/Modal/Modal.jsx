import React, { useEffect, useState } from 'react'
import './modal.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { MdPublic, MdOutlineLock } from 'react-icons/md'
import Preview from './Preview'
import { BiArrowBack } from 'react-icons/bi'
import Compressor from 'compressorjs'

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

    const [travelerCount, setTravelerCount] = useState(0)

    const [images, setImages] = useState([])
    const [compressed, setCompressed] = useState([])
    const [tempCompressed, setTempCompressed] = useState([])
    const [selectedImages, setSelectedImages] = useState([])

    const [imageLoading, setImageLoading] = useState(false)
    const [user, setUser] = useState({})

    const [loadingButton, setLoadingButton] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoadingButton(true)

        const userIdToken = localStorage.getItem('user')

        const userId = jwt_decode(userIdToken).id
        console.log(userId)
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

        let merged = [].concat.apply([], tempCompressed) //merges all the arrays into one

        for (let i = 0, len = merged.length; i < len; i++) {
            formData.append(`imageUpload`, merged[i])
        } //make the image uploads an array
        console.log(images)

        try {
            await axios.post('travel', formData).then((res) => {
                if (res.data.status === 200) {
                    window.location.href = '/'
                } else {
                    alert('Something went wrong') //placeholder
                }
            })
        } catch (err) {
            alert('Something went wrong ' + err) //placeholder
            setLoadingButton(false)
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
        let tempArr = tempCompressed.filter((image) => image.name !== filename)
        setTempCompressed(tempArr)
    }

    const handleOnChange = async (e) => {
        const selectedFiles = e.target.files
        const selectedFilesArray = Array.from(selectedFiles)

        for (let i = 0; i < selectedFilesArray.length; i++) {
            setImageLoading(true)
            console.log(selectedFilesArray[i])
            new Compressor(selectedFilesArray[i], {
                quality: 0.6,
                convertTypes: ['image/jpeg'],
                success: (compressedResult) => {
                    setTempCompressed((prevState) => [
                        ...prevState,
                        compressedResult,
                    ])
                    setImageLoading(false)
                },
            })
        }

        //flatten out the tempCompressed then setState it

        const imagesArray = selectedFilesArray.map((file) => {
            return {
                name: file.name,
                URL: URL.createObjectURL(file),
            }
        })
        setImages((prevState) => prevState.concat(selectedFilesArray))
        setSelectedImages((previousImages) =>
            previousImages.concat(imagesArray)
        )
    }

    const handleDelete = (image) => {
        setSelectedImages(selectedImages.filter((e) => e !== image))
        console.log(tempCompressed)
    }

    const handleBack = () => {
        window.location.href = '/'
    }

    const show = () => {
        let merged = [].concat.apply([], tempCompressed) //merges all the arrays into one
        console.log(tempCompressed)
        console.log(selectedImages)
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-contents">
                    <div className="modal-header">
                        <BiArrowBack
                            onClick={handleBack}
                            style={{ cursor: 'pointer' }}
                        />
                        <h2 onClick={show}>POST A JOURNEY</h2>
                    </div>
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
                                {imageLoading ? (
                                    <div className="lds-ring">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                ) : null}

                                <Preview
                                    deletePreview={deleteUpload}
                                    images={tempCompressed}
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
                                name={loadingButton ? 'loading...' : 'Submit'}
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
                                    travelerCount === 0 ||
                                    privacy === null ||
                                    imageLoading === true ||
                                    loadingButton === true ||
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
