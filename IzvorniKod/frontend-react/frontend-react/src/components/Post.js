import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Post(props) {
   console.log(props.post)
   const { id, content, account,threadId } = props.post;
   const { district } = account;
  console.log(district)
   
   return (
      <div className='headerdist'>
         <Link to={{
            pathname: `/novaobjava/${threadId}/${id}`,
            state: { id,district },
            className: 'header-right'
         }}>{content} </Link>
      </div>
   );
}

export default Post;