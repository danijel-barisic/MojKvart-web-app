import React, { useEffect } from "react";
import "./Login.css"
import Card from "./Card";
import { useHistory } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Card16 from "./Card16";


function ForumNewThread(props) {
   const [form, setForm] = React.useState({ name: ''});
   const [error, setError] = React.useState('');
   const [district, setDistrict] = React.useState('');
   const [account, setAccount] = React.useState('');
   const user = ReactSession.get("username");
   const history = useHistory();
   
   const [threads, setThreads] = React.useState()
   const [allThreads,setAllThreads] = React.useState([])


   React.useEffect(() => {
      fetch(`/accounts/${user}/getdistrict`).then(data => data.json())
         .then(district => setDistrict(district));
      fetch(`/accounts/${user}`).then(data => data.json())
      .then(account => setAccount(account));
      fetch('/threads').then(data => data.json().then(data => setAllThreads(data)));
   }, []);

    React.useEffect(() => {
        if (account !== undefined && account.district !== undefined) {
            fetch('/threads')
            .then(data => data.json())
            .then(data => setThreads(data
                .filter(t => t.district.id === account.district.id)))
        }
    }, [account])

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
      if (is_unique(data.name)) {
         const options = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         };

         return fetch('/threads', options).then(response => {
            if (response.ok) {
               let last
               console.log(allThreads)
               if (allThreads.length == 0){
                  last = 0
                  history.push(`/forum/${last+1}`)
               }else{
               last = allThreads.at(-1).id
               history.push(`/forum/${last+1}`)
               }
            } else {
               setError("Došlo je do pogreške! Pokušaj ponovo!");
               console.log(response.body);
            }
         });
      }
   }
   //console.log(allThreads.at(-1))

   function isValid() {
      const { name } = form;
      let result = name.includes("[");
      let result2 = name.includes("]");
      return name.length > 0 && !result && !result2 && name.length < 20;
   }

   function is_unique(name) {
      if (threads.map(t => t.name).includes(name)){
          setError("Tema s predloženim naslovom već postoji!")
          return false
      }
      else {
          return true
      }
  }



   console.log()

   return (
      <>
      <div className="current-title">
         NOVA TEMA
      </div>
      <Card16>
         <div className='StreetForm Login'>
            <form onSubmit={onSubmit}>
               <div className='FormRow'>
                  <label>Ime</label>
                  <input required name='name' onChange={onChange} value={ form.name}/>
               </div>
               <div className='error'>{error}</div>
               <button className='button' type="button" onClick={() => {history.goBack()}}>Natrag</button>
               <button classname='submit' type='submit' disabled={!isValid()}>Stvori temu</button>
            </form>
         </div>
      </Card16>
      </>
   );
}

export default ForumNewThread;