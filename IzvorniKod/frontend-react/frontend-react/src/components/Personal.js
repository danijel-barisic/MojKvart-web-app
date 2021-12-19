import React from "react";
import Card from "./Card";
import { ReactSession } from "react-client-session";
import "./Login.css";

function Personal() {

    const acc_username = ReactSession.get("username");
    
    const [account, setAccount] = React.useState({id: ''});
    const [roles, setRoles] = React.useState();

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account));
    }, []);

    React.useEffect(() => {
        fetch((account.id === undefined ? "/roles" : `/accounts/roles/${account.id}`))
        .then(data => data.json())
        .then(roles => setRoles(roles))
    }, [account])

    function specialRoles() {
        let ret_val = ""
        for (var role of roles) {
            if (role.name !== "Stanovnik") {
                ret_val += role.name + ", "
            }
        }
        return ret_val.slice(0, -2)
    }

    if (account.id != '' && roles !== undefined && roles.length > 0) {
        if (roles.filter(r => r.name === "ADMIN").length > 0) {
            return (
                <Card title="Osobni podaci">
                    <div>
                        <div className='Login'>
                            <div>
                                <b>E-mail: </b>
                                <span>{acc_username}</span>
                            </div>
                            <div>
                                <b>Ime: </b>
                                <span>{account.firstName}</span>
                            </div>
                            <div>
                                <b>Prezime: </b>
                                <span>{account.lastName}</span>
                            </div>
                            <div>
                                <b>Dodatne uloge: </b>
                                <span>{specialRoles()}</span>
                            </div>
                            <div>
                            <div className='Login'>
                                <button className='button' type="button" >Izmjena osobnih podataka</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </Card>
            )
        } else if (roles.filter(r => r.name === "Moderator").length > 0
            || (roles.filter(r => r.name === "Vijecnik").length > 0))  {
            return (
                <Card title="Osobni podaci">
                    <div>
                        <div className='Login'>
                            <div>
                                <b>E-mail: </b>
                                <span>{acc_username}</span>
                            </div>
                            <div>
                                <b>Ime: </b>
                                <span>{account.firstName}</span>
                            </div>
                            <div>
                                <b>Prezime: </b>
                                <span>{account.lastName}</span>
                            </div>
                            <div>
                                <b>Kvart: </b>
                                <span>{account.district.name}</span>
                            </div>
                            <div>
                                <b>Adresa: </b>
                                <span>{`${account.home.street.name} ${account.home.number}`}</span>
                            </div>
                            <div>
                                <b>Dodatne uloge: </b>
                                <span>{specialRoles()}</span>
                            </div>
                            <div className='Login'>
                                <button className='button' type="button" >Izmjena osobnih podataka</button>
                                <button className='button' type="button" >Brisanje korisničkog računa</button>
                                <button className='button' type="button" >Zahtjevi za ulogom</button>
                            </div>
                        </div>
                    </div>
                </Card>
            )
        } else {
            return(
                <Card title="Osobni podaci">
                    <div>
                        <div className='Login'>
                            <div>
                                <b>E-mail: </b>
                                <span>{acc_username}</span>
                            </div>
                            <div>
                                <b>Ime: </b>
                                <span>{account.firstName}</span>
                            </div>
                            <div>
                                <b>Prezime: </b>
                                <span>{account.lastName}</span>
                            </div>
                            <div>
                                <b>Kvart: </b>
                                <span>{account.district.name}</span>
                            </div>
                            <div>
                                <b>Adresa: </b>
                                <span>{`${account.home.street.name} ${account.home.number}`}</span>
                            </div>
                            <div className='Login'>
                                <button className='button' type="button" >Izmjena osobnih podataka</button>
                                <button className='button' type="button" >Brisanje korisničkog računa</button>
                                <button className='button' type="button" >Zahtjevi za ulogom</button>
                            </div>
                        </div>
                    </div>
                </Card>
            )
        }
    }
    else return (
        <>
        </>
    )
}

export default Personal;