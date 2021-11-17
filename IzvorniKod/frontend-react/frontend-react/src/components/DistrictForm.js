import React from "react";
import Card from "./Card";

function DistrictForm(props) {
   const [form, setForm] = React.useState({ name: ''});

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
            props.history.push('/districts');
         }
      });
   }

   function isValid() {
      const { name } = form;
      return name.length > 0;
   }


   return (
      <Card title='New District'>
         <div className='StreetForm'>
            <form onSubmit={onSubmit}>
               <div className='FormRow'>
                  <label>name</label>
                  <input required name='name' onChange={onChange} value={ form.name}/>
               </div>
               <button type='submit' disabled={!isValid()}>Add districs</button>
            </form>
         </div>
      </Card>
   );
}

export default DistrictForm;