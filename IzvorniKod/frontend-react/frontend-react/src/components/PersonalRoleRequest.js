import React from "react"
import Card from "./Card"
import { ReactSession } from "react-client-session"
import "./Login.css"
import PersonalRoleComponent from "./PersonalRoleComponent"
import "./Event.css"

function PerosnalRoleRequest() {

    const [account, setAccount] = React.useState({id: ''})
    const [roles, setRoles] = React.useState()
    
    const acc_username = ReactSession.get("username")

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account))
    }, [])

    React.useEffect(() => {
        fetch((account.id === undefined ? "/roles" : `/accounts/roles/${account.id}`))
        .then(data => data.json())
        .then(roles => setRoles(roles))
    }, [account])

    if (account.id != '' && roles !== undefined && roles.length > 0) {
        return <Card title="Moji zahtjevi za ulogama">
            <div className="Login">
                <div className='Event'>
                    <PersonalRoleComponent account={account} roles={roles} target={"Moderator"} targetId={2}/>
                </div>
                <div className='Event'>
                    <PersonalRoleComponent account={account} roles={roles} target={"Vijecnik"} targetId={3}/>
                </div>
            </div>
        </Card>
    }
    else return (
        <></>
    )
}

export default PerosnalRoleRequest
