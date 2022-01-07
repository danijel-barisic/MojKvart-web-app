import React from "react"
import Card from "./Card"
import ComponentCard from "./ComponentCard"
import CardAdminPersonal from "./CardAdminPersonal"
import { ReactSession } from "react-client-session"
import "./Login.css"
import { useHistory } from "react-router"
import '../style/style.css'
import { BsFillPersonLinesFill } from "react-icons/bs"


function Personal() {
    
    const [account, setAccount] = React.useState({id: undefined})
    const [roles, setRoles] = React.useState()
    
    const acc_username = ReactSession.get("username")
    const history = useHistory()

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account))
    }, [])

    React.useEffect(() => {
        if (account !== undefined && account.id !== undefined) {
            fetch(`/accounts/roles/${account.id}`)
            .then(data => data.json())
            .then(roles => setRoles(roles))
        }
    }, [account])

    function deleteUser() {
        const options = {
            method: 'DELETE',
        };
        fetch(`/accounts/${account.id}`, options)
            .then(response => {
                if (!response.ok) {
                    console.log(response.body);
                } else {
                    console.log("deleted");
                }
            });
        history.push("/")
        localStorage.clear()        
        window.location.reload()
    }

    function specialRoles() {

        let ret_val = ""

        for (var role of roles) {
            if (role.name !== "Stanovnik") {
                ret_val += role.name + ", "
            }
        }

        return ret_val.slice(0, -2)
    }

    if (account.id !== undefined && roles !== undefined && roles.length > 0) {
        if (roles.filter(r => r.name === "ADMIN").length > 0) return (
            <>
            <div className="current-title">
                <BsFillPersonLinesFill /> OSOBNI PODACI
            </div>
            <CardAdminPersonal>
                <div>
                    <div>
                        <table><tbody>
                            <tr>
                                <td style={{padding: "3px 15px"}}>
                                    <b>E-mail: </b>
                                </td>
                                <td style={{padding: "3px 15px"}}>
                                    <span>{acc_username}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{padding: "3px 15px"}}>
                                    <b>Ime: </b>
                                </td>
                                <td style={{padding: "3px 15px"}}>
                                    <span>{account.firstName}</span>
                                </td>
                            </tr>
                            <tr>
                            <td style={{padding: "3px 15px"}}>
                                    <b>Prezime: </b>
                                </td>
                                <td style={{padding: "3px 15px"}}>
                                    <span>{account.lastName}</span>
                                </td>
                            </tr>
                            <tr>
                            <td style={{padding: "3px 15px"}}>
                                    <b>Dodatne uloge: </b>
                                </td>
                                <td style={{padding: "3px 15px"}}>
                                    <span>{specialRoles()}</span>
                                </td>
                            </tr>
                        </tbody></table>
                            <div className='Login'>
                                <div className="flex-container">
                                    <button className='button' type="button" onClick={() => history.push("/osobno/promjena_podataka")}>Izmjena osobnih podataka</button>
                                </div>
                            </div>
                        </div>
                </div>
            </CardAdminPersonal>
            </>
            )
        else return (
            <>
            <div className="current-title">
                <BsFillPersonLinesFill /> OSOBNI PODACI
            </div>
            <ComponentCard>
                <div>
                    <div>
                        <table><tbody>
                            <tr>
                                <td style={{padding: "3px 15px"}}>
                                    <b>E-mail: </b>
                                </td>
                                <td style={{padding: "3px 15px"}}>
                                    <span>{acc_username}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{padding: "3px 15px"}}>
                                    <b>Ime: </b>
                                </td>
                                <td style={{padding: "3px 15px"}}>
                                    <span>{account.firstName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{padding: "3px 15px"}}>
                                    <b>Prezime: </b>
                                </td>
                                <td style={{padding: "3px 15px"}}>
                                    <span>{account.lastName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{padding: "3px 15px"}}>
                                    <b>Kvart: </b>
                                </td>
                                <td style={{padding: "3px 15px"}}>
                                    <span>{account.district.name}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style={{padding: "3px 15px"}}>
                                    <b>Adresa: </b>
                                </td>
                                <td style={{padding: "3px 15px"}}>
                                    <span>{`${account.home.street.name} ${account.home.number}`}</span>
                                </td>
                            </tr>
                            {
                                (roles.filter(r => r.name === "Moderator").length > 0 || (roles.filter(r => r.name === "Vijecnik").length > 0)) ?
                                <tr>
                                    <td style={{padding: "3px 15px"}}>
                                        <b>Dodatne uloge: </b>
                                    </td>
                                    <td style={{padding: "3px 15px"}}>
                                        <span>{specialRoles()}</span>
                                    </td>
                                </tr>
                                : <></>
                            }
                        </tbody></table>
                        <div className='Login'>
                            <div className="grid-container">
                                <button className='button' type="button" onClick={() => history.push("/osobno/promjena_podataka")}>Izmjena osobnih podataka</button>
                                <button className='button' type="button" onClick={() => {history.push("/osobno/zahtjevi_za_uloge")}} >Zahtjevi za ulogama</button>
                                <button className='button' type="button" onClick={() => {deleteUser()}}>Brisanje korisničkog računa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ComponentCard>
            </>
        )
    }
    else return (
        <></>
    )
}

export default Personal