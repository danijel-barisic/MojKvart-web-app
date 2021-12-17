import React from "react";
import Event from "./Event";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";

function Events() {
    const dog1 = {
        event_name: 'Događaj 1',
        event_description: 'Opis događaja 1',
        event_location: 'Lokacija događaja 1',
        event_datetime: 'Datum događaja 1',
        event_duration: 'Trajanje događaj 1',
        event_organizer: 'Organizator događaja 1'
    };
    const dog2 = {
        event_name: 'Događaj 2',
        event_description: 'Opis događaja 2',
        event_location: 'Lokacija događaja 2',
        event_datetime: 'Datum događaja 2',
        event_duration: 'Trajanje događaj 2',
        event_organizer: 'Organizator događaja 2'
    };
    const role = ReactSession.get(ReactSession.get("username"));
    console.log("role je")
    console.log(role)
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
}

export default Events;