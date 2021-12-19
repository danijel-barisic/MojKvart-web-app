import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Post(props) {
   const { id, email } = props.post;
   const { district } = props.post;
   
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

export default Post;