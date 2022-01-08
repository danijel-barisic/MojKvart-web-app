import React from "react"
import Card from "./Card"
import { useHistory } from "react-router"
import { ReactSession } from "react-client-session"
import Card14 from "./Card14"

function CouncilMeetingReport() {

    const [meeting, setMeeting] = React.useState([])
    const [account, setAccount] = React.useState()
    const [roles, setRoles] = React.useState([{name: "temp"}])

    const currentURL = window.location.href
    const splitURL = currentURL.split("/")
    const id = splitURL.at(-1)

    const history = useHistory()
    const acc_username = ReactSession.get("username")

    const [updated, setUpdated] = React.useState(new Date())
    const [threads, setThreads] = React.useState()

    const [name, setName] = React.useState()
    
    React.useEffect(() => {
        if (account !== undefined && account.district !== undefined) {
            fetch("/threads")
            .then(data => data.json())
            .then(data => setThreads(data
                .filter(t => t.district.id === account.district.id)))
            if (name !== undefined) {
                let l = threads.filter(t => t.name === name)
                if (l.length > 0) {
                    create_post(l[0].id)
                    update_meeting(l[0].id)
                    history.push(`/forum/${l[0].id}`)
                }
                else {
                    setTimeout(() => {
                        setUpdated(new Date())
                    })
                }
            }
        }
    }, [updated, account, name])

    React.useEffect(() => {
        fetch(`/council/${id}`)
        .then(data => data.json())
        .then(data => setMeeting(data))
    }, [])

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account))
    }, [])

    React.useEffect(() => {
        if (account !== undefined && account.id !== undefined) {
            fetch((account.id === undefined ? "/roles" : `/accounts/roles/${account.id}`))
            .then(data => data.json())
            .then(roles => setRoles(roles))
        }
    }, [account])

    function deleteMeeting(id) {

        const options = {
            method: 'DELETE',
        }
        
        fetch(`/council/${id}`, options).then(response => {
            if (!response.ok) {
                console.log(response.body)
            } else {
                console.log("deleted");
                history.push("/vijece")
            }
        })
    }

    console.log(meeting)

    async function create_thread() {
        const data = {
            name: "[VIJEĆE ČETVRTI] " + meeting.title,
            district: {
                id: meeting.account.district.id
            },
            account: {
                id: meeting.account.id
            }
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch('/threads', options).then(response => {
            if (response.ok) {
                setUpdated(new Date())
                setName(data.name)
            }
        })
    }

    async function create_post(thread_id) {
        const data = {
            content: "Poveznica na izvješće: " + window.location.href,
            datetime: null,
            replyId: null,
            account: {
                id: meeting.account.id
            },
            threadId: thread_id
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(`/posts/${thread_id}`, options).then(response => {
            if (response.ok) {
                console.log("success")
            }
        })
    }

    function update_meeting(p) {
        console.log(p)
        const data = {
            id: meeting.id,
            title: meeting.title,
            report: meeting.report,
            dateTime: meeting.dateTime,
            postThread: {
                id: p
            },
            district: meeting.district,
            account: meeting.account
        }
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(`/council/${data.id}`, options).then(response => {
            if (response.ok) {
                console.log("postThread ažuriran")
            }
        })
    }

    if (meeting.account !== undefined && threads !== undefined) {

        return (
            <>
            <div className="current-title">{meeting.title}</div>
            <Card14>
                <table><tbody>
                <tr>
                    <td className="tdd"><b>Datum: </b></td>
                    <td className="tdd"><span>{meeting.dateTime}</span></td>
                </tr>
                <tr>
                    <td className="tdd"><b>Autor: </b></td>
                    <td className="tdd"><span>{`${meeting.account.firstName} ${meeting.account.lastName}`}</span></td>
                </tr>
                <tr>
                    <td className="tdd"><b>Izvješće: </b></td>
                    <td className="tdd"><span>{meeting.report}</span></td>
                </tr>
                <tr>
                    <td className="tdd"><b>Tema na Forumu: </b></td>
                    <td className="tdd">
                        {
                            meeting.postThread === null ? 
                            <button className="role-button-purple" type="button" onClick={() => create_thread()}>Napravi temu</button> : 
                            <button className="role-button-purple" type="button" onClick={() => history.push(`/forum/${meeting.postThread.id}`)}>Skoči na temu</button>
                        }
                    </td>
                </tr>
                </tbody></table>
                <div className="Login flex-container-row">
                    <div style={{margin: "auto"}}>
                    {(roles !== undefined && roles.length > 0 && roles.filter(r => r.name === "Vijecnik").length > 0) ?
                            <div className='Login'>
                                <button className='button' type="button" onClick={() => history.goBack()}>Natrag</button>
                                <button className='button' type="button" onClick={() => history.push(`/vijece/izvjesce/uredi/${id}`)}>Uredi</button>
                                <button className='button' type="button" onClick={() => deleteMeeting(meeting.id)}>Obriši</button>
                            </div>
                        : 
                            <div className='Login'>
                                <button className='button' type="button" onClick={() => history.goBack()}>Natrag</button>
                            </div>
                    }
                    </div>
                </div>
            </Card14>
            </>
        )

    }
    else return (
        <></>
    )
}

export default CouncilMeetingReport