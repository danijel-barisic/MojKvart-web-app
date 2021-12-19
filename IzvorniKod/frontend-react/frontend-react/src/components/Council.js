import React from "react";
import Card from "./Card";
import CouncilMeetingCard from "./CouncilMeetingCard";
import "./Login.css";
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";

function Council() {
    const [meetings, setMeetings] = React.useState([])
    React.useEffect(() => {
        fetch('/council')
        .then(data => data.json())
        .then(data => setMeetings(data))
    }, [])
    const history = useHistory()

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

    if (roles !== undefined && roles.includes("Vijecnik"))
        return (
        <Card title="Izvješća s Vijeća četvrti">
            <div>
                <div className='Login'>
                    <button className='button' type="button" onClick={() => {history.push("/council/new_report")}}>Novo izvješće</button>
                </div>
            </div>
            <div>
                <div className='innerEvent'>
                    <div className='wrapper'>
                        {meetings.map(function (meeting) {
                            return (
                                <div className="inner">
                                    <CouncilMeetingCard meeting={meeting}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    )
    else return (
        <Card title="Izvješća s Vijeća četvrti">
            <div>
                <div className='innerEvent'>
                    <div className='wrapper'>
                        {meetings.map(function (meeting) {
                            return (
                                <div className="inner">
                                    <CouncilMeetingCard meeting={meeting}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Council;