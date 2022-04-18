import React from 'react'
import './modal.css'

function Modal() {
    return (
        <div>
            <div className="modal">
                <div className="modal-contents">
                    <div className="modal-header">Add new travel</div>
                    <div className="modal-body">
                        <form encType="multipart/form-data">
                            <input type="text" placeholder="Add title" />
                            <input type="text" placeholder="Add description" />
                            <section className="budget">
                                <div className="budget-header">
                                    <h4>Budget</h4>
                                </div>
                                <div className="budget-body">
                                    <div className="budget_inputs">
                                        <input
                                            type="number"
                                            placeholder="Food"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Transportation"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Accomodation"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Other"
                                        />
                                    </div>
                                    <div className="budget_Dropdown">
                                        <label for="transportationType">
                                            Transportation mode:
                                        </label>
                                        <select
                                            id="transportationType"
                                            name="cars"
                                        >
                                            <option value="Commute">
                                                Commute
                                            </option>
                                            <option value="Rent">Rent</option>
                                            <option value="Owns the vehicle">
                                                Owns the vehicle
                                            </option>
                                        </select>
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
                                            />
                                            <input
                                                type="text"
                                                placeholder="city"
                                            />
                                            <input
                                                type="text"
                                                placeholder="country"
                                            />
                                        </div>
                                        <div className="traveler">
                                            <h5>Traveler's location</h5>
                                            <input
                                                type="text"
                                                placeholder="town"
                                            />
                                            <input
                                                type="text"
                                                placeholder="city"
                                            />
                                            <input
                                                type="text"
                                                placeholder="country"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <label for="image">Upload images: </label>
                            <input type="file" id="image" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
