import React from "react"
import Card from "./Card"
import "./Login.css"
import { useHistory } from "react-router"
import { ReactSession } from "react-client-session"

function CouncilForm() {

    const [error, setError] = React.useState('')
    const [account, setAccount] = React.useState({id: ''})
    const [meetingForm, setMeetingForm] = React.useState({title: '', report: ''})

    const history = useHistory()
    const acc_username = ReactSession.get("username")

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account))
    }, [])

    function onChange(event) {
        const {name, value} = event.target;
        setMeetingForm(oldForm => ({...oldForm, [name]: value}))
    }

    async function onSubmit(e) {

        e.preventDefault()
        
        var today = new Date()
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()

        today = `${yyyy}-${mm}-${dd}`

        const data = {
            title: meetingForm.title,
            report: meetingForm.report,
            dateTime: today,
            district: {
                id: account.district.id
            },
            account: {
                id: account.id
            }
        }

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        return fetch("/council", options).then(response => {
            if (response.ok) {
                history.push('/council')
            }
            else {
                setError("Prijedlog događaja nije moguće objaviti.");
                console.log(response.body)
            }
        })

    }

    function isValid() {
        const {title, report} = meetingForm
        return title.length > 0 && report.length > 0
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

export default CouncilForm