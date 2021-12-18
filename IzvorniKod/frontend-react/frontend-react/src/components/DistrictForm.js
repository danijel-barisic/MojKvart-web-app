import React from "react";
import Card from "./Card";
import { useHistory } from "react-router-dom";

function DistrictForm(props) {
   const [form, setForm] = React.useState({ name: '' });
   const [error, setError] = React.useState('');
   const history = useHistory();

   function onChange(event) {
      const { name, value } = event.target;
      setForm(oldForm => ({...oldForm, [name]: value}))
   }

   function onSubmit(e) {
      e.preventDefault();
      const data = {
         name: form.name
      };
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      };

      return fetch('/districts', options).then(response => {
         if (response.ok) {
            history.push('/kvartovi');
         }
         else {
            setError("District with given name already exist!");
            console.log(response.body);
         }
      });
   }

   function isValid() {
      const { name } = form;
      return name.length > 0;
   }


   return (
      <Card title='Novi Kvart'>
         <div className='StreetForm Login'>
            <form onSubmit={onSubmit}>
               <div className='FormRow'>
                  <label>Ime Kvarta</label>
                  <input required name='name' onChange={onChange} value={ form.name}/>
               </div>
               <div className='error'>{error}</div>
               <button type='submit' disabled={!isValid()}>Dodaj Kvart</button>
               <button className='button' type="button" onClick={() => {history.push("/kvartovi")}}>Kvartovi</button>
            </form>
         </div>
      </Card>
   );
}

export default DistrictForm;