import React from "react";
import Event from "./Event";
import Card from "./Card";
import { useHistory } from "react-router";

function Events() {
    const [events, setEvents] = React.useState([])
    const history = useHistory();
    React.useEffect(() => {
        fetch('/events').then(data => data.json()
            .then(events => setEvents(events)))
    })
    console.log(events[0])
    const confirmed = events.filter((event) => event["status"] === "1")
    const unconfirmed = events.filter((event) => event["status"] === "0")
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
                                    <div className='inner'>
                                        <Event event={event}/>
                                    </div>
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