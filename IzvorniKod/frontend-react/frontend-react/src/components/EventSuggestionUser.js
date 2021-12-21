import React from "react"
import { useHistory } from "react-router"

function EventSuggestionUser(props) {

    const event = props.event

    const history = useHistory();

    if (event !== undefined) return (
        <div className='Event'>
            <div>
                <b>Naslov: </b>
                <span>{event.name}</span>
            </div>
            <div>
                <b>Opis: </b>
                <span>{event.description}</span>
            </div>
            <div>
                <b>Lokacija: </b>
                <span>{event.location}</span>
            </div>
            <div>
                <b>Datum: </b>
                <span>{event.date}</span>
            </div>
            <div>
                <b>Vrijeme početka: </b>
                <span>{event.time}</span>
            </div>
            <div>
                <b>Trajanje: </b>
                <span>{event.duration}</span>
            </div>
            <div>
                <b>Organizator: </b>
                <span>{event.account.firstName} {event.account.lastName}</span>
            </div>
            <div className="Login">
                <button className='button' type="button" onClick={() => {history.push(`/events/edit/${event.id}`)}}>Uredi</button>
            </div>
        </div>
    )
    else return (
        <></>
    )
}

export default EventSuggestionUser