import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Post(props) {
   //console.log(props.post)
   const { id, content, account,threadId } = props.post;
   const { district, email } = account;
  
   
   return (
      <>
      <div className='headerdistPost'>
         {content} 
      </div>
      </>
   );
}

export default Post;