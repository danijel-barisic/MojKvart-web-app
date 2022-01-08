import React from "react"
import Card from "./Card"
import { ReactSession } from "react-client-session"
import "./Login.css"
import PersonalRoleComponent from "./PersonalRoleComponent"
import "./Event.css"
import Card2 from "./Card2"
import { useHistory } from "react-router-dom";

function PerosnalRoleRequest() {

    const [account, setAccount] = React.useState({id: undefined})
    const [roles, setRoles] = React.useState()
    
    const acc_username = ReactSession.get("username")
    const history = useHistory();

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

    if (account.id != undefined && roles !== undefined && roles.length > 0) {
        return (
            <>
                <div className="current-title">
                    MOJI ZAHTJEVI ZA ULOGAMA
                </div>
                <Card2>
                <div className="Login">
                    <div className="grid-two">
                        <div className='RoleRequestUser'>                    
                            <PersonalRoleComponent account={account} roles={roles} target={"Moderator"} targetId={2}/>
                        </div>
                        <div className='RoleRequestUser'>
                            <PersonalRoleComponent account={account} roles={roles} target={"Vijecnik"} targetId={3}/>
                        </div>
                    </div>
                    <div className="flex-container">
                        <button onClick={() => history.goBack()}>Povratak</button>
                    </div>
                </div>
                </Card2>
            </>
        )
    }
    else return (
        <></>
    )
}

export default PerosnalRoleRequest
