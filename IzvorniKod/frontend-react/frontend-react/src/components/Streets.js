import React from "react";
import Card from "./Card";
import ReactSession from "react-client-session/dist/ReactSession";
import { useHistory } from "react-router";
import './Login.css';
import Street from "./Street";
import { FaTimes } from 'react-icons/fa';

function Streets(props) {
   const [streets, setStreets] = React.useState([]);
   const [updated, setUpdated] = React.useState(new Date());
   const role = ReactSession.get(ReactSession.get("username"));
   const history = useHistory();
   const { currentId, currentName } = props;
   console.log("vhakjvhakjhvakjhv "+currentId, currentName);

   function deleteStreet(id) {
      const options = {
         method: 'DELETE',
      };
      fetch(`/streets/${id}`, options)
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
      fetch('/streets')
         .then(data => data.json())
         .then(streets => setStreets(streets))
   }, [updated]);

   if (role === "ADMIN") {
      return (
         <Card title='Ulice'>
            <div className='StreetList'>
               {streets.map(function (street) {
                  let district = street.district;
                  console.log(district.id);
                  if (district.id === currentId) {
                     return ([
                        <div className="wrapper">
                           <div className="inner">
                              <Street key={street.id} street={street} props={props}/>
                           </div>
                           <div className="inner">
                              <FaTimes style={{color:"red" ,cursor:"pointer"}} onClick={() => deleteStreet(street.id)}></FaTimes>
                           </div>
                        </div>
                     ]);
                  } else {
                     return ([
                        <></>
                     ]);
                  }
               })}
            </div>
            <div className='Login'>
               <button className='button' type="button" onClick={() => {history.push("/ulice/novi")}}>Dodaj Ulicu</button>
            </div>
         </Card>
      );
   } 
   else {
      history.push("/");
   }
}

export default Streets;