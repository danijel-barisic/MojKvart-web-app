import React from 'react';
import './Header.css';
import Card from './Card';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Streets from './Streets';
import Users from './Users';
import Card6 from './Card6';
import Card7 from './Card7';
import Card8 from './Card8';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';

function DistrictView(props) {
   const { id } = useParams();
   const { name } = props.location.state;
   const [readMoreStreets, setReadMoreStreets] = useState(false);
   const streets = <Streets currentId = {id} currentName = {name}></Streets>
   const linkstreet = readMoreStreets ? "Zatvori ulice" : "Prikaži ulice"
   const [readMoreUsers, setReadMoreUsers] = useState(false);
   /* Streets --> Users */
   const users = <Users currentId = {id} currentName = {name}></Users>
   const linkuser=readMoreUsers?"Zatvori korisnike":"Prikaži korisnike"
   const history = useHistory();
   
   return (
      <> 
         <div className="current-title">{name}</div>
      <div>
            <Card6>
            <div className='Login flex-container-row'>
               <button onClick={() => history.goBack()}>Natrag</button>
               <button onClick={() => history.push({pathname: `/kvartovi/${id}/edit`, state: { id }})}>Uredi ime</button>
            </div>
            </Card6>
      </div>
         <div className='flex-container2'>
               <div style={{width: "500px"}}>
                  {streets}
               </div>
               <div style={{width: "500px"}}>
                  {users}
               </div>
         </div>
      </>
   );
}

export default DistrictView;