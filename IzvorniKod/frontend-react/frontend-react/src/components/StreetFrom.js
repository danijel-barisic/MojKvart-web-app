import React from "react";
import "./Login.css"
import Card from "./Card";
import { useHistory } from "react-router-dom";
import Card11 from "./Card11.js";


function StreetForm(props) {
   const [form, setForm] = React.useState({ name: '', minStreetNo: '', maxStreetNo: '', districtId: ''});
   const [error, setError] = React.useState('');
   const history = useHistory();
   const [streets, setStreets] = React.useState(undefined)

   React.useEffect(() => {
      fetch("/streets")
         .then(data => data.json())
         .then(data => setStreets(data))
   }, [])

   console.log(streets)

   function onChange(event) {
      const { name, value } = event.target;
      setForm(oldForm => ({...oldForm, [name]: value}))
   }

   function onSubmit(e) {
      e.preventDefault();

      if (streets.filter(s => s.district.id == form.districtId).map(s => s.name).includes(form.name)) {
         setError("U odabranom kvartu ulica s predloženim imenom već postoji!")
      }

      else {

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
               setError("Kvart s danim id-jem ne postoji!");
               console.log(response.body);
            }
         });
      }
   }

   function isValid() {
      const { name, minStreetNo, maxStreetNo, districtId } = form;
      return name.length > 0 && !isNaN(minStreetNo) && !isNaN(maxStreetNo) && !isNaN(districtId);
   }

   if (streets !== undefined) 
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
                  <label>Najmanji broj u ulici</label>
                  <input required name='minStreetNo' onChange={onChange} value={ form.minStreetNo}/>
               </div>
               <div className='FormRow'>
                  <label>Najveći broj u ulici</label>
                  <input required name='maxStreetNo' onChange={onChange} value={ form.maxStreetNo}/>
               </div>
               <div className='FormRow'>
                  <label>Id kvarta</label>
                  <input required name='districtId' onChange={onChange} value={ form.districtId}/>
               </div>
               <div className='error'>{error}</div>
               <button className='button' type="button" onClick={() => {history.goBack()}}>Natrag</button>
               <button classname='submit' type='submit' disabled={!isValid()}>Dodaj ulicu</button>
            </form>
         </div>
      </Card11>
      </>
   )
   else return (<></>)
}

export default StreetForm;