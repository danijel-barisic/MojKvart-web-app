import React from "react";
import Card from "./Card";
import "./Login.css";
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";

function CouncilForm() {

    const [error, setError] = React.useState('');
    const history = useHistory();

    const acc_username = ReactSession.get("username");
    const [account, setAccount] = React.useState({id: ''});
    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account));
    }, []);

    const [meetingForm, setMeetingForm] = React.useState(
        {title: '', report: ''}
    )

    function onChange(event) {
        const {name, value} = event.target;
        setMeetingForm(oldForm => ({...oldForm, [name]: value}))
    }

    async function onSubmit(e) {
        e.preventDefault();
        const data = {
            title: meetingForm.title,
            report: meetingForm.report,
            dateTime: undefined,
            postThread: undefined,
            district: undefined,
            account: undefined
        }
    }

    function isValid() {
        const {title, report} = meetingForm;
        return title.length > 0 && report.length > 0;
    }

    return (
        <Card title="Novo izvješće">
            <div className="Login">
                <form onSubmit={onSubmit}>
                    <div className="FormRow">
                        <label>Naslov</label>
                        <input name="title" required onChange={onChange} value = {meetingForm.title}/>
                    </div>
                    <div className="FormRow">
                        <label>Sadržaj</label>
                        <input name="report" required onChange={onChange} value = {meetingForm.report}/>
                    </div>
                    <div>
                        <div className='error'>{error}</div>
                        <button className="button" type="submit" disabled={!isValid()}>Objavi izvješće</button>
                        <button className="button" type="button" onClick={() => {history.push("/council")}}>Povratak</button>
                    </div>
                </form>
            </div>
        </Card>
    )
}

export default CouncilForm;