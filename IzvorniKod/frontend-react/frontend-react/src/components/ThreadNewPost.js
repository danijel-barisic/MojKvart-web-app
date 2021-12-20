import React, { useEffect } from "react";
import "./Login.css"
import Card from "./Card";
import { useHistory } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Thread from "./Thread";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function ThreadNewPost(props) {
   const [form, setForm] = React.useState({ content: ''});
   const [error, setError] = React.useState('');
   const [district, setDistrict] = React.useState('');
   const [account, setAccount] = React.useState('');
   const user = ReactSession.get("username");
   const history = useHistory();
   const {id : idD} = useParams();

   function onChange(event) {
       console.log(event.target)
      const { name, value } = event.target;
      setForm(oldForm => ({...oldForm, [name]: value}))
      
   }

   function onSubmit(e) {
      e.preventDefault();
      const data = {
         content: form.content,
         datetime:null,
         replyId:null,
         account: {
            id: account.id
         },
         thread: {
            id: idD        
         }
      };
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      };

      return fetch('/posts', options).then(response => {
         if (response.ok) {
            history.goBack();
         } else {
            setError("Something went wrong! Try again");
            console.log(response.body);
         }
      });
   }

   function isValid() {
      const { content } = form;
      return content.length > 0;
   }

   React.useEffect(() => {
      fetch(`/accounts/${user}/getdistrict`).then(data => data.json())
         .then(district => setDistrict(district));
      fetch(`/accounts/${user}`).then(data => data.json())
      .then(account => setAccount(account));
   }, []);
   
   return (
      <Card title="Nova Objava">
         <div className='StreetForm Login'>
            <form onSubmit={onSubmit}>
               <div className='FormRow'>
                  <label>Raspiši se...</label>
                  <textarea required name='content' onChange={onChange} value={ form.content}/>
               </div>
               <div className='error'>{error}</div>
               <button classname='submit' type='submit' disabled={!isValid()}>Stvori objavu</button>
               <button className='button' type="button" onClick={() => {history.goBack()}}>Nartag</button>
            </form>
         </div>
      </Card>
   );
}

export default ThreadNewPost;