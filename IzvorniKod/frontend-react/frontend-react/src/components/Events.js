import React from "react";
import Event from "./Event";
import Card from "./Card";
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";
import EventSuggestion from "./EventSuggestion";

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
    const [roles, setRoles] = React.useState();

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account));
    }, []);

    React.useEffect(() => {
        fetch((account.id === undefined ? "/roles" : `/accounts/roles/${account.id}`))
        .then(data => data.json())
        .then(roles => setRoles(roles))
    }, [account])

    if (roles !== undefined && roles.length > 0) {
        if (roles.filter(r => r.name === "Moderator").length > 0)
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
                                    {unconfirmed.map(function (ev){
                                        return (
                                            <div className='inner'>
                                                <EventSuggestion event={ev}/>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </Card>
                </>
            )
        else 
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
            )
    }
    else return (
        <>
        </>
    )
}

export default Events;