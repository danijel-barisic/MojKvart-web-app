import React from "react"
import "./Event.css"

function Event(props) {
    const {id, name, description, duration, date, time, location, status, account} = props.event
    return (
        <div className='Event'>
            <div>
                <b>Naslov: </b>
                <span>{name}</span>
            </div>
            <div>
                <b>Opis: </b>
                <span>{description}</span>
            </div>
            <div>
                <b>Lokacija: </b>
                <span>{location}</span>
            </div>
            <div>
                <b>Datum: </b>
                <span>{date}</span>
            </div>
            <div>
                <b>Vrijeme početka: </b>
                <span>{time}</span>
            </div>
            <div>
                <b>Trajanje: </b>
                <span>{duration}</span>
            </div>
            <div>
                <b>Organizator: </b>
                <span>{account.firstName} {account.lastName}</span>
            </div>
        </div>
    )
}

export default Event