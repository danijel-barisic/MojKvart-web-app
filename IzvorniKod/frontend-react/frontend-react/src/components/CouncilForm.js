import React from "react"
import Card from "./Card"
import "./Login.css"
import { useHistory } from "react-router"
import { ReactSession } from "react-client-session"
import Card15 from "./Card15"

function CouncilForm() {

    const [error, setError] = React.useState('')
    const [account, setAccount] = React.useState({id: ''})
    const [meetingForm, setMeetingForm] = React.useState({title: '', report: ''})

    const [meetings, setMeetings] = React.useState()
    React.useEffect(() => {
        if (account !== undefined && account.district !== undefined) {
            fetch('/council')
            .then(data => data.json())
            .then(data => setMeetings(data
                .filter(m => m.district.id === account.district.id)))
        }
    }, [account])

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

        if (meetingForm.title.length > 25) {
            setError("Naslov izvješća smije sadržavati maksimalno 25 znakova!")
        }

        else {

            if (is_unique(data.title)) {
                
                const options = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
        
                return fetch("/council", options).then(response => {
                    if (response.ok) {
                        history.push('/vijece')
                    }
                    else {
                        setError("Prijedlog događaja nije moguće objaviti.");
                        console.log(response.body)
                    }
                })
            }
        }


    }

    function isValid() {
        const {title, report} = meetingForm
        return title.length > 0 && report.length > 0
    }

    function is_unique(title) {
        if (meetings.map(m => m.title).includes(title)){
            setError("Izvješće s predloženim naslovom već postoji!")
            return false
        }
        else {
            return true
        }
    }

    if (meetings !== undefined) return (
        <>
        <div className="current-title">NOVO IZVJEŠĆE</div>
        <Card15>
            <div className="Login">
                <form onSubmit={onSubmit}>
                    <div className="FormRow">
                        <label>Naslov</label>
                        <input name="title" required onChange={onChange} value = {meetingForm.title}/>
                    </div>
                    <div className="FormRow">
                        <label>Sadržaj</label>
                        <textarea rows={6} cols={50} name="report" required onChange={onChange} value = {meetingForm.report}/>
                    </div>
                    <div>
                        <div className='error'>{error}</div>
                        <button className="button" type="button" onClick={() => {history.push("/vijece")}}>Natrag</button>
                        <button className="button" type="submit" disabled={!isValid()}>Objavi izvješće</button>
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

export default CouncilForm