import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import District from "./District";
import './Login.css';
import { FaTimes } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import {MdApartment} from 'react-icons/md';
import Card4 from "./Card4";

function Districts() {
   const [districts, setDistricts] = React.useState([]);
   const [updated, setUpdated] = React.useState(new Date());
   const role = ReactSession.get(ReactSession.get("username"));
   const history = useHistory();

   function deleteDistrict(id) {
      const options = {
         method: 'DELETE',
      };
      fetch(`/districts/${id}`, options)
         .then(response => {
            /* console.log(response); */
            if (!response.ok) {
               console.log(response.body);
            } else {
               console.log("deleted");
               setUpdated(new Date());
            }
         });
   }

   React.useEffect(() => {
      fetch('/districts')
         .then(data => data.json())
         .then(districts => setDistricts(districts))
   }, [updated]);


   if (role === "ADMIN") {
      return (
         <>
         <div className="current-title">
               <MdApartment /> KVARTOVI
            </div>
         <Card4>
            <div className='StreetList'>
               {districts.map(function (district) {
                  if (district.id !== -1) {
                     return ([
                        <div className="wrapper2">
                           <div className="inner">
                              <District key={district.id} district={district}/>
                           </div>
                           <div className="pad">
                           <div className="inner">
                              <MdDelete style={{color:"#A555B9" ,cursor:"pointer", width: "28px", height: "28px"}} onClick={() => deleteDistrict(district.id)}></MdDelete>
                           </div>
                           </div>
                        </div>
                     ]);  
                  }
               })}
            </div>
            <div className='Login'>
               <div className="flex-container">
                  <button className='button' type="button" onClick={() => {history.push("/kvartovi/novi")}}>Dodaj Kvart</button>
               </div>
            </div>
         </Card4>
         </>

      );
   } 
   else {
      history.push("/");
   }
}

export default Districts;