import React from "react";

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
      <div className='StreetForm'>
         <h2>New Street</h2>
         <form onSubmit={onSubmit}>
            <div className='FormRow'>
               <label>name</label>
               <input required name='name' onChange={onChange} value={ form.name}/>
            </div>
            <button type='submit' disabled={!isValid()}>Add districs</button>
         </form>
      </div>
   );
}

export default DistrictForm;