import React from "react";
import Card from "./Card";
import "./Login.css";
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";

function EventSuggestion(props) {
    const [eventForm, setEventForm] = React.useState(
        {name: '', description: '', location: '', datetime: '', duration: ''})
    const [error, setError] = React.useState('');
    const history = useHistory();

    function onChange(event) {
        const {name, value} = event.target;
        setEventForm(oldForm => ({...oldForm, [name]: value}))
    }

    async function onSubmit(e) {
        e.preventDefault();
        setError("");
        const body = `name=`;
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
                        <button className="button" type="submit">Pošalji prijedlog</button>
                    </div>
                </form>
            </div>
        </Card>
    );
}

export default EventSuggestion;