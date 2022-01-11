import React from "react"
import Card from "./Card"
import "./Login.css"
import { useHistory } from "react-router"
import { ReactSession } from "react-client-session"
import Card15 from "./Card15"

function CouncilFormEdit() {

    const currentURL = window.location.href
    const splitURL = currentURL.split("/")
    const report_id = splitURL.at(-1)

    const [oldReport, setOldReport] = React.useState([])
    const [error, setError] = React.useState('')
    const [meetingForm, setMeetingForm] = React.useState({title: '', report: ''})
    
    const history = useHistory()
    const acc_username = ReactSession.get("username")

    const [account, setAccount] = React.useState({id: ''})

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account))
    }, [])

    const [meetings, setMeetings] = React.useState()
    React.useEffect(() => {
        if (account !== undefined && account.district !== undefined) {
            fetch('/council')
            .then(data => data.json())
            .then(data => setMeetings(data
                .filter(m => m.district.id === account.district.id)))
        }
    }, [account])

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

    function is_unique(title) {
        return true
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
                history.push("/vijece")
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

        if (is_unique(data.title)) {

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
                    history.push("/vijece");
                }
                
                else {
                    setError("Izvješće nije moguće promijeniti.");
                    console.log(response.body);
                }
            })
        }

    }
    if (meetings !== undefined) return (
        <>
        <div className="current-title">UREDI IZVJEŠĆE</div>
        <Card15>
            <div className="Login">
                <form onSubmit={onSubmit}>
                    <div className="FormRow">
                        <label>Naslov</label>
                        <input name="title" readOnly="readOnly" onChange={onChange} value = {meetingForm.title}/>
                    </div>
                    <div className="FormRow">
                        <label>Sadržaj</label>
                        <textarea rows={6} cols={50} name="report" required onChange={onChange} value = {meetingForm.report}/>
                    </div>
                    <div>
                        <div className='error'>{error}</div>
                        <button className="button" type="button" onClick={() => {history.push("/vijece")}}>Odustani</button>
                        <button className="button" type="submit" disabled={!isValid()}>Spremi promjene</button>
                    </div>
                </form>
            </div>
        </Card15>
        </>
    )
    else return (
        <></>
    )
}

export default CouncilFormEdit