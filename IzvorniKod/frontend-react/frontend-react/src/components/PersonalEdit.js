import React from "react";
import Card from "./Card";
import "./Login.css";
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";

function PersonalEdit() {
    
    const acc_username = ReactSession.get("username");
    const [account, setAccount] = React.useState({id: ''});
    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account));
    }, [])
    
    const history = useHistory();
    /* ovo je pokušaj samo bil hahahah metoda ne radi  */
    async function onSubmit(e) {
        e.preventDefault();
        console.log(account.firstName);
        console.log("upomoc upomoc");
        
        const data = {
            firstName: account.firstName,
            lastName: account.lastName,
            email: account.email,
            username: account.username,
            kvart: account.district.name,
            status: 0,
            account: account
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        return fetch("/personal", options).then(response => {
            if (response.ok) {
                history.push('/personal');
            }
            else {
                console.log(response.body);
            }
        });
    }
    /*popraviti za kvart asinkrono nešto */
   
    return (
        <>
            <Card title='Uredi osobne podatke'>
                <form onSubmit={onSubmit}>
                    <div className='Login'>
                        
                        <div className="FormRow">
                            <label>ime</label>
                            <input name="name"  defaultValue={ account["firstName"]}/>
                        </div>
                        <div className="FormRow">
                            <label>prezime</label>
                            <input name="name"  defaultValue={ account["lastName"]}/>
                        </div>
                        <div className="FormRow">
                            <label>email</label>
                            <input name="name" value={ account["email"]}/>
                        </div>
                        <div className="FormRow">
                            <label>korisničko ime</label>
                            <input name="name"  defaultValue={ account["username"]}/>
                        </div>
                        <div className="FormRow">
                            <label>kvart</label>
                            <input name="name"  defaultValue={ account["username"]}/>
                            
                        </div>
                        
                        
                        <div>
                            <div className='error'>{}</div>
                            <button className="button" type="submit" >Izmijeni osobne podatke</button>
                            <button className="button" type="button" onClick={() => {history.push("/personal")}}>Pregled osobnih podataka</button>
                            <button className="button" type="button" onClick={() => {history.push("/personal/password")}}>Promijeni lozinku</button>
                            <button className="button" type="button" onClick={() => {history.push("/personal/delete")}}>Brisanje accounta</button>
                       
                        </div>
                    </div>
                </form>
            </Card>
            
        </>
    );
}

export default PersonalEdit;