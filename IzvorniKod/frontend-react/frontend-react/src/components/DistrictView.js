import React from 'react';
import './Header.css';
import Card from './Card';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Streets from './Streets';
import Users from './Users';

function DistrictView(props) {
   const { id } = useParams();
   const { name } = props.location.state;
   const [readMoreStreets, setReadMoreStreets] = useState(false);
   const streets = <Streets currentId = {id} currentName = {name}></Streets>
   const linkstreet = readMoreStreets ? "Ulice" : "Ulice"
   const [readMoreUsers, setReadMoreUsers] = useState(false);
   /* Streets --> Users */
   const users = <Users currentId = {id} currentName = {name}></Users>
   const linkuser=readMoreUsers?"Korisnici":"Korisnici"
   
   return (
      <>
         <div className="centar">
            <Card id={id} title={name}>
            </Card>
         </div>
         <div>
            <span>
               <Card>
                  <span>
                     <button className='link' onClick={()=>{setReadMoreStreets(!readMoreStreets)}}><p>{linkstreet}</p></button>
                     <button className='link' onClick={()=>{setReadMoreUsers(!readMoreUsers)}}><p>{linkuser}</p></button>
                  </span>
                  {readMoreStreets && streets}
                  {readMoreUsers && users}
               </Card>
            </span>
         </div>
      </>
   );
}

export default DistrictView;