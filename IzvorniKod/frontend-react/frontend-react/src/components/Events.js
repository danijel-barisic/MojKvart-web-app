import React from "react";
import Event from "./Event";
import Card from "./Card";
import { useHistory } from "react-router";

function Events() {
    const [events, setEvents] = React.useState([]);
    const [updated, setUpdated] = React.useState(new Date());
    const [error, setError] = React.useState('');
    const history = useHistory();
    React.useEffect(() => {
        fetch('/events').then(data => data.json())
            .then(e => setEvents(e))
    }, [updated])
    const confirmed = events.filter((event) => event["status"] === "1")
    const unconfirmed = events.filter((event) => event["status"] === "0")

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
        console.log(data)
        console.log(event)
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
                history.push('/events');
            }
            else {
                setError("Prijedlog događaja nije moguće objaviti.");
                console.log(response.body);
            }
        });
    }

    return (
        <>
            <Card title='Događaji'>
                <div>
                    <div className='Login'>
                        <button className='button' type="button" onClick={() => {history.push("/events/suggestion")}}>Predloži događaj</button>
                    </div>
                </div>
                <div>
                    <div className='innerEvent'>
                        <div className='wrapper'>
                            {confirmed.map(function (event){
                                return (
                                    <div className='inner'>
                                        <Event event={event}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Card>
            <Card title='Prijedlozi događaja'>
                <div>
                    <div className='innerEvent'>
                        <div className='wrapper'>
                            {unconfirmed.map(function (event){
                                console.log(event)
                                return (
                                    <>
                                        <div className='inner'>
                                            <Event event={event}/>
                                        </div>
                                        <div className='Login'>
                                            <button className='button' type="button" onClick={() => submitEvent(event)}>Objavi</button>
                                            <button className='button' type="button" onClick={() => deleteEvent(event["id"])}>Obriši</button>
                                            <button className='button' type="button">Uredi</button>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Card>
        </>
    );
}

export default Events;