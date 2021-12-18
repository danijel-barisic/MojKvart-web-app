import React from "react";
import Card from "./Card";
import "./Login.css";
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";

function EventSuggestion(props) {
    const [eventForm, setEventForm] = React.useState(
        {name: '', description: '', location: '', datetime: '', duration: ''})
    return (
        <Card title="Prijedlog događaja">
            <div className="Login">
                <form>
                    <div className="FormRow">
                        <label>Naslov</label>
                        <input name="name"/>
                    </div>
                    <div className="FormRow">
                        <label>Opis</label>
                        <input name="description"/>
                    </div>
                    <div className="FormRow">
                        <label>Lokacija</label>
                        <input name="location"/>
                    </div>
                    <div className="FormRow">
                        <label>Datum</label>
                        <input name="datetime"/>
                    </div>
                    <div className="FormRow">
                        <label>Trajanje</label>
                        <input name="duration"/>
                    </div>
                    <div>
                        <button className="button" type="button">Pošalji prijedlog</button>
                    </div>
                </form>
            </div>
        </Card>
    );
}

export default EventSuggestion;