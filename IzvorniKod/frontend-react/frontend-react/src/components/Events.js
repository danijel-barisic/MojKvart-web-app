import React from "react";
import Event from "./Event";
import Card from "./Card";

function Events() {
   const [events, setEvents] = React.useState([])
    React.useEffect(() => {
        fetch('/events').then(data => data.json()
            .then(events => setEvents(events)))
    })
    /*
    if (role === "Moderator") {
        return (
            <>
                <Card title='Događaji'>
                    <div>
                        <div className='wrapper'>
                            <div className='inner'>
                                <Event event={dog1}/>
                            </div>
                        </div>
                    </div>
                </Card>
                <Card title='Prijedlozi događaja'>
                    <div>
                        <div className='wrapper'>
                            <div className='inner'>
                                <Event event={dog2}/>
                            </div>
                        </div>
                    </div>
                </Card>
            </>
        );
    }
    else {
        return (
            <Card title='Događaji'>
                <div>
                    <div className='wrapper'>
                        <div className='inner'>
                            <Event event={dog1}/>
                        </div>
                        <div className='inner'>
                            <Event event={dog2}/>
                        </div>
                        <div className='inner'>
                            <Event event={dog1}/>
                        </div>
                        <div className='inner'>
                            <Event event={dog2}/>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
   */
    return (
        <Card title='Događaji'>
            <div>
                <div className='wrapper'>
                    {events.map(function (event){
                        return (
                            <div className='inner'>
                                <Event event={event}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Card>
    );
}

export default Events;