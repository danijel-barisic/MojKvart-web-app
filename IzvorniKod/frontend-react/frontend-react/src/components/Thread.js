import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Thread(props) {
   const { id, name} = props.thread;
   
   return (
      <div className='headerdist'>
         <Link to={{
            pathname: `/forum/${id}`,
            state: { id, name },
            className: 'header-right'
         }}>{id}. {name}</Link>
      </div>
   );
}

export default Thread;