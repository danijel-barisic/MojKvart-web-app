import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Post(props) {
   console.log(props.post)
   const { id, content, account } = props.post;
   const { district } = account;
  console.log(district)
   
   return (
      <div className='headerdist'>
         <Link to={{
            pathname: `/forum/`,
            state: { id,district },
            className: 'header-right'
         }}>{content} </Link>
      </div>
   );
}

export default Post;