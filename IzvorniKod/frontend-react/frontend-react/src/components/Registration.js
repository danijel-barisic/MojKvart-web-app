import React from "react";
import Card from "./Card";
import './Login.css';
import './Card.css';
import { useHistory } from "react-router";
import Select from 'react-select';


//https://react-select.com/styles#styles
 const customStyles = {
   option: (provided, state) => ({
     ...provided,
     padding: 20,
     
   }),
   menuList: styles => ({
      
      
        ...styles,
        maxHeight: 138
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
   streets.map((street)=> streets_array.push({label:street.name,value:street.name,minNum:street.minStreetNo,maxNum:street.maxStreetNo} ))
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
    
   function onSubmit(e) {
      e.preventDefault();
      setError("");
      const data = {
         firstname: registrationForm.firstname,
         lastname: registrationForm.lastname,
         email: registrationForm.username,
         password: registrationForm.password,
         streetnumber:registrationForm.streetnumber,
         selectedOption:state.selectedOption
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
                  <Select value={selectedOption}  onChange = {handleChange} styles={customStyles} placeholder="Select your address"
                   options={streets_array}
               />
               </div>
               <div className='FormRow'>
                  <label color="blue">Street number</label>
                  <input type="number" name="streetnumber" required min={selectedOption ? selectedOption.minNum: 0} max={selectedOption ? selectedOption.maxNum: 0} onChange={onChange} />
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