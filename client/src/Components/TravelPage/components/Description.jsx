import React from 'react'
import { BsFillPeopleFill } from 'react-icons/bs'

function Description({ data }) {
    return (
        <>
            <section className="post-description">
                <div className="description">
                    <pre>{data.description}</pre>
                </div>
                <div className="other-info">
                    <div className="other-info-left">
                        <h4>Budget</h4>
                        <div className="budgets">
                            <p>
                                Accomodation:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    {data.accommodation &&
                                        data.accommodation
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}
                                </span>
                            </p>
                            <p>
                                Transportaion:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    {data.accommodation &&
                                        data.transportation
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}
                                </span>
                            </p>
                            <p>
                                Food:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    {data.accommodation &&
                                        data.food
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}
                                </span>
                            </p>
                            <p>
                                Other:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    {data.accommodation &&
                                        data.other
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                ','
                                            )}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="other-info-right">
                        <h4>Transportation type</h4>
                        <p>{data.transportationType}</p>
                        <h4>Traveler's location</h4>
                        <p>
                            {data.travelerTown}, {data.travelerCity},{' '}
                            {data.travelerCountry}
                        </p>
                        <h4>Head count</h4>
                        <p>
                            <BsFillPeopleFill size={20} /> {data.travelerCount}{' '}
                            ={' '}
                            {(data.accommodation +
                                data.food +
                                data.other +
                                data.transportation) /
                                data.travelerCount}
                            {'/person'}
                        </p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Description
