import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function User(props) {
   /* console.log(props); */
   const { id, email } = props.user;
   const { district } = props.user;
   const { currentId, currentName } = props.props;
   console.log(id, email, district.id);
   
   return (
      <div className='headerdist'>
         <Link to={{
            pathname: "/",
            state: {id},
            className: 'header-right'
         }}>{id}. {email} </Link>
      </div>
   );
}

export default User;