import React from 'react'
import "./Login.css"
import Card from "./Card";
import { useHistory } from "react-router-dom";
import { ReactSession } from "react-client-session";
import Thread from "./Thread";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import './ThreadNewPost.css';
import Card16 from './Card16';

const PostEditForm = () => {
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
    //console.log(event.target)
       const { name, value } = event.target;
       setForm(oldForm => ({...oldForm, [name]: value}))
       
    }
 
    function onSubmit(e) {
       e.preventDefault();
       const data = {
          id: idP,
          content: form.content,
          datetime:posts.datetime,
          replyId:posts.replyId,
          account: {
             id: account.id
          },
          threadId:posts.threadId
       };
       const options = {
          method: 'PUT',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
       };
 
       fetch(`/posts/${idP}`, options).then(response => {
          console.log(JSON.stringify(data))
          if (response.ok) {
             console.log("Nice");
             history.goBack();
          } else {
             setError("Something went wrong! Try again");
             console.log(response.body);
          }
       });
       form.content = ''
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
     React.useEffect(() => {
        fetch(`/posts/${idP}`)
        .then(data => data.json())
        .then(data => setPosts(data)
        )
    }, [])
    console.log(posts)
    return (
        <div className="footer">
         <div className="current-title">
            UREDI OBJAVU
         </div>
        <Card16>
           <div className='StreetForm Login'>
              <form onSubmit={onSubmit}>
                 <div className='FormRow'>
                    <label>Raspiši se...</label>
                    <textarea rows={6} cols={50} required name='content' onChange={onChange} value={ form.content} defaultValue= {posts.content}/>
                 </div>
                 <div className='error'>{error}</div>
                 <button classname='submit' type='submit' disabled={!isValid()} >Uredi objavu</button>
                 <button className='button' type="button" onClick={() => {history.goBack()}}>Natrag</button>
              </form>
           </div>
        </Card16>
     </div>
    );
 }

export default PostEditForm
