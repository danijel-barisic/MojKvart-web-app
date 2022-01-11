import React from "react"
import "./Event.css"
import duration_parser from "./EventTimeParser"
import { useHistory } from "react-router"
import Card14 from "./Card14"
import { ReactSession } from "react-client-session"


function Event(props) {
    const currentURL = window.location.href
    const splitURL = currentURL.split("/")
    const id = splitURL.at(-1)
    const [event, setEvent] = React.useState(undefined)
    const [account, setAccount] = React.useState({id: undefined})
    const [roles, setRoles] = React.useState()

    const acc_username = ReactSession.get("username")
    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account))
    }, [])

    React.useEffect(() => {
        fetch('/events')
        .then(data => data.json())
        .then(data => setEvent(data
            .filter(e => e.id == id)[0]))
    }, [])

    React.useEffect(() => {
        if (account !== undefined && account.id !== undefined) {
            fetch(`/accounts/roles/${account.id}`)
            .then(data => data.json())
            .then(roles => setRoles(roles))
        }
    }, [account])

    const [updated, setUpdated] = React.useState(new Date())
    React.useEffect(() => {}, [updated])

    const history = useHistory();

    function deleteEvent(id) {

        const options = {
            method: 'DELETE'
        }

        fetch(`/events/${id}`, options).then(response => {

            if (!response.ok) {
                console.log(response.body)

            } else {
                console.log("deleted");
                setUpdated(new Date());
                history.push("/dogadjaji")
            }

        })
    }

    function submitEvent(event) {

        const data = {
            name: event.name,
            description: event.description,
            location: event.location,
            date: event.date,
            time: event.time,
            duration: event.duration,
            status: 1,
            account: {
                id: event.account.id
            }
        }

        fetch(`/events/${id}`, {method: 'DELETE'})

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
                history.push("/dogadjaji")
            }

            else {
                console.log(response.body);
            }
            
        })
    }


    if (event !== undefined && event.account !== undefined && roles !== undefined) return (
        <>
            <div className="current-title">{event.name}</div>
            <Card14>
                <table><tbody>
                    <tr>
                        <td className="tdd"><b>Opis: </b></td>
                        <td className="tdd"><span>{event.description}</span></td>
                    </tr>
                    <tr>
                        <td className="tdd"><b>Lokacija: </b></td>
                        <td className="tdd"><span>{event.location}</span></td>
                    </tr>
                    <tr>
                        <td className="tdd"><b>Datum: </b></td>
                        <td className="tdd"><span>{event.date}</span></td>
                    </tr>
                    <tr>
                        <td className="tdd"><b>Vrijeme početka: </b></td>
                        <td className="tdd"><span>{event.time}</span></td>
                    </tr>
                    <tr>
                        <td className="tdd"><b>Trajanje: </b></td>
                        <td className="tdd"><span>{duration_parser(event.duration)}</span></td>
                    </tr>
                    <tr>
                        <td className="tdd"><b>Organizator: </b></td>
                        <td className="tdd"><span>{event.account.firstName} {event.account.lastName}</span></td>
                    </tr>
                </tbody></table>
                {(event.status == 0) ? 
                    <div className="Login flex-container-row">
                        <div style={{margin: "auto"}}>
                            <button className='button' type="button" onClick={() => {history.goBack()}}>Natrag</button>
                            <button className='button' type="button" onClick={() => {history.push(`/dogadjaji/uredi/${event.id}`)}}>Uredi</button>
                            {
                                (roles.filter(r => r.name === "Moderator").length > 0) ?
                                <>
                                <button className='button' type="button" onClick={() => submitEvent(event)}>Objavi</button>
                                <button className='button' type="button" onClick={() => deleteEvent(event.id)}>Obriši</button>
                                </>
                                : <></>
                            }
                        </div>
                    </div>
                : <div className="Login flex-container-row">
                <div style={{margin: "auto"}}>
                    <button className='button' type="button" onClick={() => {history.goBack()}}>Natrag</button>
                    </div>
            </div>}
            </Card14>
            
        </>
    )
    else return (<></>)
}

export default Event