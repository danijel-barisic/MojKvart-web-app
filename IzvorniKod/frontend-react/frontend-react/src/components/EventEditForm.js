import React from "react"
import Card from "./Card"
import "./Login.css"
import { useHistory } from "react-router"

function EventEditForm() {

    const currentURL = window.location.href
    const splitURL = currentURL.split("/")
    const event_id = splitURL.at(-1)

    const [oldEvent, setOldEvent] = React.useState([])
    const [eventForm, setEventForm] = React.useState(
        {name: '', description: '', location: '', date: '', time: '', duration: ''})
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
                date: data.date,
                time: data.time,
                duration: data.duration
            })
        })
    }, [])

    function onChange(event) {
        const {name, value} = event.target
        setEventForm(oldForm => ({...oldForm, [name]: value}))
    }

    async function onSubmit(e) {

        e.preventDefault()

        const data = {
            id: oldEvent.id,
            name: eventForm.name,
            description: eventForm.description,
            duration: eventForm.duration,
            date: eventForm.date,
            time: eventForm.time,
            location: eventForm.location,
            status: oldEvent.status,
            account: oldEvent.account
        }

        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        return fetch(`/events/${data.id}`, options).then(response => {

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
        const {name, description, location, duration, date, time} = eventForm
        return name.length > 0 && description.length > 0 && 
            location.length > 0 && duration.length > 0 && date.length > 0 && time.length > 0
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
                        <input name="date" type="date" required onChange={onChange} value={ eventForm.date}/>
                    </div>
                    <div className="FormRow">
                        <label>Vrijeme početka</label>
                        <input name="time" type="time" required onChange={onChange} value={ eventForm.time}/>
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