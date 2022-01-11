import React from "react"
import Card from "./Card"
import { ReactSession } from "react-client-session"
import "./Login.css"
import { useHistory } from "react-router"

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
            <Card title="Osobni podaci">
                <div>
                    <div className='Login'>
                        <table><tbody>
                            <tr>
                                <td>
                                    <b>E-mail: </b>
                                </td>
                                <td>
                                    <span>{acc_username}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ime: </b>
                                </td>
                                <td>
                                    <span>{account.firstName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Prezime: </b>
                                </td>
                                <td>
                                    <span>{account.lastName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Dodatne uloge: </b>
                                </td>
                                <td>
                                    <span>{specialRoles()}</span>
                                </td>
                            </tr>
                        </tbody></table>
                        <div>
                            <div className='Login'>
                                <button className='button' type="button" >Izmjena osobnih podataka</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            )
        else if (roles.filter(r => r.name === "Moderator").length > 0 || (roles.filter(r => r.name === "Vijecnik").length > 0)) return (
            <Card title="Osobni podaci">
                <div>
                    <div className='Login'>
                        <table><tbody>
                            <tr>
                                <td>
                                    <b>E-mail: </b>
                                </td>
                                <td>
                                    <span>{acc_username}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ime: </b>
                                </td>
                                <td>
                                    <span>{account.firstName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Prezime: </b>
                                </td>
                                <td>
                                    <span>{account.lastName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Kvart: </b>
                                </td>
                                <td>
                                    <span>{account.district.name}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Adresa: </b>
                                </td>
                                <td>
                                    <span>{`${account.home.street.name} ${account.home.number}`}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Dodatne uloge: </b>
                                </td>
                                <td>
                                    <span>{specialRoles()}</span>
                                </td>
                            </tr>
                        </tbody></table>
                        <div className='Login'>
                            <button className='button' type="button" >Izmjena osobnih podataka</button>
                            <button className='button' type="button" onClick={() => {deleteUser()}}>Brisanje korisničkog računa</button>
                            <button className='button' type="button" onClick={() => {history.push("/personal/role_requests")}} >Zahtjevi za ulogama</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
        else return(
            <Card title="Osobni podaci">
                <div>
                    <div className='Login'>
                    <table><tbody>
                            <tr>
                                <td>
                                    <b>E-mail: </b>
                                </td>
                                <td>
                                    <span>{acc_username}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Ime: </b>
                                </td>
                                <td>
                                    <span>{account.firstName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Prezime: </b>
                                </td>
                                <td>
                                    <span>{account.lastName}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Kvart: </b>
                                </td>
                                <td>
                                    <span>{account.district.name}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>Adresa: </b>
                                </td>
                                <td>
                                    <span>{`${account.home.street.name} ${account.home.number}`}</span>
                                </td>
                            </tr>
                        </tbody></table>
                        <div className='Login'>
                            <button className='button' type="button" >Izmjena osobnih podataka</button>
                            <button className='button' type="button" onClick={() => {deleteUser()}}>Brisanje korisničkog računa</button>
                            <button className='button' type="button" onClick={() => {history.push("/personal/role_requests")}} >Zahtjevi za ulogama</button>
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

export default Personal