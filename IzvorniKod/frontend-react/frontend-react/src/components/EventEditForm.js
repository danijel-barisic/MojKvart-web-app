import React from "react"
import Card from "./Card"
import "./Login.css"
import { useHistory } from "react-router"
import { ReactSession } from "react-client-session"

function EventEditForm() {

    const currentURL = window.location.href
    const splitURL = currentURL.split("/")
    const event_id = splitURL.at(-1)

    const [oldEvent, setOldEvent] = React.useState([])
    const [eventForm, setEventForm] = React.useState(
        {name: '', description: '', location: '', datetime: '', duration: ''})
    const [error, setError] = React.useState('')

    const history = useHistory()

    React.useEffect(() => {
        fetch(`/events/${event_id}`)
        .then(data => data.json())
        .then(data => setOldEvent(data))
    }, [])

    React.useEffect(() => {
        fetch(`/events/${event_id}`)
        .then(data => data.json())
        .then(data => {
            setEventForm({
                name: data.name, 
                description: data.description, 
                location: data.location, 
                datetime: data.datetime, 
                duration: data.duration
            })
        })
    }, [])

    function onChange(event) {
        const {name, value} = event.target
        setEventForm(oldForm => ({...oldForm, [name]: value}))
    }

    function deleteEvent(id) {

        const options = {
            method: 'DELETE',
        }

        fetch(`/events/${id}`, options).then(response => {

            if (!response.ok) {
                console.log(response.body)
            } else {
                console.log("deleted")
            }
        })
    }

    async function onSubmit(e) {

        e.preventDefault()

        const data = {
            name: eventForm.name,
            description: eventForm.description,
            location: eventForm.location,
            datetime: eventForm.datetime,
            duration: "PT0.000036S",
            status: 0,
            account: {
                id: oldEvent.account.id
            }
        }

        deleteEvent(event_id)

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        return fetch("/events", options).then(response => {

            if (response.ok) {
                history.push('/events')
            }

            else {
                setError("Prijedlog događaja nije moguće objaviti.");
                console.log(response.body)
            }
        })
    }

    function isValid() { 
        const {name, description, location, duration, datetime} = eventForm
        return name.length > 0 && description.length > 0 && 
            location.length > 0 && duration.length > 0 && datetime.length > 0
    }

    return (
        <Card title="Prijedlog događaja">
            <div className="Login">
                <form onSubmit={onSubmit}>
                    <div className="FormRow">
                        <label>Naslov</label>
                        <input name="name" required onChange={onChange} value={ eventForm.name}/>
                    </div>
                    <div className="FormRow">
                        <label>Opis</label>
                        <input name="description" required onChange={onChange} value={ eventForm.description}/>
                    </div>
                    <div className="FormRow">
                        <label>Lokacija</label>
                        <input name="location" required onChange={onChange} value={ eventForm.location}/>
                    </div>
                    <div className="FormRow">
                        <label>Datum</label>
                        <input name="datetime" type="datetime-local" required onChange={onChange} value={ eventForm.datetime}/>
                    </div>
                    <div className="FormRow">
                        <label>Trajanje</label>
                        <input name="duration" required onChange={onChange} value={ eventForm.duration}/>
                    </div>
                    <div>
                        <div className='error'>{error}</div>
                        <button className="button" type="submit" disabled={!isValid()}>Spremi promjene</button>
                        <button className="button" type="button" onClick={() => {history.push("/events")}}>Odustani</button>
                    </div>
                </form>
            </div>
        </Card>
    )
}

export default EventEditForm