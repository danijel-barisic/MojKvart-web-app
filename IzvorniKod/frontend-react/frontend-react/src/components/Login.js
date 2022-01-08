import React from "react";
import './Login.css';
import '../style/style.css';
import { useHistory } from "react-router";
import { ReactSession } from "react-client-session";
import CardLogin from "./CardLogin";
import { RiLoginBoxFill } from 'react-icons/ri';
import { ReactComponent as Logo } from '../assets/city2.svg';


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
            if (!response.ok) {
               var varr = undefined;
               var varrsplitted = undefined;
               var serverresponse = response.text();
               serverresponse.then(res => {
                  varr = res;
                  console.log(varr);
                  varrsplitted = varr.split("|");
                  if (varrsplitted[0] === "Blocked") {
                     setError("Korisnik je blokiran!");
                     return "error";
                  }
               });
               setError("Username ili password je pogrešan!");
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
               ReactSession.set("addressValid", splitted[1]);
               props.onLogin(splitted[0]);
               history.push("/");
            }
         }
         );
   }
   
   return (
      <>
      <div className="current-title">
        <RiLoginBoxFill className="icon-color" /> PRIJAVA
      </div>
      {/* <div className="logres">
         <img src="../../winter-village-4567947.png" alt="MojKvart"></img>
      </div> */}
      <div className="logres">
         <div className="center-contents">
            <Logo />
         </div>
         <CardLogin>
            <div className='Login'>
               <form onSubmit={onSubmit}>
                  <div className='FormRow'>
                     <label>Korisničko ime</label>
                     <input name='username' required onChange={onChange} value={ loginForm.username}/>
                  </div>
                  <div className='FormRow'>
                     <label>Lozinka</label>
                     <input name='password' type='password' required onChange={onChange} value={ loginForm.password}/>
                  </div>
                  <div className='error'>{error}</div>
                  <button className='button' type="button" onClick={() => {history.push("/registration")}}>Registracija</button>
                  <button className='button' type='submit'>Prijavi se</button>
               </form>
            </div>
         </CardLogin>
         </div>
      </>
   );
}

export default Login;