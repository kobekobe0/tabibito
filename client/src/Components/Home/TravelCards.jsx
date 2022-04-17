import React from 'react'
import bg from '../../images/login2.jpg'
import Card from './Card'

function TravelCards() {
    return (
        <section className="travels">
            <div className="header">
                <h4>Travels</h4>
            </div>
            <div className="travelCards">
                <div className="travelCard">
                    <div className="travelCard_img">
                        <img src={bg} alt="travel" />
                        <h5>+ADD NEW TRAVEL</h5>
                    </div>
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </section>
    )
}

export default TravelCards
