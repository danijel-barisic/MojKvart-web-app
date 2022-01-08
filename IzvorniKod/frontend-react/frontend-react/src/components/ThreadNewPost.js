import React, { useEffect } from "react";
import "./Login.css"
import Card from "./Card";
import { useHistory } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Thread from "./Thread";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import CardNewPost from "./CardNewPost";


function ThreadNewPost(props) {
   const [form, setForm] = React.useState({ content: ''});
   const [error, setError] = React.useState('');
   const [district, setDistrict] = React.useState('');
   const [account, setAccount] = React.useState('');
   const [posts, setPosts] = React.useState('');
   const user = ReactSession.get("username");
   const history = useHistory();
   const {idT, idP} = useParams()
   console.log(idT, idP)
   
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
         threadId:idT
      };
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      };

      fetch(`/posts/${idT}`, options).then(response => {
         console.log(JSON.stringify(data))
         if (response.ok) {
            console.log("Nice");
            props.onNewPost();
         } else {
            setError("Something went wrong! Try again");
            console.log(response.body);
         }
      });
      form.content = ''
   }

   function onSubmitReply(e) {
      e.preventDefault();
      const data = {
         content: form.content,
         datetime:null,
         replyId:idP,
         account: {
            id: account.id
         },
         threadId:idT
      };
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      };

      fetch(`/posts/${idT}`, options).then(response => {
         console.log(JSON.stringify(data))
         if (response.ok) {
            console.log("Nice");
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
      idP == undefined ? 
         
            <CardNewPost >
               <div className='NewPostArea'>
                  <form onSubmit={onSubmit}>
                     <div className='NewPostForm'>
                        <label>Raspiši se...</label>
                        <textarea required name='content' onChange={onChange} value={ form.content}/>
                     </div>
                     <div className='error'>{error}</div>
                     <button className='button' type="button" onClick={() => {history.goBack()}}>Natrag</button>
                     <button classname='submit' type='submit' disabled={!isValid()} >Stvori objavu</button>
                  </form>
               </div>
            </CardNewPost>
         
         :
         <div className="footer2">
            <Card title="Odgovori na objavu">
               <div className='StreetForm Login'>
                  <form onSubmit={onSubmitReply}>
                     <div className='FormRow'>
                        <label>Raspiši se...</label>
                        <textarea required name='content' onChange={onChange} value={ form.content}/>
                     </div>
                     <div className='error'>{error}</div>
                     <button className='button' type="button" onClick={() => {history.goBack()}}>Natrag</button>
                     <button classname='submit' type='submit' disabled={!isValid()}>Odgovori</button>
                  </form>
               </div>
            </Card>
         </div>
   );
}

export default ThreadNewPost;