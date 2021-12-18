import React from "react";
import Card from "./Card";
import { useHistory } from "react-router-dom";

function StreetEditForm(props) {
   const [form, setForm] = React.useState({ name: '' });
   const [error, setError] = React.useState('');
   const history = useHistory();
   const { id } = props.location.state;
   console.log({id});

   function onChange(event) {
      const { name, value } = event.target;
      setForm(oldForm => ({...oldForm, [name]: value}))
   }

   function onSubmit(e) {
      e.preventDefault();
      const data = {
         id: id,
         name: form.name,
         minStreetNo: form.minStreetNo,
         maxStreetNo: form.maxStreetNo,
         district: {
            id: form.districtId
         }
      };
      console.log("data->>>>" + JSON.stringify(data))
      const options = {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      };

      return fetch(`/streets/${id}`, options).then(response => {
         if (response.ok) {
            history.goBack();
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
      <Card title="Ažuriranje ulice">
         <div className='StreetForm Login'>
            <form onSubmit={onSubmit}>
               <div className='FormRow'>
                  <label>Ime</label>
                  <input required name='name' onChange={onChange} value={ form.name}/>
               </div>
               <div className='FormRow'>
                  <label>MinStreetNo</label>
                  <input required name='minStreetNo' onChange={onChange} value={ form.minStreetNo}/>
               </div>
               <div className='FormRow'>
                  <label>MaxStreetNo</label>
                  <input required name='maxStreetNo' onChange={onChange} value={ form.maxStreetNo}/>
               </div>
               <div className='FormRow'>
                  <label>DistrictId</label>
                  <input required name='districtId' onChange={onChange} placeholder={id} value={ form.districtId}/>
               </div>
               <div className='error'>{error}</div>
               <button classname='submit' type='submit' disabled={!isValid()}>Ažuriraj</button>
               <button className='button' type="button" onClick={() => {history.goBack()}}>Natrag</button>
            </form>
         </div>
      </Card>
   );
}

export default StreetEditForm;