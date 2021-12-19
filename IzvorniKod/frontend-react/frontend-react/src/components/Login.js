import React from "react";
import Card from "./Card";
import './Login.css';
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";


function Login(props) {
   const [loginForm, setLoginForm] = React.useState({ username: '', password: ''});
   const [error, setError] = React.useState('');
   const history = useHistory();


   function onChange(event) {
      const { name, value } = event.target;
      setLoginForm(oldForm => ({...oldForm, [name]: value}))
   }

   async function onSubmit(e) {
      e.preventDefault();
      setError("");
      const body = `username=${loginForm.username}&password=${loginForm.password}`;
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: body
      };
      fetch('/login', options)
         .then(response => {
            /* console.log(response); */
            if (response.status === 401) {
               setError("Username is banned!");
               return "error";
            }
            else if (!response.ok) {
               setError("Login failed");
               return "error";
            } else {
               return response.text();
            }
         }).then(function (data) {
            if (data !== "error") {
               var splitted = data.split("|");
               console.log(splitted[0]);
               /* console.log(splitted[1]); */
               ReactSession.set("username", loginForm.username);
               ReactSession.set(loginForm.username, splitted[0]);
               props.onLogin(splitted[0]);
               history.push("/");
            }
         }
         );
   }

   return (
      <Card>
         <div className='Login'>
            <form onSubmit={onSubmit}>
               <div className='FormRow'>
                  <label>Username</label>
                  <input name='username' required onChange={onChange} value={ loginForm.username}/>
               </div>
               <div className='FormRow'>
                  <label>Password</label>
                  <input name='password' type='password' required onChange={onChange} value={ loginForm.password}/>
               </div>
               <div className='error'>{error}</div>
               <button className='button' type='submit'>Login</button>
               <button className='button' type="button" onClick={() => {history.push("/registration")}}>Registration</button>
            </form>
         </div>
      </Card>
   );
}

export default Login;