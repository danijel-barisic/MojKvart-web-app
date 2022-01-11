import React from 'react'
import { Link } from 'react-router-dom'
import './RoleRequest.css'


function RoleRequestUser(props) {
   const { id, email } = props.user;
   const { district } = props.user;
   
   return (
      <div className='headerdistRR'>
         <Link to={{
            pathname: `/korisnici/${id}`,
            state: { id,email,district },
            className: 'header-right'
         }}>{email} </Link>
      </div>
   );
}

export default RoleRequestUser;