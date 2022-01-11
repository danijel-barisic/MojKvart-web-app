import React, { useEffect } from "react";
import "./Login.css"
import Card from "./Card";
import { useHistory } from "react-router-dom";
import { ReactSession } from "react-client-session";


function ForumNewThread(props) {
   const [form, setForm] = React.useState({ name: ''});
   const [error, setError] = React.useState('');
   const [district, setDistrict] = React.useState('');
   const [account, setAccount] = React.useState('');
   const user = ReactSession.get("username");
   const history = useHistory();

   function onChange(event) {
      const { name, value } = event.target;
      setForm(oldForm => ({...oldForm, [name]: value}))
   }

   function onSubmit(e) {
      e.preventDefault();
      const data = {
         name: form.name,
         district: {
            id: district.id
         },
         account: {
            id: account.id
         }
      };
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      };

      return fetch('/threads', options).then(response => {
         if (response.ok) {
            history.goBack();
         } else {
            setError("Došlo je do pogreške! Pokušaj ponovo!");
            console.log(response.body);
         }
      });
   }

   function isValid() {
      const { name } = form;
      return name.length > 0;
   }

   React.useEffect(() => {
      fetch(`/accounts/${user}/getdistrict`).then(data => data.json())
         .then(district => setDistrict(district));
      fetch(`/accounts/${user}`).then(data => data.json())
      .then(account => setAccount(account));
   }, []);

   return (
      <Card title="Nova Tema">
         <div className='StreetForm Login'>
            <form onSubmit={onSubmit}>
               <div className='FormRow'>
                  <label>Ime</label>
                  <input required name='name' onChange={onChange} value={ form.name}/>
               </div>
               <div className='error'>{error}</div>
               <button classname='submit' type='submit' disabled={!isValid()}>Stvori temu</button>
               <button className='button' type="button" onClick={() => {history.goBack()}}>Natrag</button>
            </form>
         </div>
      </Card>
   );
}

export default ForumNewThread;