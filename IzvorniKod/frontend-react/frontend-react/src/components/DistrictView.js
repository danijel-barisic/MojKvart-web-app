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
   
   return (
      <> <div>
            <Card6 id={id} title={name}>
            </Card6>
      </div>
         <div className='flex-container2'>
               <div>
                  <Card7>
                     <span>
                        <button className='link2' onClick={()=>{setReadMoreStreets(!readMoreStreets)}}><p>{linkstreet}</p></button>
                     </span>
                     {readMoreStreets && streets}
                  </Card7>
               </div>
               <div>
                  <Card8>
                     <span>
                     <button className='link2' onClick={()=>{setReadMoreUsers(!readMoreUsers)}}><p>{linkuser}</p></button>
                     </span>
                     {readMoreUsers && users}
                  </Card8>
               </div>
         </div>
      </>
   );
}

export default DistrictView;