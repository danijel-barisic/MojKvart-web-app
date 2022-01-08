import React from "react"
import Event from "./Event"
import Card from "./Card"
import { useHistory } from "react-router"
import { ReactSession } from "react-client-session"
import EventSuggestion from "./EventSuggestion"
import EventSuggestionUser from "./EventSuggestionUser"
import {MdEvent} from "react-icons/md"
import {MdEventNote} from "react-icons/md"

function Events() {

    const [events, setEvents] = React.useState([])
    const [account, setAccount] = React.useState({id: undefined})
    const [roles, setRoles] = React.useState()

    const history = useHistory()

    const acc_username = ReactSession.get("username")

    const confirmed = events.filter((event) => event["status"] === "1")
    const unconfirmed = events.filter((event) => event["status"] === "0")
    const my_unconfirmed = unconfirmed.filter((event) => event.account.id === account.id)

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account))
    }, [])

    React.useEffect(() => {
        if (account !== undefined && account.id !== undefined) {
            fetch(`/accounts/roles/${account.id}`)
            .then(data => data.json())
            .then(roles => setRoles(roles))
        }
    }, [account])

    React.useEffect(() => {
        if (account !== undefined && account.district !== undefined) {
            fetch('/events')
            .then(data => data.json())
            .then(data => setEvents(data
                .filter(e => e.account.district.id === account.district.id)
                .filter(e => {
                    var d1 = new Date(e.date)
                    var d2 = new Date()
                    d1.setHours(0,0,0,0)
                    d2.setHours(0,0,0,0)
                    return d1 - d2 >= 0;
                })))
        }
    }, [account])

    events.sort((a,b) => {return new Date(a.date) - new Date(b.date)})

    if (events !== undefined && roles !== undefined && roles.length > 0) {
        if (roles.filter(r => r.name === "Moderator").length > 0) return (
            <>
                <div className="current-title">
                    <MdEvent/> DOGAĐAJI
                </div>
                <Card>
                    <div>
                        <div className='Login'>
                            <button className='button' type="button" onClick={() => {history.push("/dogadjaji/prijedlog")}}>Predloži događaj</button>
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
                <div className="current-title">
                    <MdEventNote/> PRIJEDLOZI DOGAĐAJA
                </div>
                <Card>
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
        else if (my_unconfirmed !== undefined && my_unconfirmed.length > 0) return (
            <>
                <div className="current-title">
                    <MdEvent/> DOGAĐAJI
                </div>
                <Card>
                    <div>
                        <div className='Login'>
                            <button className='button' type="button" onClick={() => {history.push("/dogadjaji/prijedlog")}}>Predloži događaj</button>
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
                <div className="current-title">
                    <MdEventNote/> MOJI PRIJEDLOZI DOGAĐAJA
                </div>
                <Card>
                    <div>
                        <div className='innerEvent'>
                            <div className='wrapper'>
                                {my_unconfirmed.map(function (event){
                                    return (
                                        <div className='inner'>
                                            <EventSuggestionUser event={event}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </Card>
            </>
        )
        else return (
            <Card title='Događaji'>
                <div>
                    <div className='Login'>
                        <button className='button' type="button" onClick={() => {history.push("/dogadjaji/prijedlog")}}>Predloži događaj</button>
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
    } else return (
        <></>
    )
}

export default Events;