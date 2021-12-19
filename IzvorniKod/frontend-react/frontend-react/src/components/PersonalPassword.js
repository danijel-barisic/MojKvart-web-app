import React from "react";
import Card from "./Card";
import "./Login.css";
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";

function PersonalDelete() {
    const acc_username = ReactSession.get("username");
    const [account, setAccount] = React.useState({id: ''});
    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account));
    }, [])

    /*ovde bi trebalo valjda dodat metodu kaj to obriše*/
    async function onSubmit(e) {
     /*du du du nema nam pomoći*/   
    }
    return (
        <>
            <Card title='Izmijeni lozinku'>
                <form onSubmit={onSubmit}>
                    <div className='Login'>
                        
                        <div className="FormRow">
                            <label>lozinka</label>
                            <input name="password"  defaultValue={ account["password"]}/>
                        </div>
                        
                    </div>
                </form>
            </Card>
        </>
    );
}

export default PersonalDelete;