import React from "react"
import Card from "./Card"
import "./Login.css"
import { useHistory } from "react-router"

function CouncilFormEdit() {

    const currentURL = window.location.href
    const splitURL = currentURL.split("/")
    const report_id = splitURL.at(-1)

    const [oldReport, setOldReport] = React.useState([])
    const [error, setError] = React.useState('')
    const [meetingForm, setMeetingForm] = React.useState({title: '', report: ''})
    
    const history = useHistory()

    React.useEffect(() => {
        fetch(`/council/${report_id}`)
        .then(data => data.json())
        .then(data => setOldReport(data))
    }, [])

    React.useEffect(() => {
        fetch(`/council/${report_id}`)
        .then(data => data.json())
        .then(data => {
            setMeetingForm({
                title: data.title,
                report: data.report
            })
        })
    }, [])

    function onChange(event) {
        const {name, value} = event.target
        setMeetingForm(oldForm => ({...oldForm, [name]: value}))
    }

    function isValid() {
        const {title, report} = meetingForm
        return title.length > 0 && report.length > 0
    }

    function deleteMeeting(id) {

        const options = {
            method: 'DELETE',
        };

        fetch(`/council/${id}`, options).then(response => {
            if (!response.ok) {
                console.log(response.body)
            } else {
                console.log("deleted")
                history.push("/council")
            }
        })
    }

    function onSubmit(e) {

        e.preventDefault();

        const data = {
            id: oldReport.id,
            title: meetingForm.title,
            report: meetingForm.report,
            dateTime: oldReport.dateTime,
            postThread: oldReport.postThread,
            district: oldReport.district,
            account: oldReport.account
        }

        console.log(data)

        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        return fetch(`/council/${data.id}`, options).then(response => {

            if (response.ok) {
                console.log(response)
                history.push("/council");
            }
            
            else {
                setError("Izvješće nije moguće promijeniti.");
                console.log(response.body);
            }
        })
    }

    return (
        <Card title="Uredi izvješće">
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
                        <button className="button" type="submit" disabled={!isValid()}>Spremi promjene</button>
                        <button className="button" type="button" onClick={() => {history.push("/council")}}>Odustani</button>
                    </div>
                </form>
            </div>
        </Card>
    )
}

export default CouncilFormEdit