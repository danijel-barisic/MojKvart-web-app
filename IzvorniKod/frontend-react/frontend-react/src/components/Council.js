import React from "react"
import Card from "./Card"
import CouncilMeetingCard from "./CouncilMeetingCard"
import "./Login.css"
import { useHistory } from "react-router"
import { ReactSession } from "react-client-session"
import {FaPenAlt} from 'react-icons/fa'
import Card12 from "./Card12"
import Card17 from "./Card17"

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
        return (
            <>
                <div className="current-title">
                    <FaPenAlt/> VIJEĆE ČETVRTI
                </div>
                <div className="grid-father">
                    <Card17>
                            <h2>IZVJEŠĆA</h2>
                            {(roles.filter(r => r.name === "Vijecnik").length > 0) ?
                            <div className="flex-container-right">
                                <div>
                                <button className='button-purple' type="button" onClick={() => {history.push("/vijece/novo_izvjesce")}}>Novo izvješće</button>
                                </div>
                            </div>
                            : <></>}
                        </Card17>
                        {meetings.map(function (meeting) {
                            return (
                                <Card12>
                                    <h2>{meeting.title}</h2>
                                    <div className="Login flex-container-right">
                                        <div>
                                        <button className='button' type="button" onClick={() => {history.push(`/vijece/izvjesce/${meeting.id}`)}}>Više informacija</button>
                                        </div>
                                    </div>
                                </Card12>
                            )
                        })}
                </div>
            </>
        )
    }
    else return (
        <></>
    )
}

export default Council