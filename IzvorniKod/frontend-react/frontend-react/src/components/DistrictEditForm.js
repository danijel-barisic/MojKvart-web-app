import React from "react";
import Card from "./Card";
import { useHistory } from "react-router-dom";
import Card10 from "./Card10";

function DistrictEditForm(props) {
   const [form, setForm] = React.useState({ name: '' });
   const [error, setError] = React.useState('');
   const history = useHistory();
   const [district, setDistrict] = React.useState([]);
   const { id } = props.location.state;
   console.log({id});

   const [districts, setDistricts] = React.useState(undefined)

   function onChange(event) {
      const { name, value } = event.target;
      setForm(oldForm => ({...oldForm, [name]: value}))
   }

   React.useEffect(() => {
      fetch('/districts')
         .then(data => data.json())
         .then(data => setDistricts(data
            .filter(d => d.id != -1)))
   }, [])

   console.log(districts)

   function onSubmit(e) {
      e.preventDefault();

      if (districts.filter(d => d.id != id).map(d => d.name).includes(form.name)) {
         setError("Kvart s predloženim imenom već postoji!")
      }

      else {
         const data = {
            id: id,
            name: form.name
         };
         const options = {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         };

         return fetch(`/districts/${id}`, options).then(response => {
            if (response.ok) {
               history.push('/kvartovi');
            }
            else {
               setError("Kvart s predloženim imenom već postoji!");
               console.log(response.body);
            }
         });
      }
   }

   function isValid() {
      const { name } = form;
      return name.length > 0;
   }

   React.useEffect(() => {
      fetch(`/districts/${id}`)
         .then(data => data.json())
         .then(district => setDistrict(district))
   }, []);

   if (districts !== undefined) return (
      <>
      <div className="current-title">PROMJENA IMENA KVARTA</div>
      <Card10>
         <div className='StreetForm Login flex-container'>
            <form onSubmit={onSubmit}>
               <div className='FormRow'>
                  <label>Ime Kvarta</label>
                  <input required placeholder={district.name} name='name' onChange={onChange} value={ form.name}/>
               </div>
               <div className='error'>{error}</div>
               <div class="flex-container3">
                  <button className='button' type="button" onClick={() => {history.goBack()}}>Natrag</button>
                  <button type='submit' disabled={!isValid()}>Ažuriraj</button>
               </div>
            </form>
         </div>
      </Card10>
      </>
   )
   else return (<></>)
}

export default DistrictEditForm;