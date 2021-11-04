import React from "react";

function StreetForm(props) {
   const [form, setForm] = React.useState({ name: '', minStreetNo: '', maxStreetNo: '', districtId: ''});

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
            props.history.push('/streets');
         }
      });
   }

   function isValid() {
      const { name, minStreetNo, maxStreetNo, districtId } = form;
      return name.length > 0 && !isNaN(minStreetNo) && !isNaN(maxStreetNo) && !isNaN(districtId);
   }


   return (
      <div className='StreetForm'>
         <h2>New Street</h2>
         <form onSubmit={onSubmit}>
            <div className='FormRow'>
               <label>name</label>
               <input required name='name' onChange={onChange} value={ form.name}/>
            </div>
            <div className='FormRow'>
               <label>minStreetNo</label>
               <input required name='minStreetNo' onChange={onChange} value={ form.minStreetNo}/>
            </div>
            <div className='FormRow'>
               <label>maxStreetNo</label>
               <input required name='maxStreetNo' onChange={onChange} value={ form.maxStreetNo}/>
            </div>
            <div className='FormRow'>
               <label>districtId</label>
               <input required name='districtId' onChange={onChange} value={ form.districtId}/>
            </div>
            <button type='submit' disabled={!isValid()}>Add street</button>
         </form>
      </div>
   );
}

export default StreetForm;