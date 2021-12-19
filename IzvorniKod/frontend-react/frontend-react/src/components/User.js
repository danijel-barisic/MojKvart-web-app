import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function User(props) {
   const { id, email } = props.user;
   const { district } = props.user;
   
   return (
      <div className='headerdist'>
         <Link to={{
            pathname: `/korisnici/${id}`,
            state: { id,email,district },
            className: 'header-right'
         }}>{id}. {email} </Link>
      </div>
   );
}

export default User;