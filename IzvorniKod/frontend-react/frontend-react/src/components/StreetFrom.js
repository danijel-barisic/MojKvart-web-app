import React from "react";
import "./Login.css"
import Card from "./Card";
import { useHistory } from "react-router-dom";
import Card11 from "./Card11.js";


function StreetForm(props) {
   const [form, setForm] = React.useState({ name: '', minStreetNo: '', maxStreetNo: '', districtId: ''});
   const [error, setError] = React.useState('');
   const history = useHistory();

   function onChange(event) {
      const { name, value } = event.target;
      setForm(oldForm => ({...oldForm, [name]: value}))
   }

   function onSubmit(e) {
      e.preventDefault();
      const data = {
         name: form.name,
         minStreetNo: form.minStreetNo,
         maxStreetNo: form.maxStreetNo,
         district: {
            id: form.districtId
         }
      };
      const options = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
      };

      return fetch('/streets', options).then(response => {
         if (response.ok) {
            history.goBack();
         } else {
            setError("District with given id doesnt exist!");
            console.log(response.body);
         }
      });
   }

   function isValid() {
      const { name, minStreetNo, maxStreetNo, districtId } = form;
      return name.length > 0 && !isNaN(minStreetNo) && !isNaN(maxStreetNo) && !isNaN(districtId);
   }


   return (
      <>
      <div className="current-title">NOVA ULICA</div>
      <Card11>
         <div className='StreetForm Login flex-container'>
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
                  <input required name='districtId' onChange={onChange} value={ form.districtId}/>
               </div>
               <div className='error'>{error}</div>
               <button className='button' type="button" onClick={() => {history.goBack()}}>Natrag</button>
               <button classname='submit' type='submit' disabled={!isValid()}>Dodaj ulicu</button>
            </form>
         </div>
      </Card11>
      </>
   );
}

export default StreetForm;