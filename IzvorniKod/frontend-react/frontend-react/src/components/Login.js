import React from "react";

function Login() {
   const [loginForm, setLoginForm] = React.useState({ username: '', password: '' });

   function onChange(event) {
      const { name, value } = event.target;
      setLoginForm(oldForm => ({...oldForm, [name]: value}))
   }

   return (
      <div className='Login'>
         <Form>
            <div className='FormRow'>
               <label>Username</label>
               <input name='username' onChange={onChange} value={ loginForm.username}/>
            </div>
            <div className='FormRow'>
               <label>Password</label>
               <input name='password' type='password' onChange={onChange} value={ loginForm.password}/>
            </div>
            <button type='submit'>Login</button>
         </Form>
      </div>
   );
}