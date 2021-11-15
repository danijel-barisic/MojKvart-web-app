import React from "react";
import Card from "./Card";
import './Login.css';
import './Card.css';
import { useHistory } from "react-router";


function Registration(props) {
   const [registrationForm, setregistrationForm] = React.useState({ firstname: '', lastname: '', email: '', password: ''});
   const [error, setError] = React.useState('');
   const history = useHistory();

   function onChange(event) {
      const { name, value } = event.target;
      setregistrationForm(oldForm => ({...oldForm, [name]: value}))
   }

   function onSubmit(e) {
      e.preventDefault();
      setError("");
      const data = {
         firstname: registrationForm.firstname,
         lastname: registrationForm.lastname,
         email: registrationForm.username,
         password: registrationForm.password
      }
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      };
      fetch('/registration', options)
         .then(response => {
            console.log(response);
            if (!response.ok) {
               setError("Login Failed");
            } else {
               props.onLogin();
               history.push("/");
            }
         });
   }



   return (
      <Card>
         <div className='Login'>
            <form onSubmit={onSubmit}>
               <div className='FormRow'>
                  <label>FirstName</label>
                  <input name='firstname' onChange={onChange}value={ registrationForm.firstname}/>
               </div>
               <div className='FormRow'>
                  <label>LastName</label>
                  <input name='lastname' onChange={onChange} value={ registrationForm.lastname}/>
               </div>
               <div className='FormRow'>
                  <label>Email</label>
                  <input name='username' onChange={onChange} value={ registrationForm.username}/>
               </div>
               <div className='FormRow'>
                  <label>Password</label>
                  <input name='password' type='password' onChange={onChange} value={ registrationForm.password}/>
               </div>
               <div className='error'>{error}</div>
               <button className='submit' type='submit'>Register</button>
               <button className='button' type="button" onClick={() => {history.push("/login")}}>Login</button>
            </form>
         </div>
      </Card>
   );
}

export default Registration;