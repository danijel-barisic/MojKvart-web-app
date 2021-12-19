import React from "react";
import Card from "./Card";
import "./Login.css";
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";

function Personal() {
    const acc_username = ReactSession.get("username");
    const [account, setAccount] = React.useState({id: ''});
    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account));
    }, [])
    const history = useHistory();
    console.log("UPOMMOC UPOMOC")
    /*popraviti za kvart asinkrono nešto jer mi to nije išlo*/
   
    return (
        <>
            <Card title='Pregled osobnih podataka'>
                <div>
                    <div className='Login'>
                    
                        <div>ime: {account["firstName"] }</div>
                        <div>prezime: {account["lastName"] }</div>
                        <div>email: {account["email"] }</div>
                        <div>korisničko ime: {account["username"] }</div>
                        <div>kvart: {account["username"]}</div>
                        <div className='edit'>
                        <button className='button' type="button" onClick={() => {history.push("/personal/edit")}}>Uredi osobne podatke</button>
                        </div>
                    </div>
                </div>
                
            </Card>
            </>
    );
}


export default Personal;