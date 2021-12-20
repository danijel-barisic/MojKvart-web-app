import React from "react";
import { useHistory } from "react-router";

function EventSuggestion(props) {
    const event = props.event;

    console.log(event)

    const [updated, setUpdated] = React.useState(new Date());
    const [error, setError] = React.useState('');

    React.useEffect(() => {

    }, [updated])

    const history = useHistory();

    function deleteEvent(id) {
        const options = {
            method: 'DELETE',
        };
        fetch(`/events/${id}`, options).then(response => {
            if (!response.ok) {
                console.log(response.body)
            } else {
                console.log("deleted");
                setUpdated(new Date());
                window.location.reload()
            }
        })
    }

    function submitEvent(event) {
        const data = {
            name: event.name,
            description: event.description,
            location: event.location,
            datetime: event.datetime,
            duration: event.duration,
            status: 1,
            account: {
                id: event.account.id
            }
        }
        deleteEvent(event.id)
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return fetch("/events", options).then(response => {
            if (response.ok) {
                setUpdated(new Date())
                window.location.reload()
            }
            else {
                setError("Prijedlog događaja nije moguće objaviti.");
                console.log(response.body);
            }
        });
    }

    if (event !== undefined)
    return (
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
                <span>{event.datetime}</span>
            </div>
            <div>
                <b>Trajanje: </b>
                <span>{event.duration}</span>
            </div>
            <div>
                <b>Organizator: </b>
                <span>{event.account["firstName"]} {event.account["lastName"]}</span>
            </div>
            <div className="Login">
                <button className='button' type="button" onClick={() => submitEvent(event)}>Objavi</button>
                <button className='button' type="button" onClick={() => deleteEvent(event.id)}>Obriši</button>
                <button className='button' type="button" onClick={() => {history.push(`/events/edit/${event["id"]}`)}}>Uredi</button>
            </div>
        </div>
    )
    else return (
        <>
        </>
    )
}

export default EventSuggestion;