import React from "react";
import Event from "./Event";
import Card from "./Card";
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";

function Events() {
    const [events, setEvents] = React.useState([]);
    const [updated, setUpdated] = React.useState(new Date());
    const [error, setError] = React.useState('');
    const history = useHistory();
    React.useEffect(() => {
        fetch('/events')
        .then(data => data.json())
        .then(e => setEvents(e))
    }, [updated])
    const confirmed = events.filter((event) => event["status"] === "1")
    const unconfirmed = events.filter((event) => event["status"] === "0")

    const acc_username = ReactSession.get("username");
    const [account, setAccount] = React.useState({id: ''});
    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account));
    }, []);

    const id = account.id

    console.log(id)

    const [roles, setRoles] = React.useState([]);
    React.useEffect(() => {
        fetch(`/roles/${id}`)
        .then(data => data.json())
        .then(roles => setRoles(roles))
    }, [updated])

    console.log(roles)

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

    if (true) {
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
                                    return (
                                        <>
                                            <div className='inner'>
                                                <Event event={event}/>
                                            </div>
                                            <div className='Login'>
                                                <button className='button' type="button" onClick={() => submitEvent(event)}>Objavi</button>
                                                <button className='button' type="button" onClick={() => deleteEvent(event["id"])}>Obriši</button>
                                                <button className='button' type="button" onClick={() => {history.push(`/events/edit/${event["id"]}`)}}>Uredi</button>
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
    } else {
        return (
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
        );
    }
}

export default Events;