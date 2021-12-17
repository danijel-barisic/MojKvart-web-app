import React from "react";
import "./Event.css";

function Event(props) {
    const {event_name, event_description, event_location, event_datetime, event_duration, event_organizer} = props.event;
    return (
        <div className='Event'>
            <div>
                <b>Naslov: </b>
                <span>{event_name}</span>
            </div>
            <div>
                <b>Opis: </b>
                <span>{event_description}</span>
            </div>
            <div>
                <b>Lokacija: </b>
                <span>{event_location}</span>
            </div>
            <div>
                <b>Datum: </b>
                <span>{event_datetime}</span>
            </div>
            <div>
                <b>Trajanje: </b>
                <span>{event_duration}</span>
            </div>
            <div>
                <b>Organizator: </b>
                <span>{event_organizer}</span>
            </div>
        </div>
    );
}

export default Event;