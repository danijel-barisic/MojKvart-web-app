import React from "react";
import Card from "./Card";
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";

function CouncilMeetingReport() {

    const currentURL = window.location.href
    const splitURL = currentURL.split("/")
    const id = splitURL.at(-1)

    const [meeting, setMeeting] = React.useState([])
    React.useEffect(() => {
        fetch(`/council/${id}`)
        .then(data => data.json())
        .then(data => setMeeting(data))
    }, [])

    const history = useHistory();

    const acc_username = ReactSession.get("username");
    const [account, setAccount] = React.useState({id: ''});
    const [roles, setRoles] = React.useState([{name: "temp"}]);

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account));
    }, []);

    React.useEffect(() => {
        fetch(`/roles/${account.id}`)
        .then(data => data.json())
        .then(data => data.name)
        .then(roles => setRoles(roles))
    }, [account])

    function deleteMeeting(id) {
        const options = {
            method: 'DELETE',
        };
        fetch(`/council/${id}`, options).then(response => {
            if (!response.ok) {
                console.log(response.body)
            } else {
                console.log("deleted");
                history.push("/council")
            }
        })
    }

    if (meeting.account !== undefined) {

        if (roles !== undefined && roles.includes("Vijecnik"))
        return (
            <Card title={meeting.title}>
            <div>
                <b>Datum: </b>
                <span>{meeting.dateTime}</span>
            </div>
            <div>
                <b>Autor: </b>
                <span>{`${meeting.account.firstName} ${meeting.account.lastName}`}</span>
            </div>
            <div>
                <b>Izvješće: </b>
                <span>{meeting.report}</span>
            </div>
            <div className='Login'>
                <button className='button' type="button" onClick={() => history.push(`/council/report/edit/${id}`)}>Uredi</button>
                <button className='button' type="button" onClick={() => deleteMeeting(meeting.id)}>Obriši</button>
            </div>
        </Card>
        )
        else return (
            <Card title={meeting.title}>
            <div>
                <b>Datum: </b>
                <span>{meeting.dateTime}</span>
            </div>
            <div>
                <b>Autor: </b>
                <span>{`${meeting.account.firstName} ${meeting.account.lastName}`}</span>
            </div>
            <div>
                <b>Izvješće: </b>
                <span>{meeting.report}</span>
            </div>
        </Card>
        )

    }
    else return (
        <>
        </>
    )
}

export default CouncilMeetingReport;