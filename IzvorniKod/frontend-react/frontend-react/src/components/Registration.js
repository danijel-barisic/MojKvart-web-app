import React from "react";
import CardLogin from "./CardLogin";
import './Login.css';
import './Card.css';
import { useHistory } from "react-router";
import Select from 'react-select';
import ReactSession from "react-client-session/dist/ReactSession";
import { ReactComponent as Logo } from '../assets/city.svg';
import { RiLoginBoxFill } from 'react-icons/ri'

//https://react-select.com/styles#styles
 const customStyles = {
   option: (provided, state) => ({
     ...provided,
     padding: 20,
     borderRadius:'10px'
   }),
   menuList: styles => ({
      
      
        ...styles,
      maxHeight: 138,
      color: 'black',
      borderRadius:'10px'
      }),
   control: styles => ({ ...styles, backgroundColor: 'white',borderRadius:'10px' }),
   singleValue: (provided, state) => {
     const opacity = state.isDisabled ? 0.5 : 1;
     const transition = 'opacity 300ms';
 
     return { ...provided, opacity, transition };
   }
 }


function Registration(props) {
   const [registrationForm, setregistrationForm] = React.useState({ firstname: '', lastname: '', email: '', password: '',streetnumber: ''});
   const [streets, setStreets] = React.useState([]);
   const [error, setError] = React.useState('');
   const [state,setState] = React.useState({selectedOption:null})
   
   const history = useHistory();
   var { selectedOption } = state;

   React.useEffect(()=>{
      fetch('/streets').then((data) => data.json()).then((streets) => setStreets(streets))
      
   },[])
   const streets_array = []
   streets.map((street)=> streets_array.push({id:street.id, label:street.name,value:street.name,minNum:street.minStreetNo,maxNum:street.maxStreetNo} ))
   //console.log(streets_array)


   function onChange(event) {
      const { name, value } = event.target;
      //console.log(event)
      setregistrationForm(oldForm => ({...oldForm, [name]: value}))
   }

   
    function handleChange(selectedOption) {
      setState({ selectedOption });
      console.log(selectedOption)
     
    }
    
   async function onSubmit(e) {
      e.preventDefault();
      setError("");
      let err = "";
      const data = {
         firstname: registrationForm.firstname,
         lastname: registrationForm.lastname,
         email: registrationForm.username,
         password: registrationForm.password,
         streetnumber: registrationForm.streetnumber,
         street: {
            id: selectedOption.id,
            label: selectedOption.label,
            value: selectedOption.value,
            minNum: selectedOption.minNum,
            maxNum: selectedOption.maxNum
         }
      }
      const optionsreg = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      };
      const res = await fetch('/registration', optionsreg)
         .then(response => {
            console.log(response);
            if (!response.ok) {
               err = "error";
               setError("Login Failed");
            }
         });
      if (err === "") {
         nextfunction();
      }
   }

   async function nextfunction() {
      const body = `username=${registrationForm.username}&password=${registrationForm.password}`;
      const optionslog = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         body: body
      };
      fetch('/login', optionslog)
         .then(response => {
            console.log(response);
            if (!response.ok) {
            } else {
               props.onLogin();
               return response.text();
            }
         }).then(function (data) {
            console.log(data);
            var logedinfo = data.split("|");
            console.log(logedinfo[0]);
            console.log(logedinfo[1]);
            ReactSession.set("username", registrationForm.username);
            ReactSession.set(registrationForm.username, logedinfo[0]);
            props.onLogin();
            history.push("/");
         }
         ).catch(err => {console.log(err)});
   }

   

   return (
      <>
      <div className="current-title">
        <RiLoginBoxFill className="icon-color" /> REGISTRACIJA
      </div>
      <div className="logres">
      <div className="center-contents">
         <Logo />
      </div>
      <CardLogin>
         <div className='Login'>
            <form onSubmit={onSubmit}>
               <div className='FormRow'>
                  <label>FirstName</label>
                  <input name='firstname' required onChange={onChange}value={ registrationForm.firstname}/>
               </div>
               <div className='FormRow'>
                  <label>LastName</label>
                  <input name='lastname' required onChange={onChange} value={ registrationForm.lastname}/>
               </div>
               <div className='FormRow'>
                  <label>Email</label>
                  <input name='username' required onChange={onChange} value={ registrationForm.username}/>
               </div>
               <div className='FormRow'>
                  <label>Password</label>
                  <input name='password' required type='password' onChange={onChange} value={ registrationForm.password}/>
               </div>
			    <div className='FormRow'>
                  <label>Address</label>
                  <Select value={selectedOption} required onChange = {handleChange} styles={customStyles} placeholder="Select your address"
                   options={streets_array}
               />
               </div>
               <div className='FormRow'>
                  <label>Street number</label>
                  <input type="number" name="streetnumber" min={selectedOption ? selectedOption.minNum: 0} max={selectedOption ? selectedOption.maxNum: 0} required onChange={onChange} />
                  </div>
               <div className='error'>{error}</div>
               <button className='submit' type='submit'>Register</button>
               <button className='button' type="button" onClick={() => {history.push("/login")}}>Login</button>
            </form>
         </div>
            </CardLogin>
         </div>
      </>
   );
}

export default Registration;