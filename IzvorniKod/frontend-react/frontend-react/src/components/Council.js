import React from "react"
import Card from "./Card"
import CouncilMeetingCard from "./CouncilMeetingCard"
import "./Login.css"
import { useHistory } from "react-router"
import { ReactSession } from "react-client-session"

function Council() {

    const history = useHistory()

    const acc_username = ReactSession.get("username")

    const [account, setAccount] = React.useState()
    const [roles, setRoles] = React.useState([])
    const [meetings, setMeetings] = React.useState()

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account))
    }, []);

    React.useEffect(() => {
        if (account !== undefined) {
            fetch(`/accounts/roles/${account.id}`)
            .then(data => data.json())
            .then(roles => setRoles(roles))
        }
    }, [account])

    React.useEffect(() => {
        if (account !== undefined) {
            fetch('/council')
            .then(data => data.json())
            .then(data => setMeetings(data
                .filter(m => m.district.id === account.district.id)))
        }
    }, [account])

    if (meetings !== undefined && roles !== undefined && roles.length > 0) {
        if (roles.filter(r => r.name === "Vijecnik").length > 0) return (
            <Card title="Izvješća s Vijeća četvrti">
                <div>
                    <div className='Login'>
                        <button className='button' type="button" onClick={() => {history.push("/vijece/novo_izvjesce")}}>Novo izvješće</button>
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
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
    else return (
        <></>
    )
}

export default Council